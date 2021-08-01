import React, {useReducer, useMemo, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StyleSheet, ActivityIndicator, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import auth from '@react-native-firebase/auth';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  SIGN_OUT,
  SIGN_IN,
  SIGN_UP,
  authReducer,
  initialAuthState,
  RETRIEVE_TOKEN,
} from './src/store/authReducer';
import {
  SplashScreen,
  SignInScreen,
  SignUpScreen,
  ResetPasswordScreen,
  HomeScreen,
  ProfileScreen,
  ForumScreen,
} from './src/screens';
import {AuthContext} from './src/store/context';
import {colors} from './src/theme/theme';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const App = () => {
  const [authState, dispatch] = useReducer(authReducer, initialAuthState);

  // useEffect(async () => {
  //   // let userToken;
  //   // userToken = null;
  //   try {
  //     let userToken = await AsyncStorage.getItem('userToken');
  //     dispatch({type: RETRIEVE_TOKEN, token: userToken});
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }, []);
  const authValue = useMemo(
    () => ({
      signIn: async (email, password) => {
        // console.log('founduser', foundUser);
        // const userToken = String(foundUser[0].userToken);
        // const email = foundUser[0].email;
        // const name = foundUser[0].name;
        console.log('usertoken', userToken);

        try {
          await AsyncStorage.setItem('userToken', userToken);
        } catch (e) {
          console.log(e);
        }
        // dispatch({type: SIGN_IN, userName: name, userToken});
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem('userToken');
        } catch (e) {
          console.log(e);
        }
        dispatch({type: SIGN_OUT});
      },
      signUp: async foundUser => {
        // setUserToken('fgkj');
        // setIsLoading(false);
        const userToken = foundUser[0].userToken;
        const userName = foundUser[0].name;

        try {
          await AsyncStorage.setItem('userToken', userToken);
        } catch (e) {
          console.log(e);
        }
        dispatch({type: SIGN_UP, userName, userToken});
      },
    }),
    [],
  );
  console.log(authState.isLoading);
  if (authState.isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.surface} />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authValue}>
      <NavigationContainer>
        {authState.userToken == null ? (
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Splash"
              component={SplashScreen}
              options={{
                header: () => null,
              }}
            />
            <Stack.Screen
              name="SignIn"
              component={SignInScreen}
              options={{
                header: () => null,
              }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUpScreen}
              options={{title: ''}}
            />
            <Stack.Screen
              name="ResetPassword"
              component={ResetPasswordScreen}
              options={{title: 'Sign In'}}
            />
          </Stack.Navigator>
        ) : (
          <Tab.Navigator>
            <Tab.Screen
              name="Home"
              component={HomeScreen}
              options={{
                tabBarLabel: 'Home',
                // tabBarColor: '#d02860',
                tabBarIcon: ({color}) => (
                  <Icon name="home" color={color} size={26} />
                ),
              }}
            />
            <Tab.Screen
              name="Profile"
              component={ProfileScreen}
              options={{
                tabBarLabel: 'Profile',
                // tabBarColor: '#d02860',
                tabBarIcon: ({color}) => (
                  <Icon name="home" color={color} size={30} />
                ),
              }}
            />
          </Tab.Navigator>
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'blue',
  },
  center: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default App;
