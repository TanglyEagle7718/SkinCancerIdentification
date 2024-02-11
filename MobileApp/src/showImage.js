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
import HomePage from "./homeScreen";



const ShowImage = ({route, navigation, photo = null}) => {
    
    const allInfo = route.params;
    
    const photoInfo = Object.values(allInfo)[1]
	const base64Icon = 'data:image/png;base64,'+photoInfo;
    //console.log(photoInfo)

    return(
        <View style={{backgroundColor:"#ffc596"}}>
            <Text></Text>
            <Image style={styles.imageFormat} source={{uri: base64Icon}}/>
            
        </View>
    );
}

const styles = StyleSheet.create({
	imageFormat: {
	    alignSelf: 'center',
        height:"100%", 
        width:"100%",
        resizeMode: "contain",

	}
});

export default ShowImage;