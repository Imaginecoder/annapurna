import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  KeyboardAvoidingView,
  View,
} from 'react-native';
import {colors, fonts} from '../theme/theme';

export default function Background({children, style}) {
  return <View style={[styles.container, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    // paddingBottom: 50,

    width: '100%',
    // maxWidth: 340,
    // alignSelf: 'center',
    // backgroundColor: 'blue',

    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: colors.bg,
  },
});
