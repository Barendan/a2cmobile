import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { DrawerContent } from './drawerContent';

// screens
import { DashboardStack } from './dashboardStackScreen';

const DrawerNav = createDrawerNavigator();

const AppDrawerScreen = (props) => {
  return (
    <DrawerNav.Navigator
      initialRouteName="Dashboard"
      drawerContent={props => <DrawerContent {...props} />}>
      <DrawerNav.Screen name="Dashboard" component={DashboardStack} />
    </DrawerNav.Navigator>
  )
};

export default AppDrawerScreen;
