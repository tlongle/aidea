import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { openAIKey, sdKey } from './config';
import { useFonts } from 'expo-font';

const SplashScreen = ({ navigation }) => {

  const handleGetStarted = async () => {
    const openAIKey = await AsyncStorage.getItem('OPENAI_KEY');
    const sdKey = await AsyncStorage.getItem('SD_KEY');

    if(openAIKey && sdKey){
      navigation.navigate('Main');
    } else{
      navigation.navigate('API');
    }
  };

  const [isLoading, setIsLoading] = useState(true);
  const [fontsLoaded] = useFonts({
    'Bela': require('../assets/fonts/Belanosima-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000000" />
      </View>
    );
  }else{
    return (
      <View style={styles.container}>
        <Image source={require('../assets/img/splashscreenimg.png')} style={styles.image} />
        <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  image:{
    width:270,
    height:270,
    marginBottom: 250,
  },
  button:{
    backgroundColor: 'yellow',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
    width:'50%',
    marginTop: -150,
  },
  buttonText:{
    color: 'black',
    fontSize: 18,
    fontFamily: 'Bela',
    alignSelf: 'center',
  },
});

export default SplashScreen;
