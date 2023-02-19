import { getQueueToken } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { Queue } from 'bull';
import { QueueNamesEnum } from '../enums/queue-names.enum';

@Injectable()
export class QueueClientHealthCheckFacade {
  constructor(private readonly moduleRef: ModuleRef) {}

  isHealthy() {
    const queues = this.getAllQueues();

    return queues.every(this.checkQueueClients);
  }

  getAllQueues(): Queue[] {
    return Object.values(QueueNamesEnum).map(name =>
      this.moduleRef.get(getQueueToken(name), { strict: false }),
    );
  }

  checkQueueClients(queue: Queue): boolean {
    return queue.clients.some(client => client.status === 'ready');
  }
}
