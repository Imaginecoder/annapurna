import React from 'react';
import {View, StyleSheet, Text} from 'react-native';


import {TextInput as Input} from 'react-native-paper';
import {colors, fonts} from '../theme/theme';

const TextInput = React.forwardRef((prop, ref) => {
  const {errorText, description, wrapper, ...props} = prop;
  return (
    <View style={[styles.container, wrapper]}>
      <Input
        ref={ref}
        style={styles.input}
        selectionColor={colors.primary}
        underlineColor="transparent"
        mode="outlined"
        {...props}
      />
      {description && !errorText ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 10,
  },
  input: {
    backgroundColor: colors.bg,
  },
  description: {
    fontSize: 13,
    color: colors.secondary,
    paddingTop: 8,
  },
  error: {
    fontSize: 13,
    color: colors.error,
    paddingTop: 8,
  },
});
export default TextInput;
