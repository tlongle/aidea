import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { openAIKey, sdKey, CONFIG_KEYS } from './config';
import { useFonts } from 'expo-font';

export default function APIKeysPage({ navigation }) {
  const [fontsLoaded] = useFonts({
    'Bela': require('../assets/fonts/Belanosima-Regular.ttf'),
  });
  const [openAIKeyValue, setOpenAIKeyValue] = useState('');
  const [sdKeyValue, setSDKeyValue] = useState('');

  useEffect(() => {
    // Fetch the API keys from AsyncStorage when the component mounts
    fetchAPIKeys();
  }, []);

  const fetchAPIKeys = async () => {
    try {
      const openAIStoredKey = await AsyncStorage.getItem(CONFIG_KEYS.OPENAI_KEY);
      const sdStoredKey = await AsyncStorage.getItem(CONFIG_KEYS.SD_KEY);

      if (openAIStoredKey !== null) {
        setOpenAIKeyValue(openAIStoredKey);
      }

      if (sdStoredKey !== null) {
        setSDKeyValue(sdStoredKey);
      }
    } catch (error) {
      console.error('Error fetching API keys:', error);
    }
  };

  const saveAPIKeys = async () => {
    try {
      // Save the API keys to AsyncStorage
      await AsyncStorage.setItem(CONFIG_KEYS.OPENAI_KEY, openAIKeyValue);
      await AsyncStorage.setItem(CONFIG_KEYS.SD_KEY, sdKeyValue);
      
      // Optionally, you can display a confirmation message
      console.log('API keys saved: openAI Key:'+ openAIKeyValue+','+'StableDiffusion key:' + sdKeyValue);
      navigation.navigate('Main');
    } catch (error) {
      console.error('Error saving API keys:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Para poderes usar a app, precisas de duas API keys.</Text>
      <Text style={styles.textUnderTitle}>Onde arranjo estas keys?</Text>
      <Text style={styles.text}>OpenAI API Key</Text>
      <TextInput
        style={styles.textinputs}
        placeholder="Inserir API key aqui"
        onChangeText={setOpenAIKeyValue}
        value={openAIKeyValue}
      />

      <Text style={styles.text}>StableDiffusion API Key</Text>
      <TextInput
        style={styles.textinputs}
        placeholder="Inserir API key aqui"
        onChangeText={setSDKeyValue}
        value={sdKeyValue}
      />

      <TouchableOpacity style={styles.button5} onPress={saveAPIKeys}><Text style={styles.buttonText5}>Guardar</Text></TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 20,
    marginBottom: 10,
    fontFamily: 'Bela',
  },
  textinputs:{
    textAlign: 'center',
    backgroundColor: 'white',
    color: 'grey',
    borderRadius: 20,
    width: 350,
    height: 40,
    fontFamily: 'Bela',
    marginBottom: 10,
  },
  textUnderTitle:{
    color: 'yellow',
    fontSize: 20,
    marginTop: -20,
    marginBottom: 50,
    fontFamily: 'Bela'
  },
  titleText:{
    width: '75%',
    textAlign: 'left',
    color: 'white',
    fontSize: 35,
    marginBottom: 75,
    fontFamily: 'Bela'
  },
  button5:{
    alignSelf: 'center',
    width: 300,
    height: 50,
    backgroundColor: 'yellow',
    color: 'yellow',
    borderRadius: 20,
    marginBottom: 150,
    fontFamily: 'Bela',
  },
  button5:{
    alignSelf: 'center',
    width: 300,
    height: 50,
    backgroundColor: 'yellow',
    color: 'yellow',
    borderRadius: 20,
    marginTop: 20,
    marginBottom: 150,
    fontFamily: 'Bela',
  },
  buttonText5:{
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 14,
    fontFamily: 'Bela',
  },
});
