import React, {useState, useContext} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  StatusBar,
  Text,
  ScrollView,
} from 'react-native';
// import {Text} from 'react-native-paper';
import {TextInput as Input} from 'react-native-paper';

import Background from '../components/Background';
import OpacityButton from '../components/OpacityButton';
import Logo from '../components/Logo';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

// import Button from '../components/Button';
import TextInput from '../components/TextInput';

import {colors, fonts} from '../theme/theme';
import {emailValidator, passWordValidator} from '../utils/authHelpers';
import {AuthContext} from '../navigation/AuthProvider';

// import {AuthContext} from '../store/context';

export default function SignInScreen({navigation}) {
  const [data, setData] = useState({
    email: '',
    passWord: '',
    emailError: '',
    passWordError: '',
    secureTextEntry: true,
  });
  const {signIn} = useContext(AuthContext);
  const onSignInPressed = () => {
    const email_Error = emailValidator(data.email);
    const passWord_Error = passWordValidator(data.passWord);
    if (email_Error || passWord_Error) {
      setData({
        ...data,
        emailError: email_Error,
        passWordError: passWord_Error,
      });
      return;
    } else {
      signIn(data.email, data.passWord);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.surface}
        // hidden
        // translucent
      />
      <View style={styles.header}>
        <Logo />
      </View>
      <KeyboardAwareScrollView contentContainerStyle={styles.inputcontainer}>
        {/* <ScrollView> */}
        <View style={styles.greet}>
          <Text style={styles.greetTxt}>Good to see you again</Text>
        </View>
        <Background>
          <TextInput
            label="Email"
            returnKeyType="next"
            value={data.email}
            onChangeText={text =>
              setData(d => {
                return {...d, email: text, emailError: ''};
              })
            }
            error={!!data.emailError}
            errorText={data.emailError}
            autoCapitalize="none"
            autoCompleteType="email"
            textContentType="emailAddress"
            keyboardType="email-address"
          />
          <TextInput
            label="passWord"
            returnKeyType="done"
            value={data.passWord}
            onChangeText={text =>
              setData(d => {
                return {...d, passWord: text, passWordError: ''};
              })
            }
            error={!!data.passWordError}
            errorText={data.passWordError}
            secureTextEntry={data.secureTextEntry}
            right={
              <Input.Icon
                forceTextInputFocus={false}
                name="eye"
                onPress={() =>
                  setData(d => {
                    return {...d, secureTextEntry: !d.secureTextEntry};
                  })
                }
              />
            }
          />

          <OpacityButton btnStyle={{marginTop: 10}} onPress={onSignInPressed}>
            Sign In
          </OpacityButton>
          <View style={styles.forgotpassWord}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ResetpassWord')}>
              <Text style={styles.forgot}>Forgot your passWord?</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <Text>Don’t have an account? </Text>
            <TouchableOpacity onPress={() => navigation.replace('SignUp')}>
              <Text style={styles.link}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </Background>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //
    backgroundColor: 'white',
    height: '100%',
  },
  inputcontainer: {
    width: '100%',
    backgroundColor: 'white',
  },
  forgotpassWord: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 20,
  },
  row: {
    flexDirection: 'row',
    // marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: colors.surface,
  },
  header: {
    height: '40%',
    width: '100%',
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },

  greet: {
    width: '100%',
    marginVertical: 10,

    justifyContent: 'center',
    alignItems: 'center',
  },
  greetTxt: {
    fontFamily: fonts.primary,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 14,
    lineHeight: 24,
    backgroundColor: 'white',
  },
});
