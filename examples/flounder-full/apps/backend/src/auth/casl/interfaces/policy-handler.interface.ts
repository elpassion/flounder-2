import { AppAbility } from './ability.interface';

interface IPolicyHandler {
  handle: PolicyHandlerCallback;
}

type PolicyHandlerCallback = (ability: AppAbility) => boolean;

export type PolicyHandler = IPolicyHandler | PolicyHandlerCallback;
