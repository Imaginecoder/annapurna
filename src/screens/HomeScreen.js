import React, {useEffect, useState, useContext} from 'react';
import {View, Text, StyleSheet, FlatList, Alert, StatusBar} from 'react-native';

import {colors, fonts} from '../theme/theme';

import PostCard from '../components/PostCard';
import {AuthContext} from '../navigation/AuthProvider';
import auth from '@react-native-firebase/auth';

import firestore from '@react-native-firebase/firestore';

import {Container} from '../styles/FeedStyles';

// const Posts = [
//   {
//     id: '1',
//     userName: 'Jenny Doe',
//     userImg: 'https://unsplash.com/photos/_RBcxo9AU-U',
//     postTime: '4 mins ago',
//     post:
//       'Hey there, this is my test for a post of my social app in React Native.',
//     postImg: 'https://unsplash.com/photos/_RBcxo9AU-U',
//     liked: true,
//     likes: '14',
//     comments: '5',
//   },
//   {
//     id: '2',
//     userName: 'John Doe',
//     userImg: 'https://unsplash.com/photos/_RBcxo9AU-U',

//     postTime: '2 hours ago',
//     post:
//       'Hey there, this is my test for a post of my social app in React Native.',
//     postImg: 'none',
//     liked: false,
//     likes: '8',
//     comments: '0',
//   },
//   {
//     id: '3',
//     userName: 'Ken William',
//     userImg: 'https://unsplash.com/photos/_RBcxo9AU-U',

//     postTime: '1 hours ago',
//     post:
//       'Hey there, this is my test for a post of my social app in React Native.',
//     postImg: 'https://unsplash.com/photos/_RBcxo9AU-U',
//     liked: true,
//     likes: '1',
//     comments: '0',
//   },
//   {
//     id: '4',
//     userName: 'Selina Paul',
//     userImg: 'https://unsplash.com/photos/_RBcxo9AU-U',

//     postTime: '1 day ago',
//     post:
//       'Hey there, this is my test for a post of my social app in React Native.',
//     postImg: 'https://unsplash.com/photos/_RBcxo9AU-U',

//     liked: true,
//     likes: '22',
//     comments: '4',
//   },
//   {
//     id: '5',
//     userName: 'Christy Alex',
//     userImg: 'https://unsplash.com/photos/_RBcxo9AU-U',

//     postTime: '2 days ago',
//     post:
//       'Hey there, this is my test for a post of my social app in React Native.',
//     postImg: 'none',
//     liked: false,
//     likes: '0',
//     comments: '0',
//   },
// ];

const HomeScreen = ({navigation}) => {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(false);

  // const {signOut} = useContext(AuthContext);

  // useEffect(() => {
  //   fetch(
  //     'https://annapurnajygyz2021-07-13-dev.eu-gb.cf.appdomain.cloud/annapurna/actortype',
  //   )
  //     .then(response => response.json())
  //     .then(json => console.log(json))
  //     .catch(error => console.error(error))
  //     .finally(() => setLoading(false));
  // }, []);

  const fetchPosts = async () => {
    // console.log('uid', auth().currentUser.uid);
    try {
      const list = [];
      await firestore()
        .collection('posts')
        // .where('userId', '==', auth().currentUser.uid)
        .orderBy('postTime', 'desc')
        .get()
        .then(querySnapshot => {
          // console.log('Total Posts: ', querySnapshot.size);
          querySnapshot.forEach(doc => {
            const {userId, post, postImg, postTime} = doc.data();
            list.push({
              id: doc.id,
              userId,

              postTime: postTime,
              post,
              postImg,
            });
          });
        });
      setPosts(list);
      if (loading) {
        setLoading(false);
      }
      // console.log('Posts: ', posts);
    } catch (e) {
      // console.log(e);
    }
  };

  useEffect(() => {
    fetchPosts();
    // const user = auth().currentUser;

    // user
    //   .updateProfile({
    //     displayName: 'Frank',
    //     // photoURL: "https://example.com/jane-q-user/profile.jpg"
    //   })
    //   .then(() => {
    //     // Update successful
    //     // ...
    //     console.log('update succes');
    //   })
    //   .catch(error => {
    //     // An error occurred
    //     // ...
    //   });
  }, []);

  const handleDelete = postId => {
    Alert.alert(
      'Delete post',
      'Are you sure?',
      [
        {
          text: 'Cancel',
          // onPress: () => console.log('Cancel Pressed!'),
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => deletePost(postId),
        },
      ],
      {cancelable: false},
    );
  };

  const deletePost = postId => {
    // console.log('Current Post Id: ', postId);
    // firestore()
    //   .collection('posts')
    //   .doc(postId)
    //   .get()
    //   .then((documentSnapshot) => {
    //     if (documentSnapshot.exists) {
    //       const {postImg} = documentSnapshot.data();
    //       if (postImg != null) {
    //         const storageRef = storage().refFromURL(postImg);
    //         const imageRef = storage().ref(storageRef.fullPath);
    //         imageRef
    //           .delete()
    //           .then(() => {
    //             console.log(`${postImg} has been deleted successfully.`);
    //             deleteFirestoreData(postId);
    //           })
    //           .catch((e) => {
    //             console.log('Error while deleting the image. ', e);
    //           });
    //         // If the post image is not available
    //       } else {
    //         deleteFirestoreData(postId);
    //       }
    //     }
    //   });
  };

  const deleteFirestoreData = postId => {
    // firestore()
    //   .collection('posts')
    //   .doc(postId)
    //   .delete()
    //   .then(() => {
    //     Alert.alert(
    //       'Post deleted!',
    //       'Your post has been deleted successfully!',
    //     );
    //     setDeleted(true);
    //   })
    //   .catch((e) => console.log('Error deleting posst.', e));
  };

  const ListHeader = () => {
    return null;
  };
  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      {/* <Button title="signout" onPress={signOut} /> */}
      {loading ? (
        <View
          style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
          contentContainerStyle={{alignItems: 'center'}}>
          <Text>loading</Text>
        </View>
      ) : (
        <Container>
          <View style={styles.greet}>
            <Text style={styles.greetTxt}>
              Hello {auth().currentUser.displayName}
            </Text>
            <Text style={styles.greetSubTxt}>See What People are Sharing</Text>
          </View>
          <FlatList
            data={posts}
            renderItem={({item}) => {
              let id = item.userId;
              return (
                <>
                  {id !== auth().currentUser.uid ? (
                    <PostCard
                      item={item}
                      onPress={name => {
                        navigation.navigate('ViewPost', {item: item, name});
                      }}
                    />
                  ) : null}
                </>
              );
            }}
            keyExtractor={item => item.id}
            ListHeaderComponent={ListHeader}
            ListFooterComponent={ListHeader}
            showsVerticalScrollIndicator={false}
          />
        </Container>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  greet: {
    marginTop: 10,
    marginBottom: 30,
  },
  greetTxt: {
    fontSize: 30,
    fontFamily: fonts.primary,
    marginBottom: 20,

    // lineHeight: 35,
  },
  greetSubTxt: {
    fontSize: 20,
    fontFamily: fonts.primary,
  },
});
export default HomeScreen;
