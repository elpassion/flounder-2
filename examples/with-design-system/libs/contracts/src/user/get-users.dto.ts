import { Paginated } from '../types';
import { TExtendedUser } from './extended-user.schema.type';

export class GetUsersDto extends Paginated<TExtendedUser> {}
