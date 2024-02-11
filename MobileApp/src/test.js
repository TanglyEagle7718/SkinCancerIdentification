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
import ShowImage from "./showImage";


const Test = ({route, navigation, photo = null}) => {
    
    const [data, setData] = useState([{}])
    const [color, setColor] = useState("green")
    const allInfo = route.params;
    useEffect(() => {
        fetch("http://143.215.101.170:5000/output").then(
            res => res.json()
        ).then(
            data => {
                setData(data)
                console.log(data)
            }
        )
    }, [])

    const photoInfo = Object.values(allInfo)[1]
	const base64Icon = 'data:image/png;base64,'+photoInfo;

    let probability = 0;
    if (data.probability < 0.5) {
        probability = 0.5 - data.probability;
        probability = probability * 2;
    } else if (data.probability >= 0.5) {
        probability = data.probability - 0.5;
        probability = probability * 2;

    }

    return(
        <ScrollView style={{backgroundColor:"#ffc596"}}>
            <Button title="View image submitted" onPress={() => {navigation.navigate('Show Image', component={ShowImage, photo:photoInfo})}}/>

            <Text style={{fontSize:20, padding: 10, textAlign: "center"}}>We predict that this is a 
                {data.pred === "Benign" && <Text style={{color:"green", fontWeight: "bold"}}> {data.pred} </Text>}
                {data.pred === "Malignant" && <Text style={{color:"red", fontWeight: "bold"}}> {data.pred} </Text>}
             mole</Text>
            <Text style={{fontSize:20, padding: 10, textAlign: "center"}}>We are {Math.round(100*probability)}% confident</Text>
            <Button title="Back to home" onPress={() => navigation.navigate('CancelCancer', component={HomePage, photo:photo})} />
        </ScrollView>
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

export default Test;