import { Module } from '@nestjs/common';
import { SyncFloatConfig } from './configs/sync.float.config';
import { FloatClient } from './clients/float/float.client';
import { SyncCalamariConfig } from './configs/sync.calamari.config';
import { CalamariClient } from './clients/calamari/calamariClient';
import { HttpModule } from '@nestjs/axios';
import { SyncTimeoffs } from './pairSync/sync.timeoffs';
import { SyncCron } from './sync.cron';

@Module({
  imports: [HttpModule],
  controllers: [],
  providers: [
    SyncCron,
    SyncFloatConfig,
    SyncCalamariConfig,
    SyncTimeoffs,
    FloatClient,
    CalamariClient,
  ],
})
export class SyncModule {}
