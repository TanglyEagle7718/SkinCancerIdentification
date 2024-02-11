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
import Test from "./test";



const SelectedImage = ({route, navigation, photo = null}) => {
    
    const allInfo = route.params;
    
    const photoInfo = Object.values(allInfo)[1]
	const base64Icon = 'data:image/png;base64,'+photoInfo;

    const requestOptions = { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ postName: photoInfo }) 
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
            console.log("here")
        }
        catch (error) { 
            console.error(error); 
        } 
        navigation.navigate('Test', component={Test, photo:photoInfo});
    }




    //<Image style={styles.imageFormat} source={{uri: base64Icon}}/>
    return(
        <ScrollView style={{backgroundColor:"#ffc596"}}>
            <View>
                <Text style={{textAlign: "center", fontSize:30}}>Are you sure you want to use this image?</Text>
                <Text></Text>
                
            </View>
            <Image style={styles.imageFormat} source={{uri: base64Icon}}/>
            <View style={{flexDirection:"row", justifyContent:"space-around"}}>
                    
                    <TouchableOpacity onPress={sendMetaData}>
                        <Text style={{fontSize:50}}>Yes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('CancelCancer', component={HomePage, photo:null})}>
                        <Text style={{fontSize:50}}>No</Text>
                    </TouchableOpacity>
                </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
	imageFormat: {
	    alignSelf: 'center',
        height:"300%", 
        width:"300%",
        resizeMode: "contain",

	}
});

export default SelectedImage;