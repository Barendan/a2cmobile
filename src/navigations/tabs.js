import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// styles
import { PRIMARY, SECONDARY, WHITE } from '_styles/colors';
import { scaleFont } from '_styles/mixins';

// screens
import HomeScreen from '_scenes/home';
import AboutScreen from '_scenes/about';

const Tab = createMaterialBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? 'home'
              : 'home-outline';
          } else if (route.name === 'About') {
            iconName = focused
              ? 'information-circle'
              : 'information-circle-outline';
          }
          return (
            <Ionicons
              name={iconName}
              size={scaleFont(25)}
              color={focused ? PRIMARY : SECONDARY}
            />
          );
        },
      })}
      activeColor={PRIMARY}
      inactiveColor={SECONDARY}
      barStyle={{backgroundColor: WHITE}}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarLabel: 'Home' }}
      />
      <Tab.Screen
        name="About"
        component={AboutScreen}
        options={{ tabBarLabel: 'About' }}
      />
    </Tab.Navigator>
  )
};

export default Tabs;
