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
} from "react-native";

import { Feather } from "@expo/vector-icons";

import Cat from "./cat"
import PhoneCamera from "./camera"

const HomePage = ({navigation}) => {
    return (
        <View>
            <Button title="click me!" onPress={() => navigation.navigate('Cat')} />
			<Button title="camera" onPress={() => navigation.navigate('PhoneCamera')} />
        </View>
    );
}

export default HomePage;