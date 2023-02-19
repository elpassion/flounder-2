import { FileDestinationDto, FileMetadataDto } from '@flounder/storage';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { FilesTemporaryFacade } from './files-temporary.facade';

@ApiTags('Files')
@Controller('files')
export class FilesTemporaryController {
  constructor(private readonly filesTemporaryFacade: FilesTemporaryFacade) {}

  @ApiCreatedResponse({
    description: 'Signed url and key identifying uploaded to external storage file',
    type: FileDestinationDto,
  })
  @Post('/images')
  createTemporaryImageDestination(@Body() fileMetadata: FileMetadataDto) {
    return this.filesTemporaryFacade.createFileDestination(fileMetadata, 'images');
  }
}
