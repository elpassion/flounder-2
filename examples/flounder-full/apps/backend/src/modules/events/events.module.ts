import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../auth/auth.module';
import { Event } from './event.entity';
import { EventsController } from './events.controller';
import { EventsFacade } from './events.facade';

@Module({
  controllers: [EventsController],
  imports: [TypeOrmModule.forFeature([Event]), AuthModule],
  providers: [EventsFacade],
  exports: [EventsFacade],
})
export class EventsModule {}
