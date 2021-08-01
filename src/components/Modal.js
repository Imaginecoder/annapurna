import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import {Dialog, Portal} from 'react-native-paper';
import {colors, fonts} from '../theme/theme';

const Moda = ({visible, toggleVisibility, selectRole}) => {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={toggleVisibility}>
        <Dialog.Title style={styles.title}>Choose Your Role</Dialog.Title>
        <Dialog.Content>
          <TouchableOpacity
            onPress={() => selectRole('Donor')}
            style={styles.btn}>
            <Text style={styles.text}>Donor</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => selectRole('Receiver')}
            style={styles.btn}>
            <Text style={styles.text}>Receiver</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => selectRole('Supporter')}
            style={styles.btn}>
            <Text style={styles.text}>Supporter</Text>
          </TouchableOpacity>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};
const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontFamily: fonts.primary,
    fontStyle: 'normal',
    fontWeight: '900',
    fontSize: 18,
    // line-height: 22px;
    /* identical to box height */

    // text-align: center;

    color: '#565454',
  },
  btn: {
    marginVertical: 10,

    alignSelf: 'center',
    width: '100%',
    backgroundColor: colors.surface,
    width: '100%',
    height: 48,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: fonts.subSecondary,
    fontSize: 18,
    textTransform: 'uppercase',
    fontWeight: 'normal',
    fontStyle: 'normal',
    // letterSpacing: 1.5,
    color: colors.txtPrimary,
  },
});
export default Moda;
