import React, { useCallback } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { Appbar, IconButton } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useCustomTheme } from '../theme/Default/theme';
import { StyledButton } from './StyledButton';
import { useCustomNavigation } from '../hooks';
import { useAuth } from '../services/auth';

const HeaderWithSession = () => {
  const { logoutUser } = useAuth();
  const { user } = useSelector((state: RootState) => state.user);

  return (
    <View style={styles.headerInfoContainer}>
      <Text testID={'signedInHeaderTitleTestID'}>{user.email}</Text>
      <StyledButton
        title={'Sign out'}
        testID={'logoutButtonTestID'}
        onPress={() => {
          logoutUser();
        }}
      />
    </View>
  );
};

const HeaderWithoutSession = () => {
  const { authorizeUser } = useAuth();

  const handleAuthorize = useCallback(async () => {
    try {
      authorizeUser();
    } catch (error) {
      Alert.alert('Failed to log in', error.message);
    }
  }, []);

  return (
    <View style={styles.headerInfoContainer}>
      <Text testID={'notSignedInHeaderTitleTestID'}>{'Not signed in'}</Text>
      <StyledButton
        title={'Sign in'}
        testID={'loginButtonTestID'}
        onPress={() => {
          handleAuthorize();
        }}
      />
    </View>
  );
};

export const NavigationBar = () => {
  const { openMenu } = useCustomNavigation();
  const { heights, colors } = useCustomTheme();
  const { user } = useSelector((state: RootState) => state.user);

  return (
    <Appbar.Header
      style={{
        height: heights.header,
        backgroundColor: colors.background,
        shadowColor: colors.shadow,
        ...styles.appbar,
      }}
      statusBarHeight={0}
    >
      <View style={styles.headerContainer}>
        <IconButton
          icon="menu"
          size={heights.icon}
          iconColor={colors.textBlack}
          onPress={() => openMenu()}
          testID={'menuIconButtonTestID'}
        />
        {user && <HeaderWithSession />}
        {!user && <HeaderWithoutSession />}
      </View>
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerInfoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 15,
  },
  appbar: {
    shadowOffset: { width: 1, height: 3 },
    elevation: 3,
  },
});
