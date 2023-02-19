import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventTypeEnum } from './enums/event-type.enum';
import { Event } from './event.entity';
import { EventDetails } from './interfaces/event-details.type';
import { FilterOperator, Paginated, PaginateQuery, PaginationFacade } from '@flounder/pagination';

@Injectable()
export class EventsFacade {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    private readonly pagination: PaginationFacade,
  ) {}

  async create(type: EventTypeEnum, details: EventDetails<EventTypeEnum>): Promise<Event> {
    return await this.eventRepository.save({ type, details });
  }

  async getAll(query: PaginateQuery): Promise<Paginated<Event>> {
    return this.pagination.paginate(query, this.eventRepository, {
      sortableColumns: ['type', 'created_at'],
      searchableColumns: ['type', 'created_at'],
      defaultSortBy: [['id', 'DESC']],
      filterableColumns: {
        created_at: [FilterOperator.GTE, FilterOperator.LTE],
        type: [FilterOperator.EQ],
      },
    });
  }

  async get(id: number): Promise<Event | null> {
    return await this.eventRepository.findOne({ where: { id } });
  }
}
