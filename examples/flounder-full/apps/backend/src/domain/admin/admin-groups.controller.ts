import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Action } from '../../auth/casl/enums/action.enum';
import { Subject } from '../../auth/casl/enums/subject.enum';
import { Authenticate } from '../../auth/guards/authenticate.guard';
import { Authorize } from '../../auth/guards/authorize.guard';
import { AdminFacade } from './admin.facade';

@ApiTags('AdminGroups')
@Controller('admin/groups')
export class AdminGroupsController {
  constructor(private readonly adminFacade: AdminFacade) {}

  @Get()
  @Authorize(Action.Read, Subject.GROUP)
  @Authenticate()
  async getAll(): Promise<Array<string>> {
    return await this.adminFacade.getGroups();
  }
}
