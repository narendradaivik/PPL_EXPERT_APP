import React, {useState, useEffect} from 'react';
import {Text} from 'react-native';

import AgoraUIKit from 'agora-rn-uikit';
import {Alert} from 'react-native';
import messaging from '@react-native-firebase/messaging';

const VideoCall = () => {
  const [videoCall, setVideoCall] = useState(true);
  const [channelId , setChannelId] = useState();
  const connectionData = {
    appId: '46ae009350f24d7286a16c9cc7f83225',
    channel: 'expert1',
  };

  const callbacks = {
    EndCall: () => setVideoCall(false),
  };

  useEffect(() => {
    const getChannelID = async () => {
      const dataMessage = await AsyncStorage.getItem('dataMessage');
      if(dataMessage?.data.callChannelName){
        setChannelId(dataMessage.data.callChannelName)
      }
    }
    getChannelID();
  }, []);

  return videoCall ? (
    <AgoraUIKit connectionData={connectionData} rtcCallbacks={callbacks} />
  ) : (
    <Text onPress={() => setVideoCall(true)}>Start Call</Text>
  );
};

export default VideoCall;
