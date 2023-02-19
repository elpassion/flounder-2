import { createBullBoard } from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { ExpressAdapter } from '@bull-board/express';
import { getQueueToken } from '@nestjs/bull';
import { INestApplication } from '@nestjs/common';
import { Queue } from 'bull';
import expressBasicAuth from 'express-basic-auth';
import { QueueNamesEnum } from './enums/queue-names.enum';

export class BullBoard {
  private readonly serverAdapter: ExpressAdapter;

  constructor(
    private readonly app: INestApplication,
    private readonly bullBoardUser: string,
    private readonly bullBoardPassword: string,
    private readonly bullBoardPath: string,
  ) {
    this.serverAdapter = this.createServerAdapter();
  }

  public setup() {
    this.createBullBoard();
    this.addBullBoardToApp();
  }

  private createBullBoard(): void {
    createBullBoard({
      queues: this.createQueueAdapters(),
      serverAdapter: this.serverAdapter,
    });
  }

  private addBullBoardToApp(): void {
    this.app.use(
      this.bullBoardPath,
      expressBasicAuth({
        users: {
          [this.bullBoardUser]: this.bullBoardPassword,
        },
        challenge: true,
      }),
      this.serverAdapter.getRouter(),
    );
  }

  private createServerAdapter(): ExpressAdapter {
    const serverAdapter = new ExpressAdapter();
    serverAdapter.setBasePath(this.bullBoardPath);

    return serverAdapter;
  }

  private createQueueAdapters(): BullAdapter[] {
    const queueNames = Object.values(QueueNamesEnum);

    return queueNames.map(queueName => this.createQueueAdapaterByQueueName(queueName));
  }

  private createQueueAdapaterByQueueName(queueName: string) {
    const queue = this.getQueueByName(queueName);

    return new BullAdapter(queue);
  }

  getQueueByName(queueName: string) {
    return this.app.get<Queue>(getQueueToken(queueName));
  }
}
