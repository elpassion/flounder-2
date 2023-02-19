import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt-auth.guard';

export function Authenticate() {
  return applyDecorators(
    UseGuards(JwtAuthGuard),
    ApiUnauthorizedResponse({ description: 'Failed to authenticate user based on jwt token.' }),
  );
}
