import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
<<<<<<< HEAD
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Import your screen components
import WelcomeForm from './src/WelcomeForm';
import Chat from './src/Chat';
import ImageForm from './src/ImageForm';
import SettingsForm from './src/SettingsForm';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={WelcomeForm} />
        <Tab.Screen name="Chat" component={Chat} />
        <Tab.Screen name="Image" component={ImageForm} />
        <Tab.Screen name="Settings" component={SettingsForm} />
      </Tab.Navigator>
    </NavigationContainer>
  );
=======
import WelcomeForm from './src/WelcomeForm';
import Chat from './src/Chat';

const App = () => {
  return <Chat />;
>>>>>>> db45e07f9a9a06d5e4a102c1ee400020117f212f
};

export default App;
