import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../auth/auth.module';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersFacade } from './users.facade';

@Module({
  providers: [UsersFacade],
  imports: [TypeOrmModule.forFeature([User]), AuthModule],
  exports: [UsersFacade],
  controllers: [UsersController],
})
export class UsersModule {}
