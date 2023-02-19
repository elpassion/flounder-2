import {
  CreateEmailSubscriptionDto,
  EmailSubscriptionDto,
  InvalidFormError,
  isInvalidFormResponseError,
  ConflictError,
  isConflictResponseError,
} from '@flounder/contracts';
import { HttpClient } from '@flounder/http-client';
import { createHttpClient } from '@flounder/next-utils';

interface INewsletterApi {
  signUpToNewsletter: (data: CreateEmailSubscriptionDto) => Promise<EmailSubscriptionDto>;
}

export class NewsletterApi implements INewsletterApi {
  baseUrl = '/api/email-subscriptions';
  private client: HttpClient;

  constructor() {
    this.client = createHttpClient();
  }

  async signUpToNewsletter(data: CreateEmailSubscriptionDto): Promise<EmailSubscriptionDto> {
    try {
      return await this.client.post(this.baseUrl, data);
    } catch (e: unknown) {
      if (isInvalidFormResponseError(e)) throw new InvalidFormError(e.response.data.message);
      if (isConflictResponseError(e)) throw new ConflictError(e.response.data.message);

      throw e;
    }
  }
}
