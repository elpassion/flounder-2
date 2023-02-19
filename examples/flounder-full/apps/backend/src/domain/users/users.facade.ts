import { ExtendedUserDto, GetUserDto, UpdateUserDto, UpsertUserDto } from '@flounder/contracts';
import { StorageFacade } from '@flounder/storage';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthFacade } from '../../auth/auth.facade';
import { UserNotFoundError } from '../../auth/cognito/errors/user-not-found.error';
import { User } from './user.entity';
import { Paginated, PaginateQuery, PaginationFacade } from '@flounder/pagination';

@Injectable()
export class UsersFacade {
  constructor(
    private readonly authFacade: AuthFacade,
    private readonly fileStorage: StorageFacade,
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly pagination: PaginationFacade,
  ) {}

  async upsert(upsertUserDto: UpsertUserDto): Promise<GetUserDto> {
    return await this.usersRepository.save(upsertUserDto);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<GetUserDto> {
    let existingUser: User;
    try {
      existingUser = await this.usersRepository.findOneOrFail({ where: { cognito_id: id } });
    } catch (err) {
      throw new UserNotFoundError();
    }
    if (updateUserDto.email && existingUser.email !== updateUserDto.email)
      await this.authFacade.updateUserEmail(id, updateUserDto.email);
    if (updateUserDto.avatar_key && existingUser.avatar_key !== updateUserDto.avatar_key)
      updateUserDto.avatar_key = await this.fileStorage.moveFileToPermStorage(
        updateUserDto.avatar_key,
        id,
      );

    return await this.usersRepository.save({
      cognito_id: id,
      ...updateUserDto,
    });
  }

  async mapUserToGetUserDto(user: User): Promise<ExtendedUserDto> {
    return {
      cognito_id: user.cognito_id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      description: user.description,
      avatar_url: user.avatar_key ? await this.fileStorage.getFileUrl(user.avatar_key) : null,
    };
  }

  async getMany(query: PaginateQuery): Promise<Paginated<ExtendedUserDto>> {
    const rawPaginatedData = await this.pagination.paginate(query, this.usersRepository, {
      sortableColumns: ['cognito_id', 'email', 'first_name', 'last_name', 'description'],
      searchableColumns: ['email', 'first_name', 'last_name'],
      defaultSortBy: [['cognito_id', 'DESC']],
    });

    const mappedData = await Promise.all(
      rawPaginatedData.data.map(user => this.mapUserToGetUserDto(user)),
    );

    return {
      ...rawPaginatedData,
      data: mappedData,
    } as Paginated<ExtendedUserDto>;
  }

  async getById(id: string): Promise<ExtendedUserDto> {
    let user;
    try {
      user = await this.usersRepository.findOneOrFail({ where: { cognito_id: id } });
    } catch (err) {
      UserNotFoundError.throwOrSkip(err);
      throw err;
    }

    return this.mapUserToGetUserDto(user);
  }
}
