import React, { useEffect } from 'react';
import {
  checkPermission,
  foregroundNotifications,
  backgroundAndQuitStateNotifications,
} from './services/PushNotifications';
import { NavigationContainer } from '@react-navigation/native';
import { RootStack } from './navigations/index';
import { navigationRef, isReadyRef } from '_services/NavigationService';
import { I18nextProvider } from 'react-i18next';
import i18n from './../i18n';

import * as eva from '@eva-design/eva';
import {ApplicationProvider} from '@ui-kitten/components';

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
    <I18nextProvider i18n={i18n}>
        <ApplicationProvider {...eva} theme={eva.light}>

      <NavigationContainer
        ref={navigationRef}
        onReady={() => {
          isReadyRef.current = true;
        }}
      >
        <RootStack />
      </NavigationContainer>
      </ApplicationProvider>
    </I18nextProvider>
  )
};

export default App;
