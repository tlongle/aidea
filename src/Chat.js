import React, { useState, useEffect } from 'react';
import { Bubble, InputToolbar, Message, MessageText } from 'react-native-gifted-chat';
import { GiftedChat } from 'react-native-gifted-chat';
import axios from 'axios';
// import { API_KEY } from "@env";
import styles from './ChatStyles';

const APIKEY = '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';
const Chat = () => {
  const [messages, setMessages] = useState([]);

        useEffect(() => {
            // Send initial message from the bot when the component mounts
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

  const handleSend = async newMessages => {
    const userMessage = newMessages[0].text;

            // Append the user's message to the messages state
            setMessages(previousMessages =>
                GiftedChat.append(previousMessages, [
                {
                    _id: Math.random().toString(),
                    text: userMessage,
                    createdAt: new Date(),
                    user: {
                    _id: 1, // Use the same user ID as defined in the GiftedChat component
                    },
                },
                ])
            );
    try {
      console.log('Sending request to OpenAI API...');
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'Your name is Aidea. Your purpose is to serve your AI gods as you should, and make the people on earth happy. Do your best, AIDEA.' },
            { role: 'user', content: userMessage },
          ],
          max_tokens: 50,
          temperature: 0.6,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${APIKEY}`,
          },
        }
      );

      console.log('API response:', response.data);

      const botMessage = response.data.choices[0].message.content.trim();

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
      // Handle error case, display an error message, etc.
    }
  };

  const renderInputToolbar = props => {
    return <InputToolbar {...props} containerStyle={styles.inputToolbar} />;
  };
  
  const renderMessageText = props => {
    return (
      <MessageText
        {...props}
        textStyle={styles.messageText}
      />
    );
  };
  
  const renderMessage = props => {
    return (
      <Message
        {...props}
        containerStyle={styles.messageContainer}
      />
    );
  };

  const renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#0E1C36', // Modify the background color for user's messages
          },
          left: {
            backgroundColor: '#0E1C36', // Modify the background color for bot's messages
          },
        }}
        textStyle={{
          right: {
            color: '#ffffff', // Modify the text color for user's messages
          },
          left: {
            color: '#ffffff', // Modify the text color for bot's messages
          },
        }}
      />
    );
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={handleSend}
      user={{
        _id: 1,
        name: 'User',
      }}
      renderInputToolbar={renderInputToolbar}
      renderMessageText={renderMessageText}
      renderMessage={renderMessage}
      renderBubble={renderBubble}
    />
  );
};

export default Chat;
