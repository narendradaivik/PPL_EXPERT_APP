import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  KeyboardAvoidingView,
} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({navigation  }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [token, setToken] = useState();
  const [isTokenSaved, setIsTokenSaved] = useState(false);

  getFCMToken = async () => {
    // Request permission for notifications (optional)
    await messaging().requestPermission();
    // Get the device token
    await messaging()
      .getToken()
      .then(token => {
        console.log('Device Token:', token);
        setToken(token);
        
      })
      .catch(error => {
        console.error('Error retrieving device token:', error);
      });
  };
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      if(remoteMessage){
        await AsyncStorage.setItem('dataMessage', JSON.stringify(remoteMessage));
        navigation.navigate('IncomingCallScreen',);
      }
    });

    
    //check token and number already updated and token is same as before
    const loadData = async () => {
      try {
        //get fcm token of device to send notification on this device
        const deviceToken = await messaging().getToken();
        setToken(deviceToken);
        const savedToken = await AsyncStorage.getItem('token');
        const savedPhoneNumber = await AsyncStorage.getItem('phoneNumber');
        if (savedToken && savedPhoneNumber) {
          //check if token and number are same
          if (savedToken === deviceToken) {
            setPhoneNumber(savedPhoneNumber);
            setIsTokenSaved(true);
          } else {
            console.log('Token not same');
            console.log(token);
            setIsTokenSaved(false);
          }
        } else {
          setIsTokenSaved(false);
        }
      } catch (error) {
        console.error('Error loading data from local storage', error);
        setIsTokenSaved(false);
      }
    };

    loadData();
    return unsubscribe;

  }, []);

  const handleSubmit = () => {
    const data = {
      mobile: phoneNumber,
      fcmId: token,
    };

    // Make the HTTP POST request using axios
    axios
      .put('http://164.52.219.123:8084/kisaan/v1/consultant/updatefcmid', data)
      .then(response => {
        console.log('Form submitted successfully');
        // Save the token and phone number in local storage
        AsyncStorage.setItem('token', token);
        AsyncStorage.setItem('phoneNumber', phoneNumber);
        setIsTokenSaved(true);
      })
      .catch(error => {
        console.error('Error submitting form', error);
      });
  };

  return (
    <View style={styles.container}>
      {!isTokenSaved ? (
        <View>
          <KeyboardAvoidingView>
            <TextInput
              placeholder="Phone Number"
              value={phoneNumber}
              onChangeText={text => setPhoneNumber(text)}
              style={styles.input}
            />
            <TextInput
              placeholder="Token"
              value={token}
              onChangeText={text => setToken(text)}
              style={{display: 'none'}} // Hide the field
            />
          </KeyboardAvoidingView>

          <Button title="Submit" onPress={handleSubmit} />
        </View>
      ) : (
        <View>
          <Text>No metting for Know </Text>
          <Text>Wait client to connect you </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    width: 300,
    borderWidth: 1,
    borderColor: '#ddd',
    margin: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    color: '#333',
    fontSize: 16,
    textAlign: 'center',
  },
});
export default Home;
