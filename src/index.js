import React, {useEffect} from 'react';
import {
  checkPermission,
  foregroundNotifications,
  backgroundAndQuitStateNotifications,
} from './src/services/PushNotifications';
import Navigator from '_navigations';

const App = () => {
  useEffect(() => {
    checkPermission();
    foregroundNotifications();
    backgroundAndQuitStateNotifications();
  }, []);

  return <Navigator />;
};

export default App;
