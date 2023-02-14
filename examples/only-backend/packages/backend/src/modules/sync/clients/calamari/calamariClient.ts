import { Exclude, Expose, plainToClass, Type, Transform } from 'class-transformer';
import { HttpService } from '@nestjs/axios';
import { SyncCalamariConfig } from '../../configs/sync.calamari.config';
import { addMonths, format, subMonths } from 'date-fns';
import { firstValueFrom } from 'rxjs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CalamariClient {
  static CalamariClientError = class extends Error {};

  constructor(
    private readonly httpService: HttpService,
    private readonly config: SyncCalamariConfig,
  ) {}

  async getTimeOffs(date = new Date()) {
    const toString = format(addMonths(date, 6), 'yyyy-MM-dd');
    const fromString = format(subMonths(date, 1), 'yyyy-MM-dd');

    const response = await firstValueFrom(
      this.httpService.post(
        this.config.calamariApiUrl,
        {
          from: fromString,
          to: toString,
          absenceStatuses: ['APPROVED', 'CANCELED'],
        },
        {
          auth: {
            username: this.config.calamariApiUsername,
            password: this.config.calamariApiKey,
          },
        },
      ),
    ).catch(e => {
      throw new CalamariClient.CalamariClientError(e.message);
    });

    const mappedResponse = plainToClass(CalamariTimeoffResponse, {
      timeoffs: response.data,
    });

    return mappedResponse.timeoffs;
  }
}

export enum CalamariStatusType {
  ACCEPTED = 'ACCEPTED',
  CANCELED = 'CANCELED',
}

class CalamariTimeoffResponse {
  @Type(() => CalamariTimeoff)
  @Expose()
  timeoffs!: CalamariTimeoff[];
}

@Exclude()
export class CalamariTimeoff {
  @Expose({
    name: 'id',
  })
  calamariId!: number;

  @Expose({
    name: 'from',
  })
  @Type(() => Date)
  startDate!: Date;

  @Expose({
    name: 'to',
  })
  @Type(() => Date)
  endDate!: Date;

  @Expose({
    name: 'employeeEmail',
  })
  personEmail!: string;

  @Expose()
  status!: CalamariStatusType;

  @Expose({
    name: 'absenceTypeName',
  })
  type!: string;

  @Expose()
  @Transform(({ value }) => value || 'CALAMARI')
  serviceType!: string;
}
