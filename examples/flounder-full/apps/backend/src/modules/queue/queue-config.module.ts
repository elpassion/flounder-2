import { Module } from '@nestjs/common';
import { QueueConfig } from './queue.config';

@Module({
  providers: [QueueConfig],
  exports: [QueueConfig],
})
export class QueueConfigModule {}
