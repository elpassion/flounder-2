import { Paginated } from '../types';
import { ExtendedUserDto } from './extended-user.dto';

export class GetUsersDto extends Paginated<ExtendedUserDto> {}
