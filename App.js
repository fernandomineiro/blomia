/**
 * @format
 */
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import { AppRegistry, Platform } from 'react-native';
import App from './src/routes';
// encaixar no drawer import App from './src/pages/empresa/dadosEmpresa/dadosEmpresa.js';
import { name as appName } from './app.json';

import store from './src/store/store';

// Register background handler
if (Platform.OS === 'android') {
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });
}

const storeRedux = store();
const Redux = () => {
  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    return enabled;
  };

  useEffect(() => {
    if (Platform.OS === 'ios') {
      requestUserPermission();
    }
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('Message handled in the openig app!', remoteMessage);
    });
    return unsubscribe;
  }, []);

  return (
    <Provider store={storeRedux}>
      <App />
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => Redux);
