import { Ability, AbilityBuilder, AbilityClass, ExtractSubjectType } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { User } from '../../../domain/users/user.entity';
import { AuthenticatedUser } from '../../interfaces/authenticated-user.interface';
import { Role } from '../enums/role.enum';
import { Action } from '../enums/action.enum';
import { AppAbility, Subjects } from '../interfaces/ability.interface';
import { EmailSubscription } from '../../../modules/email-subscriptions/email-subscription.entity';

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: AuthenticatedUser) {
    const { can, build } = new AbilityBuilder<Ability<[Action, Subjects]>>(
      Ability as AbilityClass<AppAbility>,
    );
    if (user.groups.includes(Role.Admin)) {
      can(Action.Manage, 'all');
    }

    can(Action.Read, User);
    can(Action.Update, User);
    can(Action.Create, User);
    can(Action.Create, EmailSubscription);

    return build({
      detectSubjectType: item => item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
