import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, Text } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { DrawerActions } from '@react-navigation/native';

import Tabs from './tabs';
import Drawer from './appDrawerScreen';

// organisms
import Splash from '_organisms/splash/splash';

// screens
import LoginScreen from '_scenes/login';
import RegistrationScreen from '_scenes/registration';
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
        name="Registration"
        component={RegistrationScreen}
        options={{ title: null, headerShown: false }}
      />
      <Stack.Screen
        name="FAQs"
        component={FaqScreen}
        options={{ title: null, headerShown: false }}
      />
     
    </Stack.Navigator>
  );
}

export default AuthStackScreen;


{/* <Stack.Screen
name="Home"
component={DashboardScreen}
options={({ navigation }) => 
({ title: "Products", 
    headerLeft: () => <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}> 
                      <Text>Menu</Text>
                      </TouchableOpacity>, 
    headerLeftContainerStyle: { paddingLeft: 10 } })}
/> */}