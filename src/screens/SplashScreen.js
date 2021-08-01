import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import Logo from '../components/Logo';

import {colors, fonts} from '../theme/theme';
const SplashScreen = ({navigation}) => {
  return (
    <ImageBackground
      source={require('../images/hands.png')}
      resizeMode="cover"
      style={styles.image}>
      <View style={styles.splash}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="rgba(42, 214, 113, 0)"
          translucent
        />

        <Logo />
        <TouchableOpacity
          style={styles.btnWrapper}
          onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.btnText}>Get Started</Text>
        </TouchableOpacity>
        <View style={styles.bottomLine}></View>
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  splash: {
    flex: 1,
    backgroundColor: 'rgba(42, 214, 113, .8)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  btnWrapper: {
    position: 'absolute',
    bottom: '12%',
    width: '80%',
    height: 48,
    backgroundColor: '#9DF673',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontFamily: fonts.subSecondary,
    fontSize: 18,
    fontWeight: 'normal',
    fontStyle: 'normal',
    // letterSpacing: 1.5,
    color: '#030303',
  },
  bottomLine: {
    position: 'absolute',
    bottom: '5%',
    width: '50%',
    height: 3,
    backgroundColor: 'white',
    borderRadius: 40,
  },
  image: {
    flex: 1,
    width: '100%',
  },
});
export default SplashScreen;
