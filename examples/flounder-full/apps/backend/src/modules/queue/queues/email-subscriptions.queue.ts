import { BullModule } from '@nestjs/bull';
import { QueueNamesEnum } from '../enums/queue-names.enum';
import { LIMITER_DURATION, LIMITER_MAX } from '../queue.consts';

export const EmailSubscriptionsQueue = BullModule.registerQueue({
  name: QueueNamesEnum.EMAIL_SUBSCRIPTIONS,
  limiter: {
    max: LIMITER_MAX,
    duration: LIMITER_DURATION,
  },
});
