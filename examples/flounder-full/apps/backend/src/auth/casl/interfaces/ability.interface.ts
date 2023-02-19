import { Ability, InferSubjects } from '@casl/ability';
import { Event } from '../../../modules/events/event.entity';
import { EmailSubscription } from '../../../modules/email-subscriptions/email-subscription.entity';
import { User } from '../../../domain/users/user.entity';
import { Action } from '../enums/action.enum';
import { Subject } from '../enums/subject.enum';

export type Subjects =
  | InferSubjects<
      | typeof User
      | typeof Event
      | typeof EmailSubscription
      | typeof Subject.FEATURE_FLAG
      | typeof Subject.GROUP
    >
  | 'all';

export type AppAbility = Ability<[Action, Subjects]>;
