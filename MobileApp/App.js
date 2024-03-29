import React, {useEffect, useState, useRef} from "react";
import {Alert, SafeAreaView, Text, View, LogBox} from "react-native";

import {Camera} from 'expo-camera';
import { shareAsync } from "expo-sharing";
import * as MediaLibrary from "expo-media-library"

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Cat from "./src/cat";
import HomePage from "./src/homeScreen"
import PhoneCamera from "./src/camera";
import Test from "./src/test";
import ShowImage from "./src/showImage";
import SelectedImage from "./src/selectedImage";
//import Maps from "./src/maps";

const Stack = createNativeStackNavigator();

export default function App() {
  LogBox.ignoreAllLogs();
  //const device = useCameraDevice('back')
  //if (device == null) return <NoCameraErrorView />

  //<Stack.Screen name="A Map" component={Maps}/>

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="CancelCancer" component={HomePage} />
        <Stack.Screen name="PhoneCamera" component={PhoneCamera} options={{ title: "Take Picture of Concerned Area",  headerBackVisible:false, headerShown:false} }/>
        <Stack.Screen name="Test" component={Test} options={{ title: "Analysis Results",  headerBackVisible:false,gestureEnabled: false  }}/>
        <Stack.Screen name="Show Image" component={ShowImage} />
        <Stack.Screen name="Show Selected Image" component={SelectedImage}/>

      </Stack.Navigator>
    </NavigationContainer>
  )

}

/*
import React from 'react';
import {SafeAreaView, StyleSheet, Text, View, ScrollView, TextInput, Image} from 'react-native';
import { Feather } from "@expo/vector-icons";

import Cat from './src/cat';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
    <ScrollView>
      <Text>Some text</Text>
      <View>
        <Text>Some more text</Text>
        <Image
          source={{
            uri: 'https://reactnative.dev/docs/assets/p_cat2.png',
          }}
          style={{width: 200, height: 200}}
        />
      </View>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
        }}
        defaultValue="You can type in me"
      />
      <Cat />
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 25,
    fontWeight: '500',
  },
});


export default App;
*/