import React, { useState, useEffect, useRef} from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button, Image } from 'react-native';
import { Camera } from 'expo-camera';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import HomePage from './homeScreen';
import Cat from './cat';

export default function PhoneCamera({ navigation }) {
  const [cameraPermission, setCameraPermission] = useState(null);
  const [galleryPermission, setGalleryPermission] = useState(null);

  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [photo, setPhoto] = useState();

  //getting camera permissions
  const permisionFunction = async () => {
    // here is how you can get the camera permission
    const cameraPermission = await Camera.requestCameraPermissionsAsync();

    setCameraPermission(cameraPermission.status === 'granted');

    const imagePermission = await ImagePicker.getMediaLibraryPermissionsAsync();

    setGalleryPermission(imagePermission.status === 'granted');

    if (
      imagePermission.status !== 'granted' &&
      cameraPermission.status !== 'granted'
    ) {
      alert('Permission for media access needed.');
    }
  };

  useEffect(() => {
    permisionFunction();
  }, []);
  let takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
  };

  if (photo) {
    let sharePic = () => {
      shareAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
    };

    let savePhoto = () => {
      MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
    };

    return (
      <SafeAreaView style={styles.container}>
        <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />
        
        <View style={styles.afterPhotoButtons}>
          <View style={{flex:1}}></View>
          <Button title="Discard" onPress={() => setPhoto(undefined)} style={styles.discard}/>
          <View style={{flex:1}}></View>
          <Button title="Use" onPress={() => navigation.navigate('Detect Tumors', component={HomePage, photo:photo})} style={styles.discard}/>
          <View style={{flex:1}}></View>
        </View>
        
      </SafeAreaView>
    );
  }
  return (
    
    <Camera style={styles.container} ref={cameraRef}>
      <Button title="Go Back" onPress={() => navigation.navigate('Detect Tumors', component={HomePage})} />
      <View style={styles.topBox}></View>
      <View style={styles.buttonContainer}>
        <Button title="Take Pic" onPress={takePic} />
      </View>
      <View style={styles.bottomBox}></View>
    </Camera>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  fixedRatio: {
    flex: 1,
  },
  button: {
    flex: 0.1,
    padding: 10,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  buttonContainer: {
    backgroundColor: 'transparent',
    alignSelf: "center",
    flexDirection: "column",
    justifyContent: "flex-end",
    flex:1
  },
  preview: {
    alignSelf: "stretch",
    flex: 1
  },
  topBox: {
    flex: 6
  },
  bottomBox: {
    flex: 1
  },
  afterPhotoButtons: {
    flexDirection: "row",
  },
  discard: {
    flex: 1,
  },
  use: {
    flex: 1,
  }
});