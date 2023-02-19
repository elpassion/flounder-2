import {
  DrawerActions,
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import { ScreenRoutesNames } from '../routes/interfaces';

export function useCustomNavigation() {
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  const checkIfDrawerScreenIsActive = (screenName: string) => {
    const navigationState = navigation.getState();
    if (navigationState) {
      const currentRouteIndex = navigationState.index;
      const routes = navigationState.routes;

      if (routes.length === 0) {
        return false;
      }

      const currentRouteName = routes[currentRouteIndex].name;

      return currentRouteName === screenName;
    } else if (
      screenName === ScreenRoutesNames.Home ||
      screenName === ScreenRoutesNames.Welcome
    ) {
      return true;
    }
    return false;
  };

  const closeMenu = () => {
    navigation.dispatch(DrawerActions.closeDrawer());
  };

  const openMenu = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  return { navigation, checkIfDrawerScreenIsActive, closeMenu, openMenu };
}
