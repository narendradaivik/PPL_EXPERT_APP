import React from 'react';
import {Image, View} from 'react-native';

const SplashScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Image
        source={require('../assets/logoo.png')}
        style={{
          width: '50%',
          height: '50%',
          resizeMode: 'contain',
        }}
      />
    </View>
  );
};

export default SplashScreen;
