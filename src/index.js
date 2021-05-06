import React, { useEffect } from 'react';
import {
  checkPermission,
  foregroundNotifications,
  backgroundAndQuitStateNotifications,
} from './services/PushNotifications';
import { NavigationContainer } from '@react-navigation/native';
import { RootStack } from './navigations/index';
import { navigationRef, isReadyRef } from '_services/NavigationService';

const App = () => {

  const appIsReady = () => {
    return () => {
      isReadyRef.current = false
    };
  }

  useEffect(() => {
    appIsReady();
    checkPermission();
    foregroundNotifications();
    backgroundAndQuitStateNotifications();
  }, []);

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        isReadyRef.current = true;
      }}
    >
      <RootStack />
    </NavigationContainer>
  )
};

export default App;
