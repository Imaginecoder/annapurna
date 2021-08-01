import React from 'react';
import {Pressable} from 'react-native';
const RippleColor = {color: 'rgba(0, 0, 0, .32)'};
const RippleButton = ({children, onPress, style, radius}) => {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{...RippleColor, radius: radius}}
      style={style}>
      {children}
    </Pressable>
  );
};

export default RippleButton;
