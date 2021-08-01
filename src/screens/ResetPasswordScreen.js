import React, {useState} from 'react';
import Background from '../components/Background';
import OpacityButton from '../components/OpacityButton';
import {View, StatusBar, StyleSheet, Text} from 'react-native';

import TextInput from '../components/TextInput';
import {colors, fonts} from '../theme/theme';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {emailValidator, passwordValidator} from '../utils/authHelpers';

export default function ResetPasswordScreen({navigation}) {
  const [email, setEmail] = useState({value: '', error: ''});

  const sendResetPasswordEmail = () => {
    const emailError = emailValidator(email.value);
    if (emailError) {
      setEmail({...email, error: emailError});
      return;
    }
    navigation.navigate('Splash');
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="white"
        // hidden
        // translucent
      />
      <View style={styles.header}>
        <Text style={styles.headerTxt}>Forgot Password</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.infoTxt}>
          Using this feature will be resetting your current password. Make sure
          entered email is related to your Annapurna account.
        </Text>
      </View>

      <Background>
        <TextInput
          label="Your Email"
          returnKeyType="done"
          value={email.value}
          onChangeText={text => setEmail({value: text, error: ''})}
          error={!!email.error}
          errorText={email.error}
          autoCapitalize="none"
          autoCompleteType="email"
          textContentType="emailAddress"
          keyboardType="email-address"
          // description="Your Email."
        />

        <OpacityButton onPress={sendResetPasswordEmail} btnStyle={styles.btn}>
          Reset My Password
        </OpacityButton>
      </Background>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  header: {},
  headerTxt: {
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 28,
    lineHeight: 41,
    /* identical to box height, or 146% */

    letterSpacing: 0.337647,

    color: '#565454',
    margin: 16,
  },
  info: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoTxt: {
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 12,
    lineHeight: 26,
    paddingHorizontal: 32,
    /* identical to box height, or 146% */

    letterSpacing: 0.34,

    color: '#656363',
    textAlign: 'center',
    marginTop: 79,
    marginBottom: 32,
  },
  btn: {
    marginTop: 25,
  },
});
