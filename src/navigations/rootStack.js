import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Tabs from './tabs';

// organisms
import Splash from '_organisms/splash/splash';

// screens
import LoginScreen from '_scenes/login';
import RegistrationScreen from '_scenes/registration';

import HomeScreen from '_scenes/home';

const Stack = createStackNavigator();

const RootStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{ title: null, headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: null, headerShown: false }}
      />
      <Stack.Screen
        name="Registration"
        component={RegistrationScreen}
        options={{ title: null, headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={Tabs}
        options={{ title: null, headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default RootStack;
