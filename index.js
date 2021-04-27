import 'react-native-gesture-handler';
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './src';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

const HeadlessCheck = ({isHeadless}) => {
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null;
  }

  return <App />;
};

AppRegistry.registerComponent(appName, () => HeadlessCheck);
AppRegistry.registerHeadlessTask(
  'RNFirebaseBackgroundMessage',
  () => messaging().firebaseBackgroundMessage,
);
