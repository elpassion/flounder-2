import { Controller, Get } from '@nestjs/common';
import { EventsFacade } from './events.facade';
import { Event } from './event.entity';
import { ApiTags } from '@nestjs/swagger';
import { Authorize } from '../../auth/casl/guards/authorize.guard';
import { Action } from '../../auth/casl/enums/action.enum';
import { Authenticate } from '../../auth/guards/authenticate.guard';
import { Paginate, Paginated, PaginateQuery } from '@flounder/pagination';

@ApiTags('Events')
@Authenticate()
@Controller('events')
export class EventsController {
  constructor(private readonly eventsFacade: EventsFacade) {}

  @Get()
  @Authorize(Action.Read, Event)
  async getAll(@Paginate() query: PaginateQuery): Promise<Paginated<Event>> {
    return this.eventsFacade.getAll(query);
  }
}
