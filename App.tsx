import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import Home from './src/screens/Home';
import VideoCall from './src/screens/VideoCall';
import IncomingCallScreen from './src/screens/incomingCall';

const Stack = createStackNavigator();

function App(): JSX.Element {
 
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="VideoCall" component={VideoCall} />
        <Stack.Screen
          name="IncomingCallScreen"
          component={IncomingCallScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
