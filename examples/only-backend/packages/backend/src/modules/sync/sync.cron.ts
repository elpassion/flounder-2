import { Injectable, Logger } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { SyncTimeoffs } from './pairSync/sync.timeoffs';

@Injectable()
export class SyncCron {
  private logger = new Logger();
  constructor(private readonly syncClient: SyncTimeoffs) {}

  @Interval(60_000)
  async runSyncMethod() {
    this.logger.log('Beginning client sync.');
    await this.syncClient.sync(new Date());
    this.logger.log('Successfully synced clients.');
  }
}
