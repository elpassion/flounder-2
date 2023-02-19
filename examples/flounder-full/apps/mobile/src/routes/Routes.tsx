import * as React from 'react';
import { ScreenRoutesNames } from './interfaces';
import {
  WelcomeScreen,
  HomeScreen,
  UsersScreen,
  SubscriptionsScreen,
  EmailsScreen,
} from '../screens';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import {
  createDrawerNavigator,
  DrawerNavigationOptions,
} from '@react-navigation/drawer';
import { CustomDrawerContent } from './drawer';

const Drawer = createDrawerNavigator();

const drawerScreenOptions: DrawerNavigationOptions = {
  drawerItemStyle: {
    display: 'none',
  },
  headerShown: false,
};

const drawerContentOptions: DrawerNavigationOptions = {
  drawerType: 'front',
};

const UnauthorisedRoutes = () => {
  return (
    <Drawer.Navigator
      initialRouteName={ScreenRoutesNames.Welcome}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={drawerContentOptions}
    >
      <Drawer.Screen
        name={ScreenRoutesNames.Welcome}
        component={WelcomeScreen}
        options={drawerScreenOptions}
      />
    </Drawer.Navigator>
  );
};

const AuthorisedRoutes = () => {
  return (
    <Drawer.Navigator
      initialRouteName={ScreenRoutesNames.Home}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={drawerContentOptions}
    >
      <Drawer.Screen
        name={ScreenRoutesNames.Home}
        component={HomeScreen}
        options={drawerScreenOptions}
      />
      <Drawer.Screen
        name={ScreenRoutesNames.Users}
        component={UsersScreen}
        options={drawerScreenOptions}
      />
      <Drawer.Screen
        name={ScreenRoutesNames.Subscriptions}
        component={SubscriptionsScreen}
        options={drawerScreenOptions}
      />
      <Drawer.Screen
        name={ScreenRoutesNames.Emails}
        component={EmailsScreen}
        options={drawerScreenOptions}
      />
    </Drawer.Navigator>
  );
};

function Routes() {
  const { user } = useSelector((state: RootState) => state.user);

  if (user) {
    return <AuthorisedRoutes />;
  }

  return <UnauthorisedRoutes />;
}

export default Routes;
