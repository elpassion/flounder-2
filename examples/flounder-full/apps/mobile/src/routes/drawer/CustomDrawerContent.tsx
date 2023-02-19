import React from 'react';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
  useDrawerStatus,
} from '@react-navigation/drawer';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { ScreenRoutesNames } from '../interfaces';
import { useCustomTheme } from '../../theme/Default/theme';
import { CloseIcon, DrawerButton, DrawerHeader } from './index';
import { useCustomNavigation } from '../../hooks';

export const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const { colors } = useCustomTheme();
  const { navigation, checkIfDrawerScreenIsActive, closeMenu } =
    useCustomNavigation();
  const isDrawerOpen = useDrawerStatus() === 'open';
  const { user } = useSelector((state: RootState) => state.user);

  const navigateToScreen = (screenName: string) => {
    if (user) {
      navigation.navigate(screenName);
      closeMenu();
    }
  };

  return (
    <SafeAreaView
      style={{ ...styles.container, backgroundColor: colors.bgGray800 }}
    >
      {isDrawerOpen && <CloseIcon />}
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.drawerContent}
      >
        <DrawerHeader />
        <DrawerItemList {...props} />
        <View style={styles.navigationContainer}>
          <DrawerButton
            onPress={() => {
              navigateToScreen(ScreenRoutesNames.Home);
            }}
            label={'Home'}
            icon={'home-outline'}
            isActive={checkIfDrawerScreenIsActive(
              user ? ScreenRoutesNames.Home : ScreenRoutesNames.Welcome
            )}
          />
          <DrawerButton
            onPress={() => {
              navigateToScreen(ScreenRoutesNames.Users);
            }}
            label={'Users'}
            icon={'account-multiple-outline'}
            isActive={checkIfDrawerScreenIsActive(ScreenRoutesNames.Users)}
          />
          <DrawerButton
            onPress={() => {
              navigateToScreen(ScreenRoutesNames.Subscriptions);
            }}
            label={'Subscriptions'}
            icon={'email-outline'}
            isActive={checkIfDrawerScreenIsActive(
              ScreenRoutesNames.Subscriptions
            )}
          />
          <DrawerButton
            onPress={() => {
              navigateToScreen(ScreenRoutesNames.Emails);
            }}
            label={'Emails'}
            icon={'at'}
            isActive={checkIfDrawerScreenIsActive(ScreenRoutesNames.Emails)}
          />
        </View>
      </DrawerContentScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerContent: {
    paddingTop: 0,
  },
  navigationContainer: {
    paddingTop: 30,
  },
});
