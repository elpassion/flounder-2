import { Module } from '@nestjs/common';
import { WSGateway } from './gateways/websocket.gateway';
import { ConfigurableModuleClass } from './websocket.module-definition';

@Module({
  providers: [WSGateway],
  exports: [WSGateway],
})
export class WebSocketModule extends ConfigurableModuleClass {}
