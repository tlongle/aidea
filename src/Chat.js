import { React, useState, useEffect, useRef } from 'react';
import { Bubble, InputToolbar, Message, MessageText } from 'react-native-gifted-chat';
import { GiftedChat } from 'react-native-gifted-chat';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, View, Image, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import axios from 'axios';
import Picker from 'react-native-picker';
import { models } from './config_models';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CONFIG_KEYS } from './config';

// Navigators e API (para mudar)
const HomeStack = createNativeStackNavigator();
const ChatStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Chat = () => {
  const [fontsLoaded] = useFonts({
    'Bela': require('../assets/fonts/Belanosima-Regular.ttf'),
  });
  const [messages, setMessages] = useState([]);
        useEffect(() => {
            // Mandar mensagem inicial
            setMessages([
            {
                _id: 0,
                text: "Olá, sou o Aidea, em que te posso ajudar?",
                createdAt: new Date(),
                user: {
                _id: 2,
                name: 'Aidea Bot',
                },
            },
            ]);
        }, []);

  // HandleSend para mandar as mensagens do user para a API
  const handleSend = async newMessages => {

    const apiKey = await AsyncStorage.getItem('OPENAI_KEY');
    if (!apiKey) {
      console.log('API key not found');
      return;
    }
    
    const userMessage = newMessages[0].text;
            // Check if userMessage is empty or contains only whitespace
            if (!userMessage || userMessage.trim().length === 0) {
              // Handle the case where userMessage is empty or whitespace
              console.log('Invalid message');
              return;
            }
                      
            // Meter as mensagens do utilizador na interface
            // Gera um ID random para cada mensagem e dá log de quando foi enviada
            setMessages(previousMessages =>
                GiftedChat.append(previousMessages, [
                {
                    _id: Math.random().toString(),
                    text: userMessage,
                    createdAt: new Date(),
                    user: {
                    _id: 1, // ID do utilizador que foi mencionado no summon do GiftedChat
                    },
                },
                ])
            );


    // Tentar fazer o API request
    try {
      // Log para debugging
      console.log('Sending request to OpenAI API...');
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          // Modelo de AI que vai user usado
          model: 'gpt-3.5-turbo',
          // Mensagens do utilizador são fetched do GiftedChat, mensagem de sistema é apenas para configuração
          messages: [
            { role: 'system', content: 'Your name is Aidea, and when asked, your name will be Aidea, not OpenAI or ChatGPT. Your job is to be the best AI assistant out there, even better than ChatGPT. Now, you take this prompt, and give me the most detailed answer you can. Be mindful that the programmer of this app is portuguese and the people using it are portuguese, so answer in portuguese. Keep your answer simple and concise. Prompt:' },
            { role: 'user', content: userMessage },
          ],
          // Máximo de tokens (cada token é X palavras) que pode utilizar num só fetch
          max_tokens: 550,
          // Controla o quão "random" o modelo é, quanto mais random, mais criativo com as suas respostas
          temperature: 0.6,
        },
        {
          // Headers da API
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );
      
      // Mostra a resposta de API na consola, para propósitos de debugging
      console.log('API response:', response.data);
      
      // botMessage é igual á resposta dada, e onde se localiza a mensagem na API request
      const botMessage = response.data.choices[0].message.content.trim();

      // Mostra o texto da variavel botMessage como uma "mensagem" do bot
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, [
          {
            _id: Math.random().toString(),
            text: botMessage,
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'Aidea Bot',
            },
          },
        ])
      );
    } catch (error) {
      console.error('Error:', error);
      // Caso não funcione, dá um erro e o mesmo é mostrado na consola
    }
  };

    return (
      // Mostra ao utilizador a interface de Chat
        <GiftedChat
        messagesContainerStyle={{ fontFamily: 'Bela', marginTop: -20}}
        messages={messages}
        onSend={handleSend}
        user={{
          _id: 1,
          name: 'User',
        }}
        renderInputToolbar={CustomInputToolbar}
        renderSend={renderSend}
        renderAvatar={renderAvatar}
        renderBubble={renderBubble}
      />
      
    );
  }

const renderSend = (props) => {
    return (
      <Ionicons
        name="send"
        size={26}
        color="yellow"
        style={{ marginBottom: 5, marginRight: 10 }}
        onPress={() => {
          // Handle send functionality
          if (props.onSend) {
            props.onSend({ text: props.text.trim() }, true);
          }
        }}
      />
    );
};
  
const renderAvatar = (props) => {
    return (
      <Image
        source={{ require: '../assets/img/logo.png' }}
      />
    );
};
  
const CustomInputToolbar = (props) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={styles.inputToolbarContainer}
        primaryStyle={styles.inputToolbarPrimary}
        textInputStyle={{
          color: 'white',
          fontFamily: 'Bela',
        }}
      />
    );
};

const renderBubble = (props) => {
  return (
    <Bubble
      {...props}
      timeTextStyle={{
        left:{color: 'black', fontFamily:'Bela',},
        right:{color: 'black', fontFamily:'Bela',},
      }}
      wrapperStyle={{
        right: {
          backgroundColor: 'yellow', // Change the background color of user sent messages
        },
      }}
      textStyle={{
        left: {
          fontFamily: 'Bela',
        },
        right: {
          color: 'black', // Change the text color of user sent messages
          fontFamily: 'Bela', // Change the font for user sent messages
        },
      }}
    />
  );
};

const styles = StyleSheet.create({
  container:{
    fontFamily: 'Bela',
  },
  inputToolbarContainer: {
    borderTopWidth: 0,
    borderBottomWidth: 0,
    backgroundColor: 'black',
    color: '#fff',
    padding: 3,
    fontFamily: 'Bela',
  },
  inputToolbarPrimary: {
    color: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'black',
    borderColor: 'yellow',
    borderWidth: 2,
    borderRadius: 25,
    paddingLeft: 5,
    paddingRight: 5,
    marginBottom: 10,
    marginHorizontal: 15,
    fontFamily: 'Bela',
  },
});

export default Chat;
