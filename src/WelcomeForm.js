import React from 'react';
import { View, Image, StyleSheet, Button, Text, TouchableOpacity, navigation } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {LinearGradient} from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';

const WelcomeForm = () => {
  const [fontsLoaded] = useFonts({
    'Bela': require('../assets/fonts/Belanosima-Regular.ttf'),
  });
  const navigation = useNavigation();
  const handleChatCardPress = () =>{
    navigation.navigate("Chat");
  };
  const handleImageCardPress = () =>{
    navigation.navigate("Image");
  };

  return (
        <View style={styles.container}>
          <TouchableOpacity style={styles.card} onPress={handleChatCardPress}>
            <LinearGradient
              colors={['yellow', 'orange']}
              start={{ x: 1, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradient}
            >
              <Ionicons name="chatbubble-outline" size={24} color="#FFFFFF" style={styles.icon} />
              <Text style={styles.cardText}>Chat</Text>
              <Text style={styles.cardSmallText}>Precisas de um assistente na ponta dos dedos? O chat da Aidea é para ti.</Text>
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
              <Text style={styles.cardSmallText}>O teu artista pessoal, no teu bolso.</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
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
    color: '#FFFFFF',
    fontFamily: 'Bela',
  },
  cardSmallText:{
    padding: 10,
    fontSize: 12,
    color: '#FFFFFF',
    fontFamily: 'Bela',
  },
  icon: {
    marginBottom: 8, // Adjust the spacing between icon and text
  },
});

export default WelcomeForm;