import { Body, Controller, Get, Put } from '@nestjs/common';
import { Action } from '../../auth/casl/enums/action.enum';
import { Authenticate } from '../../auth/guards/authenticate.guard';
import { Authorize } from '../../auth/guards/authorize.guard';
import { FeatureFlagsFacade } from '../../modules/feature-flags/feature-flags.facade';
import { FeatureFlagDto } from '@flounder/contracts';
import { Subject } from '../../auth/casl/enums/subject.enum';
import { ApiTags } from '@nestjs/swagger';
import { Paginated } from '@flounder/pagination';

@ApiTags('Feature Flags', 'Admin')
@Controller('admin/feature-flags')
export class FeatureFlagsController {
  constructor(private readonly featureFlagsFacade: FeatureFlagsFacade) {}

  @Get()
  @Authorize(Action.Read, Subject.FEATURE_FLAG)
  @Authenticate()
  getFlags(): Paginated<FeatureFlagDto> {
    return this.featureFlagsFacade.getFlags();
  }

  @Put()
  @Authorize(Action.Update, Subject.FEATURE_FLAG)
  @Authenticate()
  toggleFlag(@Body() flag: FeatureFlagDto): FeatureFlagDto {
    return this.featureFlagsFacade.toggleFlag(flag);
  }
}
