import { Module } from '@nestjs/common';
import { RegistrationFacade } from "./registration.facade";
import { AuthModule } from "../../auth/auth.module";
import { UsersModule } from "../../domain/users/users.module";
import { RegistrationController } from "./registration.controller";

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [RegistrationController],
  providers: [RegistrationFacade],
  exports: [RegistrationFacade],
})
export class RegistrationModule {}
