import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import {useDispatch, useSelector} from 'react-redux';
import {
  checkPermission,
  foregroundNotifications,
  backgroundAndQuitStateNotifications,
} from './services/PushNotifications';
import { AuthStackScreen, AppDrawerScreen } from './navigations/index';
import { navigationRef, isReadyRef } from '_services/NavigationService';
import { PreferencesContext } from '_context';

import { I18nextProvider } from 'react-i18next';
import i18n from './../i18n';

import { I18nManager } from 'react-native';

import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';

import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';



const CombinedDefaultTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
};
const CombinedDarkTheme = { ...PaperDarkTheme, ...NavigationDarkTheme };

const Application = () => {

  const { user } = useSelector(state => state.user);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);
  const theme = isDarkTheme ? CombinedDarkTheme : CombinedDefaultTheme; // Use Light/Dark theme based on a state
  const [isRtl, setIsRtl] = React.useState(I18nManager.isRTL);

  const toggleTheme = () => {
    setIsDarkTheme(isDark => !isDark);
  }

  const toggleRTL = React.useCallback(() => {
    setIsRtl(!isRtl)
    I18nManager.forceRTL(!isRtl);
  }, [isRtl]);

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

  const preferences = React.useMemo(
    () => ({
      toggleTheme,
      toggleRTL,
      theme,
      rtl: (isRtl ? 'right' : 'left'),
    }),
    [isRtl, theme, toggleRTL]
  );

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <PreferencesContext.Provider value={preferences}>

        <I18nextProvider i18n={i18n}>
          <PaperProvider theme={theme}>

          <NavigationContainer
            ref={navigationRef}
            onReady={() => {
                isReadyRef.current = true;
            }}
            theme={theme}
        >
            {isLoading ? (
                <></>
            ) : user ? (
                <AppDrawerScreen />
            ) : (
                <AuthStackScreen />
            )}

        </NavigationContainer>
            
          </PaperProvider>

        </I18nextProvider>
      </PreferencesContext.Provider>
    </ApplicationProvider>
  )

};

export default Application;
