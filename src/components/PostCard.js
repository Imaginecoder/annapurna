import React, {useContext, useEffect, useState} from 'react';
import {Image} from 'react-native';
import {
  Container,
  Card,
  UserInfo,
  UserImg,
  UserName,
  UserInfoText,
  PostTime,
  PostText,
  PostImg,
  InteractionWrapper,
  Interaction,
  InteractionText,
  Divider,
} from '../styles/FeedStyles';

import {AuthContext} from '../navigation/AuthProvider';

import moment from 'moment';
import {TouchableOpacity} from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
// import auth from '@react-native-firebase/auth';

const PostCard = ({item, onPress}) => {
  const {user} = useContext(AuthContext);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    let mounted = true;

    const getUser = async () => {
      await firestore()
        .collection('users')
        .doc(item.userId)
        .get()
        .then(documentSnapshot => {
          if (documentSnapshot.exists) {
            // console.log('User Data', documentSnapshot.data());
            if (mounted) {
              setUserData(documentSnapshot.data());
            }
          } else {
            // console.log('does not exist');
          }
        });
    };
    getUser();
    return () => {
      mounted = false;
    };
  }, []);
  return (
    <Card onPress={() => onPress(userData.fname)}>
      <UserInfo>
        <UserImg
          source={{
            uri: userData
              ? userData.userImg ||
                'https://www.trackergps.com/canvas/images/icons/avatar.jpg'
              : 'https://www.trackergps.com/canvas/images/icons/avatar.jpg',
          }}
        />
        <UserInfoText>
          <TouchableOpacity>
            <UserName>{userData ? userData.fname : ''}</UserName>
          </TouchableOpacity>
          <PostTime>Added {moment(item.postTime.toDate()).fromNow()}</PostTime>
        </UserInfoText>
      </UserInfo>
      <PostText>{item.post.title}</PostText>
      {item.postImg != null ? (
        <Image
          style={{width: '100%', height: 250}}
          source={{uri: item.postImg}}
          resizeMode="cover"
        />
      ) : (
        <Divider />
      )}

      {/* <InteractionWrapper>
        <Interaction active={item.liked}>
          <Ionicons name={likeIcon} size={25} color={likeIconColor} />
          <InteractionText active={item.liked}>{likeText}</InteractionText>
        </Interaction>
        <Interaction>
          <Ionicons name="md-chatbubble-outline" size={25} />
          <InteractionText>{commentText}</InteractionText>
        </Interaction>
        {user.uid == item.userId ? (
          <Interaction onPress={() => onDelete(item.id)}>
            <Ionicons name="md-trash-bin" size={25} />
          </Interaction>
        ) : null}
      </InteractionWrapper> */}
    </Card>
  );
};

export default PostCard;
