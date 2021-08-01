import React, {useState, useEffect} from 'react';
import {View, Text, Button, StyleSheet, FlatList} from 'react-native';
import {
  Container,
  Card,
  UserInfo,
  UserImgWrapper,
  UserImg,
  UserInfoText,
  UserName,
  PostTime,
  MessageText,
  TextSection,
} from '../styles/MessageStyles';
import Loading from '../components/Loading';
import auth from '@react-native-firebase/auth';

import firestore from '@react-native-firebase/firestore';
import {colors, fonts} from '../theme/theme';

const Messages = [
  {
    id: '1',
    userName: 'Frank Devin',
    userImg: require('../images/hungerSplash.png'),
    messageTime: '4 mins ago',
    messageText: 'Hey there, this is my test for a post of Annapurna app.',
  },
  {
    id: '2',
    userName: 'Shalom Ihaza',
    userImg: require('../images/hungerSplash.png'),
    messageTime: '2 hours ago',
    messageText: 'Hey there, this is my test for a post of Annapurna app.',
  },
  {
    id: '3',
    userName: 'Ken William',
    userImg: require('../images/hungerSplash.png'),
    messageTime: '1 hours ago',
    messageText: 'Hey there, this is my test for a post of Annapurna app.',
  },
  {
    id: '4',
    userName: 'Selina Paul',
    userImg: require('../images/hungerSplash.png'),
    messageTime: '1 day ago',
    messageText: 'Hey there, this is my test for a post of Annapurna app.',
  },
  {
    id: '5',
    userName: 'Christy Alex',
    userImg: require('../images/hungerSplash.png'),
    messageTime: '2 days ago',
    messageText: 'Hey there, this is my test for a post of Annapurna app.',
  },
];

const MessagesScreen = ({navigation}) => {
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);

  /**
   * Fetch threads from Firestore
   */
  useEffect(() => {
    const unsubscribe = firestore()
      .collection('THREADS')
      .orderBy('latestMessage.createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const threads = querySnapshot.docs.map(documentSnapshot => {
          return {
            _id: documentSnapshot.id,
            // give defaults
            name: documentSnapshot.name,

            latestMessage: {
              text: '',
            },
            ...documentSnapshot.data(),
          };
        });
        const filtered = threads.filter(
          doc => auth().currentUser.uid == doc.id,
        );
        setThreads(filtered);

        if (loading) {
          setLoading(false);
        }
      });

    /**
     * unsubscribe listener
     */
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      {threads.length > 0 ? (
        <Container>
          <FlatList
            // data={Messages}
            data={threads}
            // keyExtractor={item => item.id}
            keyExtractor={item => item._id}
            renderItem={({item}) => (
              <Card
                onPress={() =>
                  navigation.navigate('Chat', {
                    userName: item.name,
                    thread: item,
                  })
                }>
                <UserInfo>
                  <UserImgWrapper>
                    <UserImg
                      source={{
                        uri:
                          'https://www.trackergps.com/canvas/images/icons/avatar.jpg',
                      }}
                    />
                  </UserImgWrapper>
                  <TextSection>
                    <UserInfoText>
                      <UserName>{item.name}</UserName>
                      {/* <PostTime>{item.messageTime}</PostTime> */}
                    </UserInfoText>
                    {/* <MessageText>{item.messageText}</MessageText> */}
                  </TextSection>
                </UserInfo>
              </Card>
            )}
          />
        </Container>
      ) : (
        <View style={styles.container}>
          <Text style={styles.txt}>You Have No Messages</Text>
        </View>
      )}
    </>
  );
};

export default MessagesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    fontFamily: fonts.primary,
    fontSize: 15,
  },
});
