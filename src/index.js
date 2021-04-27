import React, {useEffect} from 'react';
import {
  checkPermission,
  foregroundNotifications,
  backgroundAndQuitStateNotifications,
} from './services/PushNotifications';
import {NavigationContainer} from '@react-navigation/native';
import Navigator from '_navigations';
import {RootStack} from './navigations/index';

const App = () => {
  useEffect(() => {
    checkPermission();
    foregroundNotifications();
    backgroundAndQuitStateNotifications();
  }, []);

  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  )
};

export default App;
