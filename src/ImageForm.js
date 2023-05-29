import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import axios from 'axios';

const APIKEY = 'wQfrFOSmEQxzmFgplBCemU6NTaGUyBLY83TKCKrLICAA8yCnjBraKUbUQUPL';

/* const handleClick = async () => {
    try {
      const response = await axios.post('https://stablediffusionapi.com/api/v3/text2img', {
        key: APIKEY, // API Key
        prompt: userInput, // Input do utilizador
        samples: 1, // Quantidade de imagens que quero gerar de cada vez
      });

      // const imageUrl = response.data.image; // Assuming the API response contains the image URL in the 'image' field
  
      // Update the image object in your component state or wherever you're storing it
      console.log('API response:', response.data);
    } catch (error) {
      console.error('Error:', error);
      // Handle error case, display an error message, etc.
    }
  }; */

export default function App() {
  return (
    <View style={styles.container}>
        <Text>Test</Text>
        <img src='assets/adaptive-icon.png'/>
        <input type="text" value={userInput} onChange={e => setUserInput(e.target.value)}/>
        <button onClick={handleClick}>Fetch Image</button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
});
