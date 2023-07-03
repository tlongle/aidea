import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { openAIKey, sdKey, CONFIG_KEYS } from './config';

export default function APIKeysPage() {
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
        openAIKey = openAIStoredKey;
      }

      if (sdStoredKey !== null) {
        setSDKeyValue(sdStoredKey);
        sdKey = sdStoredKey;
      }
    } catch (error) {
      console.error('Error fetching API keys:', error);
    }
  };

  const saveAPIKeys = async () => {
    try {
      // Update the values of openAIKey and sdKey with the text from the input fields
      openAIKey = openAIKeyValue;
      sdKey = sdKeyValue;

      // Save the API keys to AsyncStorage
      await AsyncStorage.setItem(CONFIG_KEYS.OPENAI_KEY, openAIKeyValue);
      await AsyncStorage.setItem(CONFIG_KEYS.SD_KEY, sdKeyValue);

      // Optionally, you can display a confirmation message
      console.log('API keys saved:', openAIKey, sdKey);
    } catch (error) {
      console.error('Error saving API keys:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>OpenAI API Key</Text>
      <TextInput
        style={styles.textinputs}
        placeholder="Insert API Key here"
        onChangeText={setOpenAIKeyValue}
        value={openAIKeyValue}
      />

      <Text style={styles.text}>StableDiffusion API Key</Text>
      <TextInput
        style={styles.textinputs}
        placeholder="Insert API Key here"
        onChangeText={setSDKeyValue}
        value={sdKeyValue}
      />

      <Button style={styles.button} title="Save API Keys" onPress={saveAPIKeys} />
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
    fontWeight: 'bold',
    marginBottom: 10,
  },
  textinputs:{
    textAlign: 'center',
    backgroundColor: 'white',
    color: 'grey',
    borderRadius: 20,
    width: 350,
    height: 40,
    marginTop: 20,
    marginBottom: 20,
  },
  button:{
    marginTop: 50,
  },
});
