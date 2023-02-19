import { IFileDestinationDto, IFileMetadataDto } from '@flounder/contracts';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class FileMetadataDto implements IFileMetadataDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  fileName!: string;

  @ApiProperty({
    description: 'Size of file that we want to prepare upload for',
    type: Number,
    minimum: 1,
    maximum: 5 * 1024 * 1024,
  })
  @Min(1)
  @Max(5 * 1024 * 1024)
  fileSize!: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  fileType!: string;
}

export class FileDestinationDto implements IFileDestinationDto {
  @ApiProperty({
    description:
      'Key that should be sent back (this will allow us to identify where the file has been put)',
  })
  key!: string;

  @ApiProperty({
    description: 'Signed URL with a destination to PUT file to',
  })
  url!: string;
}
