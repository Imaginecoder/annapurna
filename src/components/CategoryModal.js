import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import {Dialog, Portal} from 'react-native-paper';
import {colors, fonts} from '../theme/theme';

const CategoryModal = ({visible, toggleVisibility, selectCategory}) => {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={toggleVisibility}>
        <Dialog.Title style={styles.title}>Select Category</Dialog.Title>
        <Dialog.Content>
          <TouchableOpacity
            onPress={() => selectCategory('Dry Grains')}
            style={styles.btn}>
            <Text style={styles.text}>Dry Grains</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => selectCategory('Vegetables')}
            style={styles.btn}>
            <Text style={styles.text}>Vegetables</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => selectCategory('Fruits')}
            style={styles.btn}>
            <Text style={styles.text}>Fruits</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => selectCategory('Cooked Food')}
            style={styles.btn}>
            <Text style={styles.text}>Cooked Food</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => selectCategory('Liquids/Drinks')}
            style={styles.btn}>
            <Text style={styles.text}>Liquids/Drinks</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => selectCategory('Others')}
            style={styles.btn}>
            <Text style={styles.text}>Others</Text>
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
export default CategoryModal;
