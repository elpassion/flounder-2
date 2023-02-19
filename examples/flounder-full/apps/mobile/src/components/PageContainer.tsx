import React, { PropsWithChildren } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { NavigationBar } from './NavigationBar';
import { useCustomTheme } from '../theme/Default/theme';

// eslint-disable-next-line @typescript-eslint/ban-types
export const PageContainer = (props: PropsWithChildren<{}>) => {
  const { colors, margins } = useCustomTheme();

  return (
    <SafeAreaView
      style={{ ...styles.container, backgroundColor: colors.background }}
    >
      <NavigationBar />
      <ScrollView contentContainerStyle={{ paddingHorizontal: margins.screen }}>
        {props.children}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
});
