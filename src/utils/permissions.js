import {Alert, PermissionsAndroid} from 'react-native';

export const getStoragePermissions = async () => {
  // console.log('requesting permissions');
  try {
    let permissions = await PermissionsAndroid.requestMultiple(
      [
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ],
      {
        title: 'Annapurna Storage Permission',
        message: 'Annapurna needs to access your storage',
      },
    );

    if (permissions['android.permission.READ_EXTERNAL_STORAGE'] === 'granted') {
      return;
    } else {
      Alert.alert(
        'Permission required',
        'Allow Annapurna to access your storage',
        [{text: 'OK', onPress: async () => await getStoragePermissions()}],
        {cancelable: false},
      );
    }
  } catch (err) {
    // console.warn(err);
  }
};
export const getCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Annapurna Camera Permission',
        message: 'Annapurna needs access to your camera ',
        // buttonNeutral: "Ask Me Later",
        // buttonNegative: "Cancel",
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      // console.log('You can use the camera');
      return;
    } else {
      // console.log('Camera permission denied');
      Alert.alert(
        'Permission required',
        'Allow Annapurna to access your device Camera',
        [{text: 'OK', onPress: async () => await getCameraPermission()}],
        {cancelable: false},
      );
    }
  } catch (err) {
    // console.warn(err);
  }
};
export const checkStoragePermissions = async () => {
  // console.log('checking permission');
  let granted = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
  );
  return granted;
};
export const checkCameraPermission = async () => {
  // console.log('checking permission');
  let granted = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.CAMERA,
  );
  return granted;
};
