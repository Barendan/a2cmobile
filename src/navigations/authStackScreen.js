import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerActions } from '@react-navigation/native';

// organisms
import Splash from '_organisms/splash/splash';

// screens
import LoginScreen from '_scenes/login';
import FaqScreen from '_scenes/faq';
import DashboardScreen from '_scenes/dashboard';

const Stack = createStackNavigator();

const AuthStackScreen = () => {
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
        name="FAQs"
        component={FaqScreen}
        options={{ title: null, headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AuthStackScreen;
