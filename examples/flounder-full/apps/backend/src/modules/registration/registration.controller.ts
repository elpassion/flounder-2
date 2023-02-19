import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { RegistrationFacade } from './registration.facade';
import { ConflictDTO, GetUserDto, SignUpDto } from '@flounder/contracts';
import { UserAlreadyExistsExceptionFilter } from '../../shared/error-filters/user-already-exists-exception.filter';
import { ApiConflictResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Registration')
@Controller('registration')
export class RegistrationController {
  constructor(private readonly registrationFacade: RegistrationFacade) {}

  @Post()
  @UseFilters(UserAlreadyExistsExceptionFilter)
  @ApiConflictResponse({ type: ConflictDTO })
  registerUser(@Body() dto: SignUpDto): Promise<GetUserDto> {
    return this.registrationFacade.registerUser(dto);
  }
}
