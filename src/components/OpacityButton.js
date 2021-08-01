import React from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';
import {colors, fonts} from '../theme/theme';

const OpacityButton = ({children, onPress, btnStyle, txtStyle}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.btn, btnStyle]}>
      <Text style={[styles.text, txtStyle]}>{children}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  btn: {
    backgroundColor: colors.surface,
    width: '80%',
    height: 48,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: fonts.subSecondary,
    fontSize: 16,
    textTransform: 'uppercase',
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 1.5,
    color: colors.txtPrimary,
  },
});
export default OpacityButton;
