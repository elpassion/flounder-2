import { HttpClient } from '@flounder/http-client';
import { createHttpClient } from '@flounder/next-utils';
import { Price } from 'modules/Pages';

interface IPaymentApi {
  getPrices: () => Promise<Price[]>;
}

export class PaymentApi implements IPaymentApi {
  baseUrl = '/api';
  private client: HttpClient;

  constructor(client: HttpClient = createHttpClient()) {
    this.client = client;
  }

  getPrices(): Promise<Price[]> {
    return this.client.get(`${this.baseUrl}/prices`);
  }
}
