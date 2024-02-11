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

const HomePage = ({route, navigation, photo = null}) => {
	
	const allInfo = route.params;
	
	

	if (allInfo === undefined || Object.values(allInfo)[1] === undefined) {
		console.log(allInfo)
		
		return (
			<View>
				<Button title="camera" onPress={() => navigation.navigate('PhoneCamera')} />
			</View>
		);
	} else {
		const photoInfo = (Object.values(allInfo)[1])["base64"];
		const base64Icon = 'data:image/png;base64,'+photoInfo;


		//<Button onPress={submitPhoto1} title="Send data">
		return (
			<View>
				<Button style={{flex:1}} title="camera" onPress={() => navigation.navigate('PhoneCamera')} />
				<Image style={styles.imageFormat} source={{uri: base64Icon}}/>
				<Button title="asjdf;kla" onPress={useEffect} />
				<Button title="asjdf;kla" onPress={() => navigation.navigate('Test')} />
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