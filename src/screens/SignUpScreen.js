import React, {useState, useRef, useContext} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Modal,
} from 'react-native';
import {Text} from 'react-native-paper';
import Moda from '../components/Modal';
import {Checkbox} from 'react-native-paper';

import Background from '../components/Background';
import OpacityButton from '../components/OpacityButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {TextInput as Input} from 'react-native-paper';
import {AuthContext} from '../navigation/AuthProvider';

import TextInput from '../components/TextInput';
import {colors, fonts} from '../theme/theme';
import {
  emailValidator,
  passWordValidator,
  nameValidator,
  phoneValidator,
  roleValidator,
  locationValidator,
} from '../utils/authHelpers';

export default function SignUpScreen({navigation}) {
  const [data, setData] = useState({
    fname: '',
    lname: '',

    phoneNumber: '',
    role: '',
    phoneError: '',
    email: '',
    passWord: '',
    emailError: '',
    passWordError: '',
    roleError: '',
    lnameError: '',

    fnameError: '',
    countryError: '',
    stateError: '',
    cityError: '',
    city: '',
    state: '',
    country: '',

    secureTextEntry: true,
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [checked, setChecked] = useState(false);
  const {signUp} = useContext(AuthContext);

  const roleInputRef = React.createRef();
  const toggleVisibility = () => setVisible(s => !s);
  const selectRole = selection => {
    setData(d => {
      return {...d, role: selection};
    });
    setVisible(false);
    roleInputRef.current.blur();
  };

  const onSignUpPressed = () => {
    const fname_Error = nameValidator(data.fname);

    const lname_Error = nameValidator(data.lname);
    const email_Error = emailValidator(data.email);
    const passWord_Error = passWordValidator(data.passWord);
    const phone_Error = phoneValidator(data.phoneNumber);
    const role_Error = roleValidator(data.role);
    const country_Error = locationValidator(data.country);
    const state_Error = locationValidator(data.state);
    const city_Error = locationValidator(data.city);

    if (
      email_Error ||
      passWord_Error ||
      fname_Error ||
      lname_Error ||
      phone_Error ||
      country_Error ||
      state_Error ||
      city_Error ||
      role_Error
    ) {
      setData({
        ...data,
        emailError: email_Error,
        passWordError: passWord_Error,
        fnameError: fname_Error,
        lnameError: lname_Error,
        countryError: country_Error,
        stateError: state_Error,
        cityError: city_Error,

        phoneError: phone_Error,
        roleError: role_Error,
      });
      return;
    } else {
      const {
        email,
        passWord,
        fname,
        lname,
        role,
        phoneNumber,
        country,
        state,
        city,
      } = data;
      signUp(
        email,
        passWord,
        fname,
        lname,
        role,
        phoneNumber,
        country,
        state,
        city,
      );
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.bg} />
      <Moda
        visible={visible}
        toggleVisibility={toggleVisibility}
        selectRole={selectRole}
      />
      <KeyboardAwareScrollView>
        <View style={styles.header}>
          <Text style={styles.signUp}>Sign Up</Text>
          <Text style={styles.greet}>Nice to meet you</Text>
        </View>
        <Background style={styles.inputContainer}>
          <View style={styles.name}>
            <TextInput
              label="Your First Name"
              returnKeyType="next"
              value={data.fname}
              onChangeText={text =>
                setData(d => {
                  return {...d, fname: text, fnameError: ''};
                })
              }
              error={!!data.fnameError}
              errorText={data.fnameError}
              wrapper={{width: '49%'}}
              multiline
            />
            <TextInput
              label="Your Last Name"
              returnKeyType="next"
              value={data.lname}
              onChangeText={text =>
                setData(d => {
                  return {...d, lname: text, lnameError: ''};
                })
              }
              error={!!data.lnameError}
              errorText={data.lnameError}
              wrapper={{width: '49%'}}
              multiline
            />
          </View>

          <TextInput
            label="Your Email"
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
            label="Mobile Number"
            returnKeyType="next"
            value={data.phoneNumber}
            onChangeText={text =>
              setData(d => {
                return {...d, phoneNumber: text, phoneError: ''};
              })
            }
            error={!!data.phoneError}
            errorText={data.phoneError}
            autoCapitalize="none"
            autoCompleteType="tel"
            textContentType="telephoneNumber"
            keyboardType="phone-pad"
          />
          <View style={styles.location}>
            <TextInput
              label="Country"
              returnKeyType="next"
              value={data.country}
              onChangeText={text =>
                setData(d => {
                  return {...d, country: text, countryError: ''};
                })
              }
              error={!!data.countryError}
              errorText={data.countryError}
              wrapper={{width: '33%'}}
              multiline
            />
            <TextInput
              label="State"
              returnKeyType="next"
              value={data.state}
              onChangeText={text =>
                setData(d => {
                  return {...d, state: text, stateError: ''};
                })
              }
              error={!!data.stateError}
              errorText={data.stateError}
              wrapper={{width: '33%'}}
              multiline
            />
            <TextInput
              label="City"
              returnKeyType="next"
              value={data.city}
              onChangeText={text =>
                setData(d => {
                  return {...d, city: text, cityError: ''};
                })
              }
              error={!!data.cityError}
              errorText={data.cityError}
              wrapper={{width: '33%'}}
              multiline
            />
          </View>
          <TouchableOpacity onPress={toggleVisibility} style={{width: '100%'}}>
            <TextInput
              label="Choose Your Role"
              ref={roleInputRef}
              returnKeyType="next"
              value={data.role}
              // onFocus={toggleVisibility}
              editable={false}
              onPressIn={toggleVisibility}
              caretHidden
              error={!!data.roleError}
              errorText={data.roleError}
              right={
                <Input.Icon
                  forceTextInputFocus={false}
                  color="#000"
                  name="arrow-down-drop-circle-outline"
                  onPress={toggleVisibility}
                />
              }
            />
          </TouchableOpacity>
          <TextInput
            label="password"
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
                color="#000"
                name="eye"
                onPress={() =>
                  setData(d => {
                    return {...d, secureTextEntry: !d.secureTextEntry};
                  })
                }
              />
            }
          />
          <View style={styles.acknoledge}>
            <Checkbox
              status={checked ? 'checked' : 'unchecked'}
              onPress={() => {
                setChecked(!checked);
              }}
            />
            <Text style={styles.acknoledgeTxt}>
              I acknowledge that I have read and agree to the{' '}
              <Text
                style={styles.privacyTxt}
                onPress={() => setModalVisible(true)}>
                Terms and Conditions and Privacy Policy.
              </Text>
            </Text>
          </View>
          <OpacityButton onPress={onSignUpPressed} btnStyle={styles.btn}>
            Create Account
          </OpacityButton>
          <View style={styles.row}>
            <Text>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.replace('SignIn')}>
              <Text style={styles.link}>SignIn</Text>
            </TouchableOpacity>
          </View>
          <Modal
            animationType="slide"
            // transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <ScrollView contentContainerStyle={styles.centeredView}>
              <Text
                style={{
                  fontFamily: fonts.primary,
                  lineHeight: 30,
                  marginBottom: 30,
                }}>
                Before using the service you are advised to read all the terms
                of use carefully. By clicking on the I Agree you authorizes us
                to register you as a Registered User and you shall comply with
                all the terms and conditions mentioned herein. Annapurna shall
                not be liable for any defects in food. A user should be 18 year
                and above.The user registers themselves from the App by
                providing the following details: 1. Name 2. Address 3. Email 4.
                Contact details 3. You can contact us for any query regarding
                this Platform. For query related to the App, please contact:
                99999999
              </Text>
              <OpacityButton onPress={() => setModalVisible(false)}>
                I Agree
              </OpacityButton>
            </ScrollView>
          </Modal>
        </Background>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  name: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  location: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  header: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  signUp: {
    fontFamily: ' Montserrat',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 36,
    lineHeight: 48,
    /* identical to box height, or 133% */

    textAlign: 'center',
    letterSpacing: 2.25,
    textTransform: 'uppercase',

    color: '#333333',
  },
  greet: {
    fontFamily: ' Montserrat',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 14,
    lineHeight: 24,
    /* identical to box height, or 133% */

    textAlign: 'center',
    letterSpacing: 2.25,

    color: '#333333',
  },
  inputContainer: {
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  btn: {
    marginVertical: 10,
  },
  link: {
    fontWeight: 'bold',
    color: colors.surface,
  },
  acknoledge: {
    flexDirection: 'row',
  },
  acknoledgeTxt: {
    fontFamily: 'Montserrat',

    fontWeight: '600',
    fontSize: 12,
    lineHeight: 24,
    /* or 240% */

    textTransform: 'capitalize',

    // color: '#9E9E9E',
  },
  privacyTxt: {
    color: colors.surface,
    // lineHeight: 50,
  },
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
});
