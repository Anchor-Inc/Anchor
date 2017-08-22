import React from 'react';

import { TabNavigator, StackNavigator, NavigationActions } from 'react-navigation';
import { NavigationComponent } from 'react-native-material-bottom-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { MAIN_COLOR, BOTTOM_BAR_COLOR, BOTTOM_BAR_ICON_COLOR } from '../config';
import { Classes, Settings, Search, SplashScreen, Preferences } from '../components/screens';
import { Header } from '../components/common';
import Login from '../components/screens/Login';
import Main from '../Main';

export const LoginStack = StackNavigator({
  SplashScreen: {
    screen: SplashScreen,
    navigationOptions: {
      header: null,
    },
  },
  Login: {
    screen: Login,
    navigationOptions: {
      header: null,
    },
  },
  Preferences: {
    screen: Preferences,
    navigationOptions: {
      header: <Header title='Preferences' prefButtons />,
    },
  },
  Main: {
    screen: Main,
    navigationOptions: {
      header: null,
    },
  },
});

const defaultGetStateForAction = LoginStack.router.getStateForAction;

LoginStack.router.getStateForAction = (action, state) => {
  // Prevent from going back to the Splash Screen from the Login Screen
  if (
    state &&
    action.type === NavigationActions.BACK &&
    state.routes[state.index].routeName === 'Login'
  ) { return null; }

  // Prevent from going back to Login from any screen
  if (
    state &&
    action.type === 'Navigation/BACK' && 
    (state.routes[state.index].routeName !== 'SplashScreen' &&
    state.routes[state.index].routeName !== 'Login')
  ) { return null; }
  return defaultGetStateForAction(action, state);
};

export const Tabs = TabNavigator({
  Classes: {
    screen: Classes,
    navigationOptions: {
      tabBarLabel: 'Classes',
      tabBarIcon: () => <Icon size={24} name="list" color={BOTTOM_BAR_ICON_COLOR} />,
    },
  },
  Search: {
    screen: Search,
    navigationOptions: {
      tabBarLabel: 'Search',
      tabBarIcon: () => <Icon size={24} name="search" color={BOTTOM_BAR_ICON_COLOR} />,
    },
  },
  Settings: {
    screen: Settings,
    navigationOptions: {
      tabBarLabel: 'Settings',
      tabBarIcon: () => <Icon size={24} name="settings" color={BOTTOM_BAR_ICON_COLOR} />,
    },
  },
}, {
  tabBarComponent: NavigationComponent,
  tabBarPosition: 'bottom',
  swipeEnabled: false,
  tabBarOptions: {
    bottomNavigationOptions: {
      labelColor: BOTTOM_BAR_ICON_COLOR,
      rippleColor: MAIN_COLOR,
      shifting: false,
      tabs: {
        Search: {
          barBackgroundColor: BOTTOM_BAR_COLOR,
          activeIcon: <Icon size={24} name="search" color={MAIN_COLOR} />,
          activeLabelColor: MAIN_COLOR,
        },
        Classes: {
          barBackgroundColor: BOTTOM_BAR_COLOR,
          activeIcon: <Icon size={24} name="list" color={MAIN_COLOR} />,
          activeLabelColor: MAIN_COLOR,
        },
        Settings: {
          barBackgroundColor: BOTTOM_BAR_COLOR,
          activeIcon: <Icon size={24} name="settings" color={MAIN_COLOR} />,
          activeLabelColor: MAIN_COLOR,
        },
      },
    },
  },
});
