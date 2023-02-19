import { EventTypeEnum } from '../enums/event-type.enum';

type NewsletterSentDetails = { email: string };

type PossibleDetailTypes = {
  [EventTypeEnum.NEWSLETTER_SENT]: NewsletterSentDetails;
};

export type EventDetails<EnumValue> = EnumValue extends EventTypeEnum
  ? PossibleDetailTypes[EnumValue]
  : never;
