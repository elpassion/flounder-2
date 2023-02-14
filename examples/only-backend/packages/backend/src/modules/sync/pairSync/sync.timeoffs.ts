import {
  CalamariClient,
  CalamariStatusType,
  CalamariTimeoff,
} from '../clients/calamari/calamariClient';
import { FloatClient, FloatPerson, FloatTimeoff } from '../clients/float/float.client';
import { format } from 'date-fns';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SyncTimeoffs {
  constructor(
    private readonly calamariClient: CalamariClient,
    private readonly floatClient: FloatClient,
  ) {}

  async sync(date = new Date()) {
    const calamariTimeoffs = await this.getCalamariTimeoffs(date);
    const floatPeopleData = await this.floatClient.getPeopleRequest();
    const floatTimeoffs = await this.getFloatTimeoffs(date, floatPeopleData);

    const groupedByCalamariId = this.groupByCalamariId([...calamariTimeoffs, ...floatTimeoffs]);

    for (const value of groupedByCalamariId.values()) {
      const services = value
        .map(timeoff => timeoff.serviceType)
        .sort()
        .toString();

      switch (services) {
        case 'CALAMARI,FLOAT':
          await this.syncTimeoffPair(value);
          break;
        case 'CALAMARI':
          await this.addToFloat(value, floatPeopleData).catch(e => {
            if (e instanceof FloatClient.FloatClientTimeoffAlreadyExistsError) return;
            throw e;
          });
          break;
        case 'FLOAT':
          await this.removeFromFloat(value);
          break;
      }
    }

    return groupedByCalamariId;
  }

  private syncTimeoffPair(value: (FloatTimeoff | CalamariTimeoff)[]) {
    const calamariObj = this.getServiceObject('CALAMARI', value) as CalamariTimeoff;
    if (calamariObj.status === CalamariStatusType.CANCELED) {
      return this.removeFromFloat(value);
    }
  }

  private async addToFloat(
    value: (FloatTimeoff | CalamariTimeoff)[],
    floatPeopleData: FloatPerson[],
  ) {
    const calamariObj = this.getServiceObject('CALAMARI', value) as CalamariTimeoff;
    const floatUser = floatPeopleData.filter(person => person.email === calamariObj.personEmail)[0];
    if (calamariObj.status === CalamariStatusType.ACCEPTED && floatUser) {
      await this.floatClient.createTimeOff(
        format(new Date(calamariObj.startDate), 'yyyy-MM-dd'),
        format(new Date(calamariObj.endDate), 'yyyy-MM-dd'),
        floatUser.personId,
        `[CALAMARI SYNC] ${calamariObj.calamariId}`,
      );
    }
  }

  private removeFromFloat(value: (FloatTimeoff | CalamariTimeoff)[]) {
    const floatObj = this.getServiceObject('FLOAT', value) as FloatTimeoff;
    return this.floatClient.removeTimeoff(floatObj.id);
  }

  private getServiceObject(type: string, value: (FloatTimeoff | CalamariTimeoff)[]) {
    return value.filter(hash => {
      return hash.serviceType === type;
    })[0];
  }

  private groupByCalamariId(data: (FloatTimeoff | CalamariTimeoff)[]) {
    return data.reduce((acc, timeoff) => {
      const { calamariId } = timeoff;
      const current = acc.get(calamariId) || [];
      return acc.set(calamariId, [...current, timeoff]);
    }, new Map<number, (FloatTimeoff | CalamariTimeoff)[]>());
  }

  private async getCalamariTimeoffs(date: Date) {
    return this.calamariClient.getTimeOffs(date);
  }

  private async getFloatTimeoffs(date: Date, floatPeopleData: FloatPerson[]) {
    const floatTimeoffs = await this.floatClient.getTimeOffs(date);
    return this.floatClient.timeoffsWithPeople(floatTimeoffs, floatPeopleData);
  }
}
