import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import {
  CreateEmailSubscriptionDto,
  BadRequestDTO,
  ConflictDTO,
  EmailSubscriptionDto,
} from '@flounder/contracts';
import { EmailSubscriptionsFacade } from './email-subscriptions.facade';
import { DuplicatedEmailSubscriptionException } from './exceptions/duplicated-email-subscription.exception';
import { EmailSubscriptionProducer } from '../queue/producers/email-subscriptions.producer';
import { EmailSubscription } from './email-subscription.entity';
import { ApiBadRequestResponse, ApiConflictResponse, ApiTags } from '@nestjs/swagger';
import { DuplicatedEmailSubscriptionError } from './errors/duplicated-email-subscription.error';
import { NotificationsProducer } from '../queue/producers/notifications.producer';
import { I18n, I18nContext } from 'nestjs-i18n';
import { CannotConnectToRedisError } from '../queue/errors/cannot-connect-to-redis.error';
import { CannotConnectToClientException } from '../queue/exceptions/cannot-connect-to-client.exception';
import { Authorize } from '../../auth/casl/guards/authorize.guard';
import { Action } from '../../auth/casl/enums/action.enum';
import { Authenticate } from '../../auth/guards/authenticate.guard';
import { Paginate, Paginated, PaginateQuery } from '@flounder/pagination';

@ApiTags('Email Subscriptions')
@Authenticate()
@Controller('/email-subscriptions')
export class EmailSubscriptionsController {
  constructor(
    private readonly emailSubscriptionsFacade: EmailSubscriptionsFacade,
    private readonly emailSubscriptionProducer: EmailSubscriptionProducer,
    private readonly notificationsProducer: NotificationsProducer,
  ) {}

  @Post()
  @HttpCode(201)
  @ApiBadRequestResponse({ type: BadRequestDTO })
  @ApiConflictResponse({ type: ConflictDTO })
  @Authorize(Action.Create, EmailSubscription)
  async create(
    @Body() payload: CreateEmailSubscriptionDto,
    @I18n() i18n: I18nContext,
  ): Promise<EmailSubscriptionDto> {
    try {
      const subscription = await this.emailSubscriptionsFacade.create(payload.email);
      await this.notificationsProducer.sendNotification({
        title: i18n.t('notifications.EMAIL_SUBSCRIPTION.NEW.SUBJECT'),
        description: i18n.t('notifications.EMAIL_SUBSCRIPTION.NEW.SUBJECT', {
          args: { email: payload.email },
        }),
      });
      await this.emailSubscriptionProducer.sendNewsletter({
        to: payload.email,
        subject: i18n.t('emails.EMAIL_SUBSCRIPTION.NEW.SUBJECT'),
        text: i18n.t('emails.EMAIL_SUBSCRIPTION.NEW.BODY'),
      });
      return subscription;
    } catch (error) {
      if (error instanceof DuplicatedEmailSubscriptionError) {
        throw new DuplicatedEmailSubscriptionException();
      } else if (error instanceof CannotConnectToRedisError) {
        throw new CannotConnectToClientException();
      }
      throw error;
    }
  }

  @Get()
  @Authorize(Action.Read, EmailSubscription)
  async getAll(@Paginate() query: PaginateQuery): Promise<Paginated<EmailSubscription>> {
    return this.emailSubscriptionsFacade.getAll(query);
  }
}
