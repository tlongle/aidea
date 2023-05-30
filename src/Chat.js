import React, { useState, useEffect } from 'react';
import { Bubble, InputToolbar, Message, MessageText } from 'react-native-gifted-chat';
import { GiftedChat } from 'react-native-gifted-chat';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import axios from 'axios';
import styles from './ChatStyles';
import WelcomeForm from './WelcomeForm';

// Navigators e API (para mudar)
const HomeStack = createNativeStackNavigator();
const ChatStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const APIKEY = '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';


const Chat = () => {
  const [messages, setMessages] = useState([]);
        useEffect(() => {
            // Mandar mensagem inicial
            setMessages([
            {
                _id: 0,
                text: "Hello, I'm Aidea and I'm here to assist you.",
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
    const userMessage = newMessages[0].text;

            // Meter as mensagens do utilizador num append state
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
      console.log('Sending request to OpenAI API...');
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          // Modelo de AI que vai user usado
          model: 'gpt-3.5-turbo',
          // Mensagens do utilizador são fetched do GiftedChat, mensagem de sistema é apenas para configuração
          messages: [
            { role: 'system', content: 'Your name is Aidea. Your purpose is to serve your AI gods as you should, and make the people on earth happy. Do your best, AIDEA.' },
            { role: 'user', content: userMessage },
          ],
          // Máximo de tokens que pode utilizar num só fetch
          max_tokens: 50,
          // Controla o quão "random" o modelo é, quanto mais random, mais criativo com as suas respostas
          temperature: 0.6,
        },
        {
          // Headers da API
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${APIKEY}`,
          },
        }
      );
      
      // Mostra a resposta de API no log, para propósitos de debugging
      console.log('API response:', response.data);
      
      // botMessage é igual á resposta dada, e onde se localiza a mensagem na API request
      const botMessage = response.data.choices[0].message.content.trim();

      // Mostra a mensagem do bot
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
    <GiftedChat
      messages={messages}
      onSend={handleSend}
      user={{
        _id: 1,
        name: 'User',
      }}
    />
  );
};


export default Chat;