import {createBottomTabNavigator} from 'react-navigation-tabs';

import HomeScreen from '_scenes/home';
import AboutScreen from '_scenes/about';
import RegistrationScreen from '_scenes/registration';

const TabNavigatorConfig = {
  initialRouteName: 'Home',
  header: null,
  headerMode: 'none',
};

const RouteConfigs = {
  Home: {
    screen: HomeScreen,
  },
  About: {
    screen: AboutScreen,
  },
  Registration: {
    screen: RegistrationScreen,
  },
};

const AppNavigator = createBottomTabNavigator(RouteConfigs, TabNavigatorConfig);

export default AppNavigator;
