import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Button, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';
import * as Animatable from 'react-native-animatable';

const SplashScreen = ({ navigation }) => {
  const [showModal, setShowModal] = useState(false);
  const [hasConfigured, setHasConfigured] = useState(false);

  useEffect(() => {
    const checkAPIKeys = async () => {
      try {
        // Check if API keys are present in AsyncStorage
        const openAIKey = await AsyncStorage.getItem('OPENAI_KEY');
        const sdKey = await AsyncStorage.getItem('SD_KEY');

        // Set the hasConfigured state based on the presence of API keys
        setHasConfigured(openAIKey !== null && sdKey !== null);
      } catch (error) {
        console.error('Error checking API keys:', error);
      }
    };

    checkAPIKeys();
  }, []);

  const onAnimationEnd = () => {
    // Animation end event handler
    if (!hasConfigured) {
      // If API keys are not present, show the modal
      setShowModal(true);
    } else {
      // If API keys are present, navigate to WelcomeForm
      navigation.navigate('WelcomeForm');
    }
  };

  const handleConfigureApp = () => {
    setShowModal(false);
    navigation.navigate('API');
  };


  return (
    <View style={styles.container}>
      <Animatable.Image
        style={styles.logo}
        animation="fadeIn"
        duration={1500}
        delay={500}
        onAnimationEnd={onAnimationEnd}
        source={{ uri: '../assets/img/logo.png' }}
      />

      {/* <Modal isVisible={showModal}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Por favor configure as suas API Keys.</Text>
          <Button title="Configurar" onPress={handleConfigureApp} />
        </View>
      </Modal> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
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
});

export default SplashScreen;
