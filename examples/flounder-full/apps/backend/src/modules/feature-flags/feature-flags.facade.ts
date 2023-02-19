import { Injectable } from '@nestjs/common';
import { FeatureFlagDto, FeatureFlagsEnum } from '@flounder/contracts';
import { FeatureFlagsProviderConfig } from './feature-flags-config.provider';
import { Paginated } from '@flounder/pagination';

@Injectable()
export class FeatureFlagsFacade {
  constructor(private readonly featureFlagsProvider: FeatureFlagsProviderConfig) {}

  isEnabled(flagName: FeatureFlagsEnum): boolean {
    return this.featureFlagsProvider[flagName];
  }

  getFlags(): Paginated<FeatureFlagDto> {
    const data = Object.values(FeatureFlagsEnum).map(flag => {
      return {
        name: flag,
        isActive: this.featureFlagsProvider[flag],
      };
    });

    return {
      data,
      links: {
        current: '',
      },
      meta: {
        currentPage: 0,
        itemsPerPage: 60,
        search: '',
        searchBy: [],
        sortBy: [],
        totalItems: data.length,
        totalPages: 1,
      },
    };
  }

  toggleFlag(flag: FeatureFlagDto): FeatureFlagDto {
    flag.isActive
      ? this.featureFlagsProvider.enableFlag(flag.name)
      : this.featureFlagsProvider.disableFlag(flag.name);
    return {
      name: flag.name,
      isActive: this.isEnabled(flag.name),
    };
  }
}
