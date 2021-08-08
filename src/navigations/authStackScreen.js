import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// organisms
import Splash from '_organisms/splash/splash';

// screens
import LoginScreen from '_scenes/login';

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
    </Stack.Navigator>
  );
};

export default AuthStackScreen;
