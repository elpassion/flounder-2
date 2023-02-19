import React, { PropsWithChildren } from 'react';
import { Provider } from 'react-native-paper';
import { CombinedDefaultTheme } from '../theme/Default/theme';

export const PaperProvider = (props: PropsWithChildren) => {
  return <Provider theme={CombinedDefaultTheme}>{props.children}</Provider>;
};
