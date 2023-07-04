import React from 'react';
import { View, Image, StyleSheet, Button, Text, TouchableOpacity, navigation } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {LinearGradient} from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, NavigationContainer } from '@react-navigation/native';

const WelcomeForm = () => {

  const handleChatCardPress = async () => {
    const openAIKey = await AsyncStorage.getItem('OPENAI_KEY');
    const sdKey = await AsyncStorage.getItem('SD_KEY');

    if (openAIKey && sdKey) {
      // Redirect to the chat page
      navigation.navigate('Chat');
    } else {
      // Redirect to the API page
      navigation.navigate('API');
    }
  };

  const handleImageCardPress = async () => {
    const openAIKey = await AsyncStorage.getItem('OPENAI_KEY');
    const sdKey = await AsyncStorage.getItem('SD_KEY');

    if (openAIKey && sdKey) {
      // Redirect to the text-to-image page
      navigation.navigate('TextToImage');
    } else {
      // Display a modal or show an alert to prompt the user to go to the API page
      // You can implement your own custom modal or alert logic here
      alert('Please go to the API page to enter your API keys.');
    }
  };

  return (
  <NavigationContainer>
    <View style={styles.container}>
      <TouchableOpacity style={styles.card} onPress={handleChatCardPress}>
        <LinearGradient
          colors={['orange', 'yellow']}
          start={{ x: 1, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          <Ionicons name="chatbubble-outline" size={24} color="#FFFFFF" style={styles.icon} />
          <Text style={styles.cardText}>Chat</Text>
        </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card} onPress={handleImageCardPress}>
        <LinearGradient
          colors={['purple', 'pink']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          <Ionicons name="image-outline" size={24} color="#FFFFFF" style={styles.icon} />
          <Text style={styles.cardText}>Text-to-Image</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  card: {
    flex: 1,
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden', // Ensure the gradient is contained within the card
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  icon: {
    marginBottom: 8, // Adjust the spacing between icon and text
  },
});

export default WelcomeForm;