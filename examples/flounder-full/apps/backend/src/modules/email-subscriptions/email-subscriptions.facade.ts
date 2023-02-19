import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmailSubscription } from './email-subscription.entity';
import { DuplicatedEmailSubscriptionError } from './errors/duplicated-email-subscription.error';
import { FilterOperator, Paginated, PaginateQuery, PaginationFacade } from '@flounder/pagination';

@Injectable()
export class EmailSubscriptionsFacade {
  constructor(
    @InjectRepository(EmailSubscription)
    private readonly emailSubscriptionRepository: Repository<EmailSubscription>,
    private readonly pagination: PaginationFacade,
  ) {}

  async create(email: string): Promise<EmailSubscription> {
    try {
      const response = await this.emailSubscriptionRepository.save({ email });
      return response;
    } catch (e) {
      throw new DuplicatedEmailSubscriptionError();
    }
  }

  async getAll(query: PaginateQuery): Promise<Paginated<EmailSubscription>> {
    return this.pagination.paginate(query, this.emailSubscriptionRepository, {
      sortableColumns: ['email', 'created_at', 'updated_at'],
      searchableColumns: ['email', 'created_at', 'updated_at'],
      defaultSortBy: [['id', 'DESC']],
      filterableColumns: {
        created_at: [FilterOperator.GTE, FilterOperator.LTE],
      },
    });
  }
}
