import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {colors, fonts} from '../theme/theme';

const Logo = () => {
  return (
    <View style={styles.logoWrapper}>
      <Image
        source={require('../images/hungerSplash.png')}
        style={styles.img}
      />
      <View style={styles.textWrapper}>
        <Text style={styles.leadText}>ANNAPURNA</Text>
        <Text style={styles.subText}>Sharing Is Caring</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  logoWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    // width: '80%',
    // backgroundColor: 'blue',
  },
  img: {
    width: 80,
    height: 80,
  },
  textWrapper: {
    // width: '80%',
    // backgroundColor: 'blue',
  },
  leadText: {
    fontSize: 48,
    // lineHeight: 60,

    letterSpacing: -0.02,
    textTransform: 'uppercase',

    textShadowOffset: {
      width: 0,
      height: 4,
    },
    textShadowRadius: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    fontFamily: fonts.secondary,
    fontWeight: 'normal',
    fontStyle: 'normal',
    color: colors.splashLead,
  },

  // leadAlphaText: {
  //   fontSize: 48,
  //   lineHeight: 0,

  //   letterSpacing: -0.02,
  //   textTransform: 'uppercase',
  //   textShadowOffset: {
  //     width: 0,
  //     height: 4,
  //   },
  //   textShadowRadius: 4,
  //   textShadowColor: 'rgba(0, 0, 0, 0.25)',
  //   fontFamily: fonts.secondary,
  //   fontWeight: 'normal',
  //   color: colors.splashLead,
  // },
  subText: {
    fontFamily: fonts.subPrimary,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 18,
    // lineHeight: 24,

    textAlign: 'right',
    letterSpacing: -0.02,
    color: '#FFFFFF',
  },
});
export default Logo;
