// import {
//   launchCameraAsync,
//   PermissionStatus,
//   useCameraPermissions,
// } from 'expo-image-picker';
// import { Alert, Button, View } from 'react-native';

// function ImagePicker() {
//   const [cameraPermissionInformation, requestPermission] =
//     useCameraPermissions();

//   async function verifyPermissions() {
//     if (cameraPermissionInformation === PermissionStatus.UNDETERMINED) {
//       const permissionResponse = await requestPermission();
//       return permissionResponse.granted;
//     }

//     if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
//       Alert.alert(
//         'Unexpected',
//         'The Application will Stop because on of our Core functionalities have no permission '
//       );
//       return false;
//     }

//     return true;
//   }

//   async function takeImageHandler() {
//     const hasPermission = await verifyPermissions();

//     if (!hasPermission) {
//       return;
//     }

//     const image = await launchCameraAsync({
//       allowsEditing: true,
//       aspect: [16, 9],
//       quality: 0.5,
//     });
//     console.log(image);
//   }
//   return (
//     <View>
//       <Button title="Take Image" onPress={takeImageHandler} />
//     </View>
//   );
// }

// export default ImagePicker;
import {
  launchCameraAsync,
  PermissionStatus,
  useCameraPermissions,
} from 'expo-image-picker';
import { useState } from 'react';
import {
  Alert,
  Button,
  Image,
  Linking,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Colors } from '../../constants/colors';
import OutlineButton from '../UI/OutlineButton';

function ImagePicker() {
  const [pickedImage, setPickedImage] = useState();
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();

  async function verifyPermissions() {
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Unexpected',
        'The application will stop because one of our core functionalities has no permission.'
      );
      return false;
    }

    return cameraPermissionInformation.status === PermissionStatus.GRANTED;
  }

  async function takeImageHandler() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    setPickedImage(image);
  }

  let imagePreview = <Text>No image taken yet.</Text>;

  if (pickedImage) {
    imagePreview = (
      <Image style={styles.image} source={{ uri: pickedImage.assets[0].uri }} />
    );
  }

  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <OutlineButton icon={'camera'} onPress={takeImageHandler}>
        Take A Picture
      </OutlineButton>
    </View>
  );
}

export default ImagePicker;

const styles = StyleSheet.create({
  imagePreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary400,
    borderRadius: 4,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
