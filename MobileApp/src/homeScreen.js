import React, {useEffect, useState} from "react";
import {
	Text,
	StyleSheet,
	View,
	Button,
	TouchableOpacity,
	ScrollView,
	SafeAreaView,
	TextInput,
	Image
} from "react-native";

import { Feather } from "@expo/vector-icons";

import Cat from "./cat"
import PhoneCamera from "./camera"
import Test from "./test";

import * as ImagePicker from "expo-image-picker";

const HomePage = ({route, navigation, photo = null}) => {

	const [image, setImage] = useState(null);

  	const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
	  base64: true,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }

	const requestOptions = { 
		method: 'POST', 
		headers: { 'Content-Type': 'application/json' }, 
		body: JSON.stringify({ postName: result.assets[0].base64 }) 
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
		}
		catch (error) { 
			console.error(error); 
		} 
	}
	sendMetaData;


	//console.log(result.assets[0].base64);
	navigation.navigate('Test', component={Test, photo:result.assets[0].base64});
};

	return (
		<ScrollView style={{backgroundColor:"#ffc596"}}>
			<View style={{alignContent:"center", justifyContent:"center"}}>
				<Text style={{fontSize:50}}>Welcome!</Text>
			</View>
			<View style={{flexDirection:"row", alignContent: "center", justifyContent:"space-around"}}>
				<Button title="camera" onPress={() => navigation.navigate('PhoneCamera')} />
				<Button title="select media" onPress={pickImage} />
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	imageFormat: {
		alignSelf: 'center',
      height:'50%', 
      width:'50%'
	}
});

export default HomePage;