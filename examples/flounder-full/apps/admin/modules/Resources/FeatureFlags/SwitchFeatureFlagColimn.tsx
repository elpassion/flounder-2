import { useState } from 'react';
import { Switch } from '@pankod/refine-antd';
import { useNotification } from '@pankod/refine-core';
import { FeatureFlagDto, FeatureFlagsEnum } from '@flounder/contracts';
import { useApi } from '../../Api';

export const FeatureFlagSwitch = ({ name, isActive }: FeatureFlagDto) => {
  const [isFeatureActive, setIsFeatureAvtive] = useState<boolean>(isActive);
  const { changeFeatureState } = useApi();
  const notification = useNotification();

  const changeFeatureStateHandler = async (feature: FeatureFlagsEnum, isActive: boolean) => {
    try {
      await changeFeatureState(feature, isActive);
      notification.open({
        type: 'success',
        message: `${feature} is now ${isActive ? 'active' : 'inactive'}`,
      });
    } catch (error) {
      notification.open({
        type: 'error',
        description: `Something went wrong with feature ${feature} deactivation`,
        message: error.message,
      });
    }
  };

  return (
    <Switch
      checked={isFeatureActive}
      onChange={() => {
        changeFeatureStateHandler(name, !isFeatureActive);
        setIsFeatureAvtive(!isFeatureActive);
      }}
    />
  );
};
