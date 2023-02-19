import { Module } from '@nestjs/common';
import { AuthModule } from '../../auth/auth.module';
import { FeatureFlagsModule } from '../../modules/feature-flags/feature-flags.module';
import { UsersModule } from '../users/users.module';
import { AdminGroupsController } from './admin-groups.controller';
import { AdminUsersController } from './users.controller';
import { AdminFacade } from './admin.facade';
import { FeatureFlagsController } from './feature-flags.controller';

@Module({
  controllers: [AdminUsersController, FeatureFlagsController, AdminGroupsController],
  providers: [AdminFacade],
  imports: [AuthModule, UsersModule, FeatureFlagsModule],
})
export class AdminModule {}
