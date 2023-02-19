import { applyDecorators, UseGuards } from '@nestjs/common';
import { CheckPolicies } from '../decorators/check-policies.decorator';
import { Action } from '../enums/action.enum';
import { AppAbility, Subjects } from '../interfaces/ability.interface';
import { PoliciesGuard } from './policies-guard';
import { ApiForbiddenResponse, ApiSecurity } from '@nestjs/swagger';

export function Authorize(action: Action, subject: Subjects) {
  return applyDecorators(
    UseGuards(PoliciesGuard),
    CheckPolicies((ability: AppAbility) => ability.can(action, subject)),
    ApiForbiddenResponse({ description: 'User does not have access to operation' }),
    ApiSecurity('oauth2'),
  );
}
