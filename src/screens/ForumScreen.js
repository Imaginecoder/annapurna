import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const ForumScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Forum</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default ForumScreen;
