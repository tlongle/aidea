import React, { useState } from 'react';
import { Text, View, StyleSheet, Button, Image, TextInput, ActivityIndicator } from 'react-native';
import Constants from 'expo-constants';
import axios from 'axios';

const API_HOST = 'https://api.stability.ai';
const ENGINE_ID = 'stable-diffusion-v1-5';
const API_KEY = 'sk-AdOwZZ9JR5ZyqVSXr7SWMox2UjZoWw57lm6TWu13VNQLboP9';

export default function App() {
  const [imageData, setImageData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userInput, setUserInput] = useState('');

  const fetchImage = async () => {
    try {
      setLoading(true);

      if (!userInput) {
        // Display placeholder image
        setImageData(require('../assets/img/placeholder.png'));
        setLoading(false);
        return;
      }

      const response = await axios.post(
        `${API_HOST}/v1/generation/${ENGINE_ID}/text-to-image`,
        {
          text_prompts: [
            {
              text: userInput,
            },
          ],
          cfg_scale: 7,
          height: 512,
          width: 512,
          samples: 1,
          steps: 50,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );

      if (!response.data.artifacts || !Array.isArray(response.data.artifacts)) {
        throw new Error('Invalid response format');
      }

      const images = response.data.artifacts;
      const imageData = images[0]?.base64;

      setImageData(imageData);
      setError(null);
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to fetch image');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* <Image source={require('../assets/img/aidea.png')} style={styles.logo}/> */}
      <Text style={styles.text}>Gerador de Imagens do AIdea</Text>
      <Text style={styles.text2}>Baseado no API: Stability.ai</Text>
      {loading ? (
        <ActivityIndicator style={styles.loader} size="large" color="white" />
      ) : imageData ? (
        <Image source={{ uri: `data:image/png;base64,${imageData}` }} style={styles.image} />
      ) : (
        <Image source={require('../assets/img/placeholder.png')} style={styles.image} />
      )}
      <TextInput
        style={styles.input}
        onChangeText={setUserInput}
        value={userInput}
        placeholder="Enter your text"
      />
      <Button title="Gerar Imagem" onPress={fetchImage} />
      {error && <Text>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  logo:{
    width: 150,
    height: 150,
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'black',
    padding: 8,
  },
  image: {
    alignSelf: 'center',
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginTop: 20,
    marginBottom: 20,
  },
  image:{
    alignSelf: 'center',
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 20,
  },
  input: {
    height: 40,
    borderColor: 'yellow',
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: 'white',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
    fontSize: 20,
  },
  text2: {
    color: 'purple',
    fontWeight: 'bold',
    alignSelf: 'center',
    fontSize: 14,
  },
  loader: {
    marginTop: 20,
    marginBottom: 20,
  },
});
