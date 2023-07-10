import React, { useState } from 'react';
import { Text, View, StyleSheet, Button, Image, TextInput, ActivityIndicator, TouchableOpacity, Platform, PermissionsAndroid } from 'react-native';
import Constants from 'expo-constants';
import axios from 'axios';
import { imageModels } from './config_models';
import ModalDropdown from 'react-native-modal-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';



const API_HOST = 'https://api.stability.ai';
const ENGINE_ID = 'stable-diffusion-v1-5';

export default function App() {
  const [imageData, setImageData] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userInput, setUserInput] = useState('');
  const [selectedModel, setSelectedModel] = useState(imageModels[0]);
  const showModelPicker = () => {
    Picker.init({
      pickerData: imageModels,
      selectedValue: [selectedModel],
      pickerTitleText: 'Select Model',
      onPickerConfirm: (pickedValue) => {
        handleModelSelection(pickedValue[0]);
      },
      onPickerCancel: () => {
        console.log('Picker canceled');
      },
      onPickerSelect: () => {
        console.log('Picker item selected');
      },
    });
    Picker.show();
  };

  const handleModelSelection = (value) => {
    setSelectedModel(value);
    console.log('Selected Model:', value);
  };
  
  const fetchImage = async () => {
    const apiKey = await AsyncStorage.getItem('SD_KEY');
    if (!apiKey) {
      console.log('API key not found');
      return;
    }

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
          steps: 38,
          style_preset: selectedModel,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${apiKey}`,
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


  const saveImage = async () => {
    try {
      const filename = 'image.png'; // Specify the desired filename
      const mimetype = 'image/png'; // Specify the image mimetype
      const base64 = imageData; // Pass the base64 image data
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        console.log('Media Library permission denied');
        return;
      }
  
      // Convert the base64 image data to a local file
      const fileUri = `${FileSystem.cacheDirectory}${filename}`;
      await FileSystem.writeAsStringAsync(fileUri, base64, {
        encoding: FileSystem.EncodingType.Base64,
      });
  
      // Save the image to the media library
      const asset = await MediaLibrary.createAssetAsync(fileUri);
      await MediaLibrary.createAlbumAsync('Aidea', asset, false);
  
      // Delete the temporary file
      await FileSystem.deleteAsync(fileUri);
  
      console.log('Image saved successfully');
    } catch (error) {
      console.error('Error saving image:', error);
    }
  };
  

  return (
    <View style={styles.container}>
      {/* <Image source={require('../assets/img/aidea.png')} style={styles.logo}/> */}
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
        placeholder="Insere a tua ideia..."
      />
      {error && <Text>{error}</Text>}
      <View style={styles.dropdownContainer}>
        <Text style={styles.labelText}>Model:</Text>
        <ModalDropdown
          style={styles.dropdown}
          textStyle={styles.dropdownText}
          dropdownStyle={styles.dropdownMenu}
          dropdownTextStyle={styles.dropdownMenuItemText}
          options={imageModels}
          defaultValue={imageModels[0]}
          onSelect={(index, value) => handleModelSelection(value)}
        />
      </View>
      <TouchableOpacity onPress={fetchImage} style={styles.buttonGenerate}><Text style={styles.textButton}>Gerar Imagem</Text></TouchableOpacity>
      {imageData && (
        <TouchableOpacity onPress={saveImage} style={styles.buttonGenerate2}><Text style={styles.textButton2}>Guardar</Text></TouchableOpacity>
      )}
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
    fontFamily: 'Bela',
  },
  text: {
    color: 'white',
    fontFamily: 'Bela',
    alignSelf: 'center',
    fontSize: 20,
  },
  text2: {
    color: 'yellow',
    alignSelf: 'center',
    fontSize: 14,
    fontFamily: 'Bela',
  },
  loader: {
    marginTop: 20,
    marginBottom: 20,
  },
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: 'black', // Black background
    borderWidth: 2,
    borderColor: 'yellow', // Yellow border
    paddingHorizontal: 10,
    fontFamily: 'Bela',
  },
  labelText: {
    color: 'yellow',
    marginRight: 10,
    fontFamily: 'Bela',
  },
  dropdown: {
    flex: 1,
    paddingVertical: 10,
    fontFamily: 'Bela',
  },
  dropdownText: {
    color: 'yellow',
    fontSize: 16,
    fontFamily: 'Bela',
  },
  dropdownMenu: {
    backgroundColor: 'black', // Black background for the dropdown menu
  },

  dropdownMenuItemText: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'Bela',
  },
  buttonGenerate:{
    alignSelf: 'center',
    width: 300,
    height: 50,
    backgroundColor: 'yellow',
    color: 'yellow',
    borderRadius: 20,
    marginBottom: 150,
    fontFamily: 'Bela',
  },
  textButton:{
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 14,
    fontFamily: 'Bela',
  },
  buttonGenerate2:{
    alignSelf: 'center',
    width: 200,
    height: 50,
    backgroundColor: 'yellow',
    color: 'yellow',
    borderRadius: 20,
    marginBottom: 50,
    marginTop: -130,
    fontFamily: 'Bela',
  },
  textButton2:{
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 14,
    fontFamily: 'Bela',
  },
});
