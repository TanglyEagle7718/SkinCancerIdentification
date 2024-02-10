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

const HomePage = ({route, navigation, photo = null}) => {
	
	const allInfo = route.params;
	
	

	if (allInfo === undefined) {
		console.log(allInfo)
		
	
		return (
			<View>
				<Button title="camera" onPress={() => navigation.navigate('PhoneCamera')} />
			</View>
		);
	} else {
		const photoInfo = (Object.values(allInfo)[1])["base64"];
		const base64Icon = 'data:image/png;base64,'+photoInfo;


		const requestOptions = { 
			method: 'POST', 
			headers: { 'Content-Type': 'application/json' }, 
			body: JSON.stringify({ postName: photoInfo }) 
		}; 
	
		const postExample = async () => { 
			try { 
				await fetch( 
					'http://143.215.101.170:5000/base64', requestOptions) 
					.then(response => { 
						response.json() 
							.then(data => { 
								Alert.alert("Post created at : ",  
								data.createdAt); 
							}); 
					}) 
			} 
			catch (error) { 
				console.error(error); 
			} 
		} 

		//<Button onPress={submitPhoto1} title="Send data">
		return (
			<View>
				<Button style={{flex:1}} title="camera" onPress={() => navigation.navigate('PhoneCamera')} />
				<Image style={styles.imageFormat} source={{uri: base64Icon}}/>
				
				<View style={styles.btn}> 
            		<Button mode="contained" onPress={postExample} title="hi"> 
					</Button> 
       			 </View> 
			</View>
		);
	}
}

const styles = StyleSheet.create({
	imageFormat: {
		alignSelf: 'center',
      height:'50%', 
      width:'50%'
	}
});

export default HomePage;