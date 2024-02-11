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
import SelectedImage from "./selectedImage";

import * as ImagePicker from "expo-image-picker";

const HomePage = ({route, navigation, photo = null}) => {
	

	const [image, setImage] = useState(null);

  	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
		mediaTypes: ImagePicker.MediaTypeOptions.All,
		allowsEditing: true,
		aspect: [16, 9],
		quality: 1,
		base64: true,
		});

		if (!result.canceled) {
		setImage(result.assets[0].base64);
		}


		//console.log(result.assets[0].base64);
		navigation.navigate('Show Selected Image',  component={SelectedImage, photo:result.assets[0].base64})
	};

	return (
		<ScrollView style={{backgroundColor:"#ffc596"}}>
			<View style={{alignContent:"center", justifyContent:"center", padding:10}}>
				<Text style={{fontSize:40}}>Welcome!</Text>
			</View>
			<View style={{padding:10}}>
				<Text>
					Thank you for choosing to use this app to help you with identifying malignant skin cancer tumors and benign ones.
				</Text>
				<Text></Text>
				<Text>
					Before you begin, we would like to emphasis that this app is NOT definitive. If you have any doubts regarding your health, you should not only consult this app, but also consult a medical professional AS SOON AS POSSIBLE. 
				</Text>
				<Text></Text>
				<Text>
					Using this app is quite simple - you can either take a picture of the mole in question, or you can choose from a pre-existing photo you have taken on your camera roll.
				</Text>
			</View>
			<View style={{flexDirection:"row", alignContent: "center", justifyContent:"space-around"}}>

				<TouchableOpacity style={{backgroundColor: '#FFF', height: 200, width: 200, position: 'relative' }} onPress={() => navigation.navigate('PhoneCamera')} >
					<Image source={require('../assets/selfie.jpg')} style={{height: 200, width: 200, opacity: 0.6, position: 'absolute'}}/>
					<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
						<Text style={{fontSize:25, fontWeight: "bold"}}>Take a Photo</Text>
          			</View>
				</TouchableOpacity>

				
				<TouchableOpacity style={{backgroundColor: '#FFF', height: 200, width: 200, position: 'relative' }} onPress={pickImage} >
					<Image source={require('../assets/bookshelf.jpg')} style={{height: 200, width: 200, opacity: 0.5, position: 'absolute'}}/>
					<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
						<Text style={{fontSize:25, fontWeight: "bold", textAlign: "center"}}>Select an Existing Photo</Text>
          			</View>
				</TouchableOpacity>
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