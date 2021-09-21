import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import {
  checkPermission,
  foregroundNotifications,
  backgroundAndQuitStateNotifications,
} from './helpers/PushNotifications';
import { AuthStackScreen, AppDrawerScreen } from '_navigations';
import { NavigationService } from './helpers';
import { PreferencesContext } from '_context';
import storage from '../src/storage';
import { login } from '_store/user';
import { updatePlan, setMemberPlans } from '_store/plan';

import { I18nextProvider } from 'react-i18next';
import i18n from './../i18n';

import { I18nManager } from 'react-native';
import { MenuProvider } from 'react-native-popup-menu';

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
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

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

  const dispatch = useDispatch();

  const toggleTheme = () => {
    setIsDarkTheme(isDark => !isDark);
  };

  React.useEffect(() => {
    async function isLoggedIn() {
      try {
        let storedUser = await storage
          .load({
            key: 'user',
            id: 'currentUser',
          })
          .catch(err => {
            // any exception including data not found
            // goes to catch()
            // console.warn(err.message);
            switch (err.name) {
              case 'NotFoundError':
                console.log('No user to load.');
                break;
              case 'ExpiredError':
                console.log('Data expired.');
                break;
            }
          });

        if (storedUser?.id) {
          if (storedUser.MemberPlans && storedUser.MemberPlans.length > 0) {
            dispatch(setMemberPlans(storedUser.MemberPlans));
            dispatch(updatePlan(storedUser.MemberPlans[0])); //default to first plan
          }
          dispatch(login(storedUser));
        }
      } catch (error) {
        console.log(error);
      }
    }
    isLoggedIn();
  }, []);

  const toggleRTL = React.useCallback(() => {
    setIsRtl(!isRtl);
    I18nManager.forceRTL(!isRtl);
  }, [isRtl]);

  const appIsReady = () => {
    return () => {
      NavigationService.isReadyRef.current = false;
    };
  };

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
      rtl: isRtl ? 'right' : 'left',
    }),
    [isRtl, theme, toggleRTL],
  );

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <PreferencesContext.Provider value={preferences}>
          <I18nextProvider i18n={i18n}>
            <PaperProvider theme={theme}>
              <MenuProvider>
                <NavigationContainer
                  ref={NavigationService.navigationRef}
                  onReady={() => {
                    NavigationService.isReadyRef.current = true;
                  }}
                  theme={theme}>
                  {isLoading ? (
                    <></>
                  ) : user ? (
                    <AppDrawerScreen />
                  ) : (
                    <AuthStackScreen />
                  )}
                </NavigationContainer>
              </MenuProvider>
            </PaperProvider>
          </I18nextProvider>
        </PreferencesContext.Provider>
      </ApplicationProvider>
    </>
  );
};

export default Application;
