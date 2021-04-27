import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from '../components/organisms/splash/splash';
import LoginScreen from '_scenes/login';
import HomeScreen from '_scenes/home';
import Tabs from './tabs';

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
        name="Home"
        component={Tabs}
        options={{ title: null, headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default RootStack;
