import { MailExampleDto } from '@flounder/contracts';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MailDispatcherFacade } from '../mail-dispatcher/services/mail-dispatcher.facade';

@ApiTags('Email example')
@Controller('email')
export class EmailController {
  constructor(private readonly mailDispatcherFacade: MailDispatcherFacade) {}

  @Post('/example')
  @HttpCode(201)
  sendExampleEmail(@Body() dto: MailExampleDto): Promise<void> {
    return this.mailDispatcherFacade.sendEmail(dto);
  }
}
