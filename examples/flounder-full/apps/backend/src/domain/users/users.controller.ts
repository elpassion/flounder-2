import { Body, Controller, Get, Param, Post, Put, UnauthorizedException } from '@nestjs/common';
import { UpdateUserDto, ExtendedUserDto, GetUserDto } from '@flounder/contracts';
import { UsersFacade } from './users.facade';
import { ApiTags } from '@nestjs/swagger';
import { Action } from '../../auth/casl/enums/action.enum';
import { User } from './user.entity';
import { Authorize } from '../../auth/casl/guards/authorize.guard';
import { Authenticate } from '../../auth/guards/authenticate.guard';
import { UserDecorator } from './user.decorator';
import { AuthenticatedUser } from '../../auth/interfaces/authenticated-user.interface';
import { Paginate, Paginated, PaginateQuery } from '@flounder/pagination';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersFacade: UsersFacade) {}

  @Post()
  @Authorize(Action.Create, User)
  @Authenticate()
  async upsert(@UserDecorator() user: AuthenticatedUser): Promise<GetUserDto> {
    return await this.usersFacade.upsert({ cognito_id: user.id, email: user.email });
  }

  @Get()
  @Authorize(Action.Read, User)
  @Authenticate()
  async getMany(@Paginate() query: PaginateQuery): Promise<Paginated<ExtendedUserDto>> {
    return await this.usersFacade.getMany(query);
  }

  @Get('me')
  @Authorize(Action.Read, User)
  @Authenticate()
  async me(@UserDecorator() user: AuthenticatedUser): Promise<ExtendedUserDto> {
    return await this.usersFacade.getById(user.id);
  }

  @Get(':id')
  @Authorize(Action.Read, User)
  @Authenticate()
  async getById(@Param('id') id: string): Promise<ExtendedUserDto> {
    return await this.usersFacade.getById(id);
  }

  @Put(':id')
  @Authorize(Action.Update, User)
  @Authenticate()
  async update(
    @Param('id') id: string,
    @UserDecorator() user: AuthenticatedUser,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<GetUserDto> {
    if (id !== user.id) throw new UnauthorizedException();
    return await this.usersFacade.update(id, updateUserDto);
  }
}
