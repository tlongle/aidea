import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider } from 'react-native-paper';
import { useFonts } from 'expo-font';

// Import your screen components
import WelcomeForm from './src/WelcomeForm';
import Chat from './src/Chat';
import ImageForm from './src/ImageForm';
import SettingsForm from './src/SettingsForm';
import APIkeys from './src/APIkeys';
import SplashScreen from './src/SplashScreen';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    // Navegação, tabs para cada uma das páginas
    <PaperProvider>
      <NavigationContainer theme={DarkTheme}>
          <Tab.Navigator initialRouteName="Splash"
            screenOptions={({ route }) => ({
              tabBarIcon: ({ color, size }) => {
                let iconName;

                if (route.name === 'Home') {
                  iconName = 'home-outline';
                } else if (route.name === 'Chat') {
                  iconName = 'chatbubbles-outline';
                } else if (route.name === 'Image') {
                  iconName = 'image-outline';
                } else if (route.name === 'Settings') {
                  iconName = 'settings-outline';
                } else if (route.name === 'API'){
                  iconName = 'key-outline';
                }

                return <Ionicons name={iconName} size={size} color={color} />;
              },
            })}
            tabBarOptions={{
              activeTintColor: 'yellow',
              inactiveTintColor: 'gray',
              style: {
                backgroundColor: 'black', // Background color of the tab bar
              },
            }}
          >
            <Tab.Screen name="Splash" component={SplashScreen} options={{ tabBarVisible: false, tabBarVisible: false }} />
            <Tab.Screen
              name="Home"
              component={WelcomeForm}
              options={{
                title: 'Home',
                headerStyle: {
                  backgroundColor: 'black', // Set the background color of the header
                },
                headerTintColor: '#fff', // Set the text color of the header
                headerTitleStyle: {
                  fontWeight: 'bold', // Set the font weight of the header title
                },
                headerTitleAlign: 'center', // Set the alignment of the header title
              }}  
            />
            <Tab.Screen
              name="Chat"
              component={Chat}
              options={{
                title: 'Chat',
                headerStyle: {
                  backgroundColor: 'black', // Set the background color of the header
                },
                headerTintColor: '#fff', // Set the text color of the header
                headerTitleStyle: {
                  fontWeight: 'bold', // Set the font weight of the header title
                },
                headerTitleAlign: 'center', // Set the alignment of the header title
              }}  
            />
            <Tab.Screen
              name="Image"
              component={ImageForm}
              options={{
                title: 'Image',
                headerStyle: {
                  backgroundColor: 'black', // Set the background color of the header
                },
                headerTintColor: '#fff', // Set the text color of the header
                headerTitleStyle: {
                  fontWeight: 'bold', // Set the font weight of the header title
                },
                headerTitleAlign: 'center', // Set the alignment of the header title
              }}  
            />
            <Tab.Screen name="API" component={APIkeys}/>
            <Tab.Screen name="Settings" component={SettingsForm} />
          </Tab.Navigator>
      </NavigationContainer>
  </PaperProvider>
  );
}
export default App;
