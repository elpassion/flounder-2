import { Module } from '@nestjs/common';
import { FilesTemporaryController } from './files-temporary.controller';
import { FilesTemporaryFacade } from './files-temporary.facade';

@Module({
  controllers: [FilesTemporaryController],
  providers: [FilesTemporaryFacade],
})
export class FilesTemporaryModule {}
