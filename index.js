/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {navigate} from './src/services/NavigationService';

// Configure PushNotification
PushNotification.configure({
  onNotification: function (notification) {
    console.log('Notification received:', notification);
    navigate('IncomingCallScreen', {});

    // Handle the received notification
    // You can navigate to a specific screen or perform any other action here
  },
  ongoing: true,
  importance: 'high',
  priority: 'max',
  autoCancel: false,
});

// Handle the initial data message received when the app is in a quit state
PushNotification.popInitialNotification(async notification => {
  if (notification && notification.data) {
    const data = notification.data;
  }
});
// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
  await AsyncStorage.setItem('dataMessage', JSON.stringify(remoteMessage));

  // Display the sticky notification
  PushNotification.localNotification({
    channelId: 'PPL_Call',
    title: 'Call From JaiKishaan Store',
    message: 'Join the video call for assistance',
    vibrate: true,
    playSound: true,
    importance: 'high',
    userInfo: remoteMessage,
  });
});
AppRegistry.registerComponent(appName, () => App);
