import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import TextInput from '../components/TextInput';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import OpacityButton from '../components/OpacityButton';

const ViewPostScreen = ({navigation, route}) => {
  const {item, name} = route.params;
  const {post} = item;
  async function handleButtonPress() {
    let docRef = await firestore().collection('THREADS').doc(item.userId);
    await docRef.set({
      name,
      id: auth().currentUser.uid,
      latestMessage: {
        text: ``,
        createdAt: new Date().getTime(),
      },
    });
    // .then(docRef => {
    // console.log('docref', docRef);
    await docRef.collection('MESSAGES').add({
      text: ``,
      createdAt: new Date().getTime(),
      user: {
        _id: auth().currentUser.uid,
        // email: currentUser.email,
      },
      // system: true
    });

    navigation.navigate('Messages', {
      screen: 'Messages',
      params: {userName: item.name, thread: item},
    });

    // .catch(e => {

    //   console.log('failed', e);
    // });
  }
  // console.log('press', name);

  return (
    <View style={styles.container}>
      <Image
        style={styles.img}
        source={{uri: item.postImg}}
        resizeMode="cover"
      />
      <OpacityButton
        onPress={handleButtonPress}
        btnStyle={{alignSelf: 'center', marginBottom: 20, marginTop: 15}}>
        Message {name}
      </OpacityButton>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.leadText}>Basic Info</Text>
        <TextInput
          label="Title"
          returnKeyType="next"
          value={post.title}
          editable={false}
          style={styles.input}
        />
        <TextInput
          label="Category"
          returnKeyType="next"
          value={post.category}
          editable={false}
          style={styles.input}
        />
        <TextInput
          label="Ingredients"
          returnKeyType="next"
          value={post.ingredients}
          editable={false}
          style={styles.input}
        />
        <TextInput
          label="Quantity"
          returnKeyType="next"
          value={post.quantity}
          editable={false}
          style={styles.input}
        />
        <TextInput
          label="Other Info"
          returnKeyType="next"
          value={post.otherInfo}
          editable={false}
          style={styles.input}
        />

        <Text style={styles.leadText}>Pick Up Info</Text>
        <TextInput
          label="Country"
          returnKeyType="next"
          value={post.country}
          editable={false}
          style={styles.input}
        />
        <TextInput
          label="State"
          returnKeyType="next"
          value={post.state}
          editable={false}
          style={styles.input}
        />
        <TextInput
          label="House Address"
          returnKeyType="next"
          value={post.address}
          editable={false}
          style={styles.input}
        />
        <TextInput
          label="Pick Up Time $ Date"
          returnKeyType="next"
          value={post.pickUpTime}
          editable={false}
          multiline
          style={styles.input}
        />
        <TextInput
          label="Contact Number"
          returnKeyType="next"
          value={post.contactNumber}
          editable={false}
          style={styles.input}
        />
      </KeyboardAwareScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  img: {
    width: '100%',
    height: 200,
    marginTop: 20,
  },
  input: {
    fontSize: 20,
  },
  leadText: {
    fontFamily: 'Montserrat',
    fontSize: 18,

    marginTop: 20,
    // marginBottom: 10,
  },
});
export default ViewPostScreen;
