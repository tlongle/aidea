import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyTabs from './src/Chat';
import ChatScreen from './src/Chat';
import WelcomeForm from './src/WelcomeForm';

const HomeStack = createNativeStackNavigator();
const ChatStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabsApp() {
  return (
    <Tab.Navigator style={{ backgroundColor: 'black' }}>
      <Tab.Screen
      name="Home"
      component={WelcomeForm}
      />
      <Tab.Screen name="Chat" component={ChatScreen} />
    </Tab.Navigator>
  );
}

const App = () => {
  return(
    <NavigationContainer theme={DarkTheme} >
      <TabsApp />
   </NavigationContainer>
  );
};

export default App;
