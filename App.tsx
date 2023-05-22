import React, {useEffect, useState} from 'react';
import {NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import messaging from '@react-native-firebase/messaging';
import Home from './src/screens/Home';
import VideoCall from './src/screens/VideoCall';
import IncomingCallScreen from './src/screens/incomingCall';
import { setNavigationReference } from './services/NavigationService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();


const App = () => {
  const [initialScreen, setInitialScreen] = useState('');

  useEffect(() => {
    const handleNotificationNavigation = async () => {
      const notificationNavigation = await AsyncStorage.getItem('NotificationNavigation');
      if (notificationNavigation) {
        // Clear the stored navigation details
        await AsyncStorage.removeItem('NotificationNavigation');
        // Set the initial screen for navigation
        setInitialScreen(notificationNavigation);
      }else{
        setInitialScreen('Home')
      }
    };

    handleNotificationNavigation();
  }, []);

  if(initialScreen == ''){
    return null;
  }
  return (
    <NavigationContainer ref={setNavigationReference}>
      <Stack.Navigator initialRouteName={initialScreen} screenOptions={{headerShown: false,}}>

        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="VideoCall" component={VideoCall} />
        <Stack.Screen name="IncomingCallScreen"
          component={IncomingCallScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
