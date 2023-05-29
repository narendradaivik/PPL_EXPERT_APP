import React, {useState, useEffect} from 'react';
import {Text,View} from 'react-native';

import AgoraUIKit from 'agora-rn-uikit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BackHandler} from 'react-native';
import functions from '@react-native-firebase/functions';
import messaging from '@react-native-firebase/messaging';

const VideoCall = ({navigation}) => {
  const [videoCall, setVideoCall] = useState(false);
  const [connectionData, setconnectionData] = useState();

  const callbacks = {
    EndCall: () => {
      setVideoCall(false);
      navigation.navigate('Home')
    },
  };
  const handleBackButton = () => {
    return true;
  };
  useEffect(() => {
    // Disable the back button
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    //get channel id from storage saved when recived notification
    const getChannelId = async () => {
      const data = await AsyncStorage.getItem('dataMessage');
      const channelId = JSON.parse(data)?.data
      setconnectionData({
        appId: 'd27b9a93945b436dab11d9987110c87c',
        channel: channelId?.callChannelName,
      });
      setVideoCall(true)
    };
    getChannelId();
    // Clean up the event listener when the component is unmounted
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  }, []);

  const getToken = async () => {
    const dataMessage = await AsyncStorage.getItem('dataMessage');
    const channelName = JSON.parse(dataMessage).data.callChannelName;
    const deviceToken = await messaging().getToken();
    if (channelName) {
      setChannelId(channelName);
      const tokenData = {
        uid: deviceToken,
        channelName: channelName,
        expirationTimeInSeconds: '3600',
      };

      //get token and update connectionData
      await functions()
        .httpsCallable('generateAgoraToken')(tokenData)
        .then(async response => {
          console.log(response);
          if (response.token) {
            setConnectionData({
              appId: '1f9cbb1b670b4a248f18b61ca52d0dd8',
              channel: channelName,
              rtcToken: response.token,
              rtcUid: deviceToken,
            });
            setVideoCall(true);
          }
        })
        .catch(error => console.log(error));
    }
  };
  
  return videoCall  ? (
    <AgoraUIKit connectionData={connectionData} rtcCallbacks={callbacks} />
  ) : (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text onPress={() => setVideoCall(true)}>Loading</Text>
    </View>
  );
};

export default VideoCall;
