import { Body, Controller, Delete, Get, Param, Patch, Put } from '@nestjs/common';
import { ApiNotFoundResponse, ApiTags } from '@nestjs/swagger';
import { ExtendedUserDto, GetCognitoUserDto, GetUserDto, UpdateUserDto } from '@flounder/contracts';
import { Action } from '../../auth/casl/enums/action.enum';
import { Authenticate } from '../../auth/guards/authenticate.guard';
import { Authorize } from '../../auth/guards/authorize.guard';
import { User } from '../users/user.entity';
import { UsersFacade } from '../users/users.facade';
import { AdminFacade } from './admin.facade';
import { Paginate, Paginated, PaginateQuery } from '@flounder/pagination';

@ApiTags('Admin', 'Users')
@ApiNotFoundResponse({ description: 'Failed to find provider resource.' })
@Controller('admin/users')
export class AdminUsersController {
  constructor(
    private readonly adminFacade: AdminFacade,
    private readonly usersFacade: UsersFacade,
  ) {}

  @Get()
  @Authorize(Action.Read, User)
  @Authenticate()
  async getMany(@Paginate() query: PaginateQuery): Promise<Paginated<ExtendedUserDto>> {
    return await this.usersFacade.getMany(query);
  }

  @Get('/cognito/:id')
  @Authorize(Action.Manage, User)
  @Authenticate()
  async getCognitoUserById(@Param('id') id: string): Promise<GetCognitoUserDto> {
    return await this.adminFacade.getUserById(id);
  }

  @Get('/:id')
  @Authorize(Action.Manage, User)
  @Authenticate()
  async getUserById(@Param('id') id: string): Promise<ExtendedUserDto> {
    return await this.usersFacade.getById(id);
  }

  @Patch('/:id')
  @Authorize(Action.Manage, User)
  @Authenticate()
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<GetUserDto> {
    return await this.usersFacade.update(id, updateUserDto);
  }

  @Put('/:id/block')
  @Authorize(Action.Block, User)
  @Authenticate()
  async blockUser(@Param('id') id: string): Promise<void> {
    await this.adminFacade.blockUser(id);
  }

  @Delete('/:id/block')
  @Authorize(Action.Block, User)
  @Authenticate()
  async unblockUser(@Param('id') id: string): Promise<void> {
    await this.adminFacade.unblockUser(id);
  }

  @Put('/:id/memberships/:groupName')
  @Authorize(Action.ChangeGroup, User)
  @Authenticate()
  async addUserToGroup(
    @Param('id') id: string,
    @Param('groupName') groupName: string,
  ): Promise<void> {
    await this.adminFacade.addUserToGroup(id, groupName);
  }

  @Delete('/:id/memberships/:groupName')
  @Authorize(Action.ChangeGroup, User)
  @Authenticate()
  async removeUserFromGroup(
    @Param('id') id: string,
    @Param('groupName') groupName: string,
  ): Promise<void> {
    await this.adminFacade.removeUserFromGroup(id, groupName);
  }

  @Put('/:id/description')
  @Authorize(Action.Manage, User)
  @Authenticate()
  async updateUserDescription(
    @Param('id') id: string,
    @Body('description') description: string,
  ): Promise<void> {
    await this.adminFacade.updateUserDescription(id, description);
  }
}
