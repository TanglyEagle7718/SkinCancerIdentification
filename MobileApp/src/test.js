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



const Test = ({route, navigation}) => {
    const [data, setData] = useState([{}])

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

    return(
        <View>
            <Text>Hey!</Text>
        </View>
    );
}

export default Test;