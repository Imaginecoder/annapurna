import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        signIn: async (email, password) => {
          try {
            await auth().signInWithEmailAndPassword(email, password);
            // console.log('login');
          } catch (e) {
            // console.log('login', e);
          }
        },

        signUp: async (
          email,
          password,
          fname,
          lname,
          role,
          phoneNumber,
          country,
          state,
          city,
        ) => {
          auth()
            .createUserWithEmailAndPassword(email, password)
            .then(result => {
              // console.log('signup', result);
              //Once the user creation has happened successfully, we can add the currentUser into firestore
              //with the appropriate details.
              let storeUser = async () => {
                try {
                  await firestore()
                    .collection('users')
                    .doc(auth().currentUser.uid)
                    .set({
                      fname: fname,
                      lname: lname,
                      role,
                      phoneNumber,
                      email,
                      createdAt: firestore.Timestamp.fromDate(new Date()),
                      userImg:
                        'https://www.trackergps.com/canvas/images/icons/avatar.jpg',
                      country,
                      state,
                      city,
                    });
                } catch (e) {
                  // console.log(
                  //   'Something went wrong with added user to firestore: ',
                  //   e,
                  // );
                }
              };
              storeUser();
              auth().currentUser.updateProfile({
                displayName: fname,
              });
            })
            //we need to catch the whole sign up process if it fails too.
            .catch(error => {
              // console.log('Something went wrong with sign up: ', error);
            });
        },
        signOut: async () => {
          try {
            await auth().signOut();
          } catch (e) {
            // console.log('sign out', e);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
