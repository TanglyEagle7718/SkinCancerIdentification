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



const Test = ({route, navigation, photo = null}) => {
    const [data, setData] = useState([{}])
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
        <View>
            <Text>Here is the image you submitted</Text>
            <Image style={styles.imageFormat} source={{uri: base64Icon}}/>
            <Text>We predict that this is a {data.pred} tumor</Text>
            <Text>We are {Math.round(100*probability)}% confident</Text>
            <Button title="Back to home" onPress={() => navigation.navigate('Detect Tumors', component={HomePage, photo:photo})} />
        </View>
    );
}

const styles = StyleSheet.create({
	imageFormat: {
		alignSelf: 'center',
      height:'50%', 
      width:'50%'
	}
});

export default Test;