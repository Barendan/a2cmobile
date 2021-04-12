import React, {useEffect} from 'react';
import {SafeAreaView, Text} from 'react-native';
import {
  checkPermission,
  foregroundNotifications,
  backgroundAndQuitStateNotifications,
} from './src/services/PushNotifications';

const App = () => {
  useEffect(() => {
    checkPermission();
    foregroundNotifications();
    backgroundAndQuitStateNotifications();
  }, []);

  return (
    <SafeAreaView>
      <Text>Hello World</Text>
    </SafeAreaView>
  );
};

export default App;
