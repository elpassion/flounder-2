import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { VersionDto } from './dtos/version.dto';
import { BaseConfig } from '../modules/app-config';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly config: BaseConfig) {}
  @Get('/version')
  getVersion(): VersionDto {
    return {
      version: this.config.version,
    };
  }
}
