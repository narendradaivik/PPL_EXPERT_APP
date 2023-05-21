import React, {useState, useEffect} from 'react';
import {Text} from 'react-native';

import AgoraUIKit from 'agora-rn-uikit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BackHandler } from 'react-native';
import functions from '@react-native-firebase/functions';
import messaging from '@react-native-firebase/messaging';


const VideoCall = ({navigation}) => {
  const [videoCall, setVideoCall] = useState(false);
  const [channelId , setChannelId] = useState();
  const [connectionData, setConnectionData] = useState();
  

  const callbacks = {
    EndCall: () => navigation.navigate('Home'),
  };

  useEffect(() => {
    const handleBackButton = () => {
      return true;
    };

    // Disable the back button
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    
   
    //get token from server 
    getToken()
    console.log(connectionData, 'getChannelID')
    // Clean up the event listener when the component is unmounted
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  }, []);

  const getToken = async () => {

    const dataMessage = await AsyncStorage.getItem('dataMessage');
    const channelName = JSON.parse(dataMessage).data.callChannelName
    const deviceToken =  await messaging().getToken()

    if(channelName){
      setChannelId(channelName)
    const tokenData = {
      uid: deviceToken,
      channelName: channelName,
      expirationTimeInSeconds: '3600',
    };

    //get token and update connectionData
    await functions()
      .httpsCallable('generateAgoraToken')(tokenData)
      .then ( async response  => {
        console.log(response)
        if (response.token) {
          setConnectionData({
            appId: '1f9cbb1b670b4a248f18b61ca52d0dd8',
            channel: channelName,
            rtcToken: response.token,
            rtcUid: deviceToken,
          });
          setVideoCall(true);
        }
      }).catch((error) => console.log(error));
    }

  };
  return videoCall ? (
    <AgoraUIKit  connectionData={connectionData}  rtcCallbacks={callbacks} rtcToken={connectionData?.rtcToken} rtcUid= {connectionData?.rtcUid} />
  ) : (
    <Text onPress={() => setVideoCall(true)}>Start Call</Text>
  );
};

export default VideoCall;
