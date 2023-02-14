import { HttpService } from '@nestjs/axios';
import { addMonths, format, subMonths } from 'date-fns';
import { firstValueFrom } from 'rxjs';
import { Exclude, Expose, plainToClass, Transform, Type } from 'class-transformer';
import { Injectable } from '@nestjs/common';
import { SyncFloatConfig } from '../../configs/sync.float.config';
import axios from 'axios';

@Injectable()
export class FloatClient {
  static NOTE_REGEX = /\d+/g;
  static FloatClientError = class extends Error {};
  static FloatClientTimeoffAlreadyExistsError = class extends FloatClient.FloatClientError {};

  constructor(
    private readonly httpService: HttpService,
    private readonly config: SyncFloatConfig,
  ) {}

  async getTimeOffs(date = new Date()) {
    const toString = format(addMonths(date, 6), 'yyyy-MM-dd');
    const fromString = format(subMonths(date, 1), 'yyyy-MM-dd');

    const response = await firstValueFrom(
      this.httpService.get('https://api.float.com/v3/timeoffs', {
        headers: {
          Authorization: `Bearer ${this.config.floatToken}`,
        },
        params: {
          timeoff_type_id: this.config.floatTimeoffTypeId,
          end_date: toString,
          start_date: fromString,
          'per-page': 200,
        },
      }),
    ).catch(e => {
      throw new FloatClient.FloatClientError(e.message);
    });

    return plainToClass(FloatTimeoffResponse, {
      timeoffs: response.data,
    });
  }

  async timeoffsWithPeople(floatResponse: FloatTimeoffResponse, floatPeople: FloatPerson[]) {
    return floatResponse.timeoffs.reduce((acc, floatTimeoff) => {
      const person = floatPeople.find(person => person.personId === floatTimeoff.personId);
      if (!person?.email) return acc;
      return [...acc, { ...floatTimeoff, personEmail: person.email }];
    }, [] as FloatTimeoff[]);
  }

  async createTimeOff(startDate: string, endDate: string, userId: number, timeoffNotes: string) {
    const response = await firstValueFrom(
      this.httpService.post(
        'https://api.float.com/v3/timeoffs',
        {
          timeoff_type_id: this.config.floatTimeoffTypeId,
          start_date: startDate,
          end_date: endDate,
          full_day: 1,
          people_ids: [userId],
          timeoff_notes: timeoffNotes,
        },
        {
          headers: {
            Authorization: `Bearer ${this.config.floatToken}`,
          },
        },
      ),
    ).catch(e => {
      if (axios.isAxiosError(e) && e.response && Array.isArray(e.response.data)) {
        if (e.response.data[0].field === 'full_day')
          throw new FloatClient.FloatClientTimeoffAlreadyExistsError();
      }
      throw new FloatClient.FloatClientError(e.message);
    });

    return response.data;
  }

  async removeTimeoff(timeoffId: number) {
    const response = await firstValueFrom(
      this.httpService.delete(`https://api.float.com/v3/timeoffs/${timeoffId}`, {
        headers: {
          Authorization: `Bearer ${this.config.floatToken}`,
        },
      }),
    ).catch(e => {
      throw new FloatClient.FloatClientError(e.message);
    });

    return response.status;
  }

  async getPeopleRequest() {
    const response = await firstValueFrom(
      this.httpService.get('https://api.float.com/v3/people', {
        headers: {
          Authorization: `Bearer ${this.config.floatToken}`,
        },
        params: {
          active: 1,
          'per-page': 200,
        },
      }),
    ).catch(e => {
      throw new FloatClient.FloatClientError(e.message);
    });

    const mappedResponse = plainToClass(FloatPeopleResponse, {
      people: response.data,
    });

    return mappedResponse.people;
  }
}

class FloatTimeoffResponse {
  @Type(() => FloatTimeoff)
  @Expose()
  timeoffs!: FloatTimeoff[];
}

@Exclude()
export class FloatTimeoff {
  @Expose({ name: 'timeoff_id' })
  id!: number;

  @Expose({ name: 'start_date' })
  @Type(() => Date)
  startDate!: Date;

  @Expose({ name: 'end_date' })
  @Type(() => Date)
  endDate!: Date;

  @Expose({ name: 'timeoff_notes' })
  @Transform(({ value }) => {
    return Number((value || '').match(FloatClient.NOTE_REGEX));
  })
  calamariId!: number;

  @Expose({ name: 'people_ids' })
  @Transform(({ value }) => value[0])
  personId!: number;

  @Expose()
  personEmail!: string;

  @Expose()
  @Transform(({ value }) => value || 'FLOAT')
  serviceType!: string;
}

class FloatPeopleResponse {
  @Type(() => FloatPerson)
  @Expose()
  people!: FloatPerson[];
}

@Exclude()
export class FloatPerson {
  @Expose()
  email!: string;

  @Expose({ name: 'people_id' })
  personId!: number;
}
