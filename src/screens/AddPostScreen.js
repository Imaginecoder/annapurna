import React, {useState, useContext} from 'react';
import DatePicker from 'react-native-date-picker';
import {
  View,
  Text,
  Platform,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import TextInput from '../components/TextInput';
import CategoryModal from '../components/CategoryModal';
import {Button, Dialog, Portal} from 'react-native-paper';
import OpacityButton from '../components/OpacityButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {TextInput as Input} from 'react-native-paper';

import {colors, fonts} from '../theme/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';

import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {
  checkStoragePermissions,
  getStoragePermissions,
  checkCameraPermission,
  getCameraPermission,
} from '../utils/permissions';

import {
  InputField,
  InputWrapper,
  AddImage,
  SubmitBtn,
  SubmitBtnText,
  StatusWrapper,
} from '../styles/AddPost';

import {AuthContext} from '../navigation/AuthProvider';
const initialPost = {
  category: '',
  ingredients: '',
  quantity: '',
  otherInfo: '',
  country: '',
  state: '',
  title: '',
  address: '',
  contactNumber: '',
  pickUpTime: '',
};
const AddPostScreen = () => {
  const {user} = useContext(AuthContext);

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [post, setPost] = useState({
    category: '',
    ingredients: '',
    quantity: '',
    otherInfo: '',
    country: '',
    state: '',
    title: '',
    address: '',
    contactNumber: '',
    pickUpTime: '',
  });
  const [visible, setVisible] = useState(false);
  const [pickerVisible, setPickerVisible] = useState(false);

  const [date, setDate] = useState(new Date());

  const toggleVisibility = () => setVisible(s => !s);
  const togglePicker = () => {
    setPickerVisible(s => !s);
    if (pickerVisible) {
      setPost(d => {
        let time = date.toString();
        return {...d, pickUpTime: time};
      });
    }
  };
  const selectCategory = selection => {
    setPost(d => {
      return {...d, category: selection};
    });
    setVisible(false);
    // roleInputRef.current.blur();
  };
  const takePhotoFromCamera = async () => {
    let granted = await checkCameraPermission();
    if (!granted) {
      await getCameraPermission();
      let storage = await checkStoragePermissions();
      if (!storage) {
        await getStoragePermissions();
        takePhoto();
      } else {
        takePhoto();
      }
    } else {
      let storage = await checkStoragePermissions();
      if (!storage) {
        await getStoragePermissions();
        takePhoto();
      } else {
        takePhoto();
      }
    }
  };
  const choosePhotoFromLibrary = async () => {
    let granted = await checkStoragePermissions();
    if (!granted) {
      await getStoragePermissions();
      choosePhoto();
    } else {
      choosePhoto();
    }
  };
  const takePhoto = () => {
    ImagePicker.openCamera({
      width: 1200,
      height: 780,
      cropping: true,
    })
      .then(image => {
        // console.log(image);
        const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
        setImage(imageUri);
      })
      .catch(e => {
        // console.log('camera', e);
      });
  };

  const choosePhoto = () => {
    ImagePicker.openPicker({
      width: 1200,
      height: 780,
      cropping: true,
    })
      .then(image => {
        // console.log(image);
        const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
        setImage(imageUri);
      })
      .catch(e => {
        // console.log('library', e);
      });
  };

  const submitPost = async () => {
    if (
      !post.category ||
      !post.address ||
      !post.country ||
      !post.quantity ||
      !post.otherInfo ||
      !post.contactNumber ||
      !post.pickUpTime ||
      !post.state ||
      !post.ingredients ||
      !post.title ||
      !image
    ) {
      Alert.alert('Alert!', 'Please fill all fields correctly!');
      return;
    }
    const imageUrl = await uploadImage();
    // console.log('Image Url: ', imageUrl);
    // console.log('Post: ', post);

    firestore()
      .collection('posts')
      .add({
        userId: user.uid,
        post: post,
        postImg: imageUrl,
        postTime: firestore.Timestamp.fromDate(new Date()),
      })
      .then(() => {
        // console.log('Post Added!');
        Alert.alert('Listing Added!', 'Thank You for Sharing Food!');
        setPost(initialPost);
      })
      .catch(error => {
        // console.log(
        //   'Something went wrong with added post to firestore.',
        //   error,
        // );
      });
  };

  const uploadImage = async () => {
    if (image == null) {
      return null;
    }
    const uploadUri = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    // Add timestamp to File Name
    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;

    setUploading(true);
    setTransferred(0);

    const storageRef = storage().ref(`photos/${filename}`);
    const task = storageRef.putFile(uploadUri);

    // Set transferred state
    task.on('state_changed', taskSnapshot => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );

      setTransferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          100,
      );
    });

    try {
      await task;

      const url = await storageRef.getDownloadURL();

      setUploading(false);
      setImage(null);

      // Alert.alert(
      //   'Image uploaded!',
      //   'Your image has been uploaded to the Firebase Cloud Storage Successfully!',
      // );
      return url;
    } catch (e) {
      // console.log(e);
      return null;
    }
  };
  const pickImage = () => {
    Alert.alert(
      'Upload Image',
      'Select a Photo',
      [
        {
          text: 'Take Photo',
          onPress: () => {
            takePhotoFromCamera();
          },
        },
        {
          text: 'Choose from Library',
          onPress: () => {
            choosePhotoFromLibrary();
          },
          // style: "cancel"
        },
      ],
      {
        cancelable: true,
      },
    );
  };
  // console.log(post);
  return (
    <View style={{...styles.container}}>
      <Portal>
        <Dialog visible={pickerVisible} onDismiss={togglePicker}>
          <Dialog.Content>
            <DatePicker
              date={date}
              onDateChange={setDate}
              androidVariant="nativeAndroid"
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={togglePicker}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      {uploading ? (
        <StatusWrapper>
          <Text>Submitting {transferred} % Completed!</Text>
          <ActivityIndicator size="large" color="#1DC261" />
        </StatusWrapper>
      ) : (
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <CategoryModal
            visible={visible}
            toggleVisibility={toggleVisibility}
            selectCategory={selectCategory}
          />
          {/* <View style={styles.userImgContainer}>
          <Image
            style={styles.userImg}
            source={{
              uri:
                'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
            }}
          />
          <Text style={styles.userName}>{user.uid}</Text>
        </View> */}
          <Text style={styles.leadText}>Basic Info</Text>
          {image ? (
            <TouchableOpacity
              onPress={pickImage}
              style={styles.imageBackContainer}>
              <ImageBackground
                source={{uri: image}}
                resizeMode="cover"
                style={styles.imageBack}>
                <Icon name="camera-outline" style={styles.imgIcon} size={50} />
              </ImageBackground>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={pickImage}>
              <TextInput
                label="Upload Image"
                returnKeyType="next"
                onPressIn={pickImage}
                caretHidden
                editable={false}
                right={
                  <Input.Icon
                    forceTextInputFocus={false}
                    color="#000"
                    name="camera-outline"
                    onPress={pickImage}
                  />
                }
              />
            </TouchableOpacity>
          )}
          <TextInput
            label="Title eg tomatoes"
            returnKeyType="next"
            value={post.title}
            onChangeText={text =>
              setPost(d => {
                return {...d, title: text};
              })
            }
          />
          <TouchableOpacity onPress={toggleVisibility}>
            <TextInput
              label="Category"
              returnKeyType="next"
              onPressIn={toggleVisibility}
              caretHidden
              value={post.category}
              editable={false}
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
            label="Ingredients"
            returnKeyType="next"
            value={post.ingredients}
            onChangeText={text =>
              setPost(d => {
                return {...d, ingredients: text};
              })
            }
          />
          <TextInput
            label="Quantity"
            returnKeyType="next"
            value={post.quantity}
            onChangeText={text =>
              setPost(d => {
                return {...d, quantity: text};
              })
            }
          />
          <TextInput
            label="Other Info"
            returnKeyType="next"
            value={post.otherInfo}
            onChangeText={text =>
              setPost(d => {
                return {...d, otherInfo: text};
              })
            }
          />
          <Text style={styles.leadText}>Pick Up Info</Text>
          <View style={styles.pickUp}>
            <TextInput
              label="Country"
              returnKeyType="next"
              value={post.country}
              onChangeText={text =>
                setPost(d => {
                  return {...d, country: text};
                })
              }
            />
            <TextInput
              label="State"
              returnKeyType="next"
              value={post.state}
              onChangeText={text =>
                setPost(d => {
                  return {...d, state: text};
                })
              }
            />
            <TextInput
              label="House Address"
              returnKeyType="next"
              value={post.address}
              onChangeText={text =>
                setPost(d => {
                  return {...d, address: text};
                })
              }
            />
            <TouchableOpacity onPress={togglePicker}>
              <TextInput
                label="Pick Up Date and Time"
                returnKeyType="next"
                onPressIn={togglePicker}
                caretHidden
                multiline
                value={post.pickUpTime}
                editable={false}
                right={
                  <Input.Icon
                    forceTextInputFocus={false}
                    color="#000"
                    name="calendar-range"
                    onPress={togglePicker}
                  />
                }
              />
            </TouchableOpacity>
            {/* 
          <TextInput
            label="Expiry Date"
            returnKeyType="next"
            value={post.contactNumber}
            onChangeText={text =>
              setPost(d => {
                return {...d, contactNumber: text};
              })
            }
          /> */}
            <TextInput
              label="Contact Number"
              returnKeyType="next"
              value={post.contactNumber}
              onChangeText={text =>
                setPost(d => {
                  return {...d, contactNumber: text};
                })
              }
              autoCapitalize="none"
              autoCompleteType="tel"
              textContentType="telephoneNumber"
              keyboardType="phone-pad"
            />
          </View>
          <OpacityButton
            onPress={submitPost}
            btnStyle={{alignSelf: 'center', marginBottom: 30, marginTop: 20}}>
            Submit
          </OpacityButton>
        </KeyboardAwareScrollView>
      )}
    </View>
  );
};

export default AddPostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,

    // alignItems: 'center',
    justifyContent: 'center',
  },
  userImgContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userImg: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  userName: {
    fontFamily: 'Montserrat',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  leadText: {
    fontFamily: 'Montserrat',
    fontSize: 18,

    marginTop: 10,
    // marginBottom: 10,
  },
  selectImage: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageBackContainer: {
    width: '100%',
    height: 150,
    alignSelf: 'center',
    borderRadius: 20,
    marginTop: 10,
  },
  imageBack: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgIcon: {
    // width: 50,
    // height: 50,
    opacity: 0.5,
  },
  picker: {
    // flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    // width: 50,
    // height: 50,
    position: 'absolute',
    zIndex: 2,
    // backgroundColor: 'blue',
  },
});
