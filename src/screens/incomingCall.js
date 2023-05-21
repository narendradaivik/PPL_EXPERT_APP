import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
var Sound = require('react-native-sound');

const IncomingCallScreen = ({navigation}) => {
  
  const [callStatus, setCallStatus] = useState('Incoming');
/* 
    // Enable playback in silence mode
Sound.setCategory('Playback');

// Load the sound file 'whoosh.mp3' from the app bundle
// See notes below about preloading sounds within initialization code below.
var whoosh = new Sound('call.mp3', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // loaded successfully
  console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());

  // Play the sound with an onEnd callback
  whoosh.play((success) => {
    if (success) {
      console.log('successfully finished playing');
    } else {
      console.log('playback failed due to audio decoding errors');
    }
  });
}); */


  const acceptCall = () => {
    navigation.navigate('VideoCall');
  };

  const rejectCall = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <View style={styles.callerInfoContainer}>
        <Text style={styles.callerName}>Gurpreet Singh</Text>
        <Text style={styles.callerNumber}>xxxxxxxxxxx</Text>
      </View>
      <View style={styles.callStatusContainer}>
        <Text style={styles.callStatus}>Incoming Call</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.acceptButton]}
          onPress={acceptCall}>
          <Text style={styles.buttonText}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.rejectButton]}
          onPress={rejectCall}>
          <Text style={styles.buttonText}>Reject</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  callerInfoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  callerName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  callerNumber: {
    fontSize: 18,
    color: '#777',
  },
  callStatusContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: '#f1f1f1',
    marginBottom: 30,
  },
  callStatus: {
    fontSize: 20,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    marginHorizontal: 10,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  acceptButton: {
    backgroundColor: '#0f9d58',
  },
  rejectButton: {
    backgroundColor: '#db4437',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default IncomingCallScreen;
