import React, { useState, useEffect, useRef} from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { shareAsync } from 'expo-sharing';
import { Feather } from "@expo/vector-icons";

import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import HomePage from './homeScreen';
import Test from './test';

export default function PhoneCamera({ navigation }) {
  const [cameraPermission, setCameraPermission] = useState(null);
  const [galleryPermission, setGalleryPermission] = useState(null);

  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [photo, setPhoto] = useState();

  const [type, setType] = useState(CameraType.back);
  function toggleCameraType() {
    console.log('here')
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    console.log(type)
  }




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

    //const photoInfo = (Object.values(allInfo)[1])["base64"];
	  //const base64Icon = 'data:image/png;base64,'+photoInfo;


		const requestOptions = { 
			method: 'POST', 
			headers: { 'Content-Type': 'application/json' }, 
			body: JSON.stringify({ postName: photo.base64 }) 
		}; 
	
		const sendMetaData = async () => { 
			try { 
				await fetch( 
					'http://143.215.101.170:5000/base64', requestOptions) 
					.then(response => {
						response.json()
							.then(data => {
								
							}); 
					})
          navigation.navigate('Test', component={Test, photo:photo.base64});
			}
			catch (error) { 
				console.error(error); 
			} 
		} 

    return (
      <SafeAreaView style={photoStyles.container}>
        <Image style={photoStyles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />
        
        <View style={photoStyles.afterPhotoButtons}>
          <View style={{flex:1}}></View>
          <Button title="Discard" onPress={() => setPhoto(undefined)} style={photoStyles.discard}/>
          <View style={{flex:1}}></View>
          <Button title="Use" onPress={sendMetaData} style={photoStyles.discard}/>
          <View style={{flex:1}}></View>
        </View>
        
      </SafeAreaView>
    );
  }
  return (
    /*
    <Camera style={photoStyles.container} ref={cameraRef}>
      <Button title="Go Back" onPress={() => navigation.navigate('Detect Tumors', component={HomePage, photo:photo})} />
      <View style={photoStyles.topBox}></View>
      <View style={photoStyles.buttonContainer}>
        <Button title="Take Pic" style={{color:"transparent"}} onPress={takePic}/>
        <TouchableOpacity>
          <Image source={require('../assets/takePicIcon.png')} onPress={takePic} style={{width:"100%", height:"100%"}}/>
        </TouchableOpacity>
      </View>
      <View style={photoStyles.bottomBox}></View>
    </Camera>
    */
    
    
    <Camera style={cameraStyles.container} ref={cameraRef} type={type}>
      <View style={{flex:6}}></View>
      <View style={{flex:1, flexDirection:"row"}}>

        <View style={cameraStyles.backButton}>
          <Button title="Go Back" onPress={() => navigation.navigate('Detect Tumors', component={HomePage, photo:photo})} style={cameraStyles.backButton}/>
        </View>

        <TouchableOpacity style={cameraStyles.backButton} onPress={takePic}>
          <Image source={require('../assets/takePicIcon.png')} style={{width:100, height:100}}/>
        </TouchableOpacity>
        
        <View style={cameraStyles.backButton}>
          <TouchableOpacity onPress={toggleCameraType}>
            <Feather
            name="refresh-cw"
            size={50}
            color="black" />
          </TouchableOpacity>
        </View>

      </View>

      <View style={{flex:1}}></View>
    </Camera>
    
  );
}



const cameraStyles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1
  }, 
  backButton: {
    flex:1, 
    alignItems: 'center', 
    justifyContent: "center",
  }

});


/*
<Camera style={styles.container} ref={cameraRef}>
      <Button title="Go Back" onPress={() => navigation.navigate('Detect Tumors', component={HomePage, photo:photo})} />
      <View style={styles.topBox}></View>
      <View style={styles.buttonContainer}>
        <Button title="Take Pic" style={{color:"transparent"}} onPress={takePic}/>
        <TouchableOpacity>
          <Image source={require('../assets/takePicIcon.png')} onPress={takePic} style={{width:"100%", height:"100%"}}/>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomBox}></View>
    </Camera>
*/

const photoStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: "center"
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