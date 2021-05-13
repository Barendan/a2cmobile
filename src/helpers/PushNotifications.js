import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as NavigationService from './NavigationService';

export const foregroundNotifications = () => {
  const unsubscribe = messaging().onMessage(async remoteMessage => {
    Alert.alert(
      remoteMessage.notification.title,
      remoteMessage.notification.body,
      [
        {text: 'Dismiss'},
        {
          text: 'View',
          onPress: () => NavigationService.navigate(remoteMessage.data.screen),
        },
      ],
    );
  });

  return unsubscribe;
};

export const backgroundAndQuitStateNotifications = () => {
  // Assume a message-notification contains a "screen" property in the data payload of the screen to open

  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
    NavigationService.navigate(remoteMessage.data.screen);
  });

  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
        if (remoteMessage.data.screen) {
          NavigationService.navigate(remoteMessage.data.screen);
        }
      }
    });
};

export const checkPermission = async () => {
  const enabled = await messaging().hasPermission();
  if (enabled) {
    getToken();
  } else {
    requestUserPermission();
  }
};

const getToken = async () => {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  if (!fcmToken) {
    fcmToken = await messaging().getToken();
    if (fcmToken) {
      await AsyncStorage.setItem('fcmToken', fcmToken);
    }
  }
};

const requestUserPermission = async () => {
  try {
    const authorizationStatus = await messaging().requestPermission();

    if (authorizationStatus) {
      getToken();
      console.log('Permission status:', authorizationStatus);
    }
  } catch (error) {
    console.log('permission rejected');
  }
};
