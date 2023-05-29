import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home';
import VideoCall from '../screens/VideoCall';
import IncomingCallScreen from '../screens/incomingCall';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {replace, setNavigationReference} from '../services/NavigationService';
import SplashScreen from './SplashScreen';

const Stack = createStackNavigator();

const MainScreen = () => {
  useEffect(() => {
    setTimeout(async () => {
      const notificationNavigation = await AsyncStorage.getItem(
        'NotificationNavigation',
      );
      if (notificationNavigation) {
        // Clear the stored navigation details
        await AsyncStorage.removeItem('NotificationNavigation');
        // Set the initial screen for navigation
        //navigate(notificationNavigation, {});
        replace(notificationNavigation);
      } else {
        replace('Home');
      }
    }, 5000);
  }, []);

  return (
    <NavigationContainer ref={setNavigationReference}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="VideoCall" component={VideoCall} />
        <Stack.Screen
          name="IncomingCallScreen"
          component={IncomingCallScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainScreen;
