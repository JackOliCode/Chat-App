import { StyleSheet, View, TextInput, Text, Button, Alert, ScrollView } from 'react-native';
import { useState } from 'react';
import Home from './components/Home';
import Chat from './components/Chat';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// ---- Create Navigator --- //
const Stack = createNativeStackNavigator();

const App = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyB867x-PUipdqbGRm4V85GoLTFXBb76s14",
    authDomain: "chat-app-b082f.firebaseapp.com",
    projectId: "chat-app-b082f",
    storageBucket: "chat-app-b082f.appspot.com",
    messagingSenderId: "967275301188",
    appId: "1:967275301188:web:375aecd0d8648afc16ef11"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);  

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  return (
    <NavigationContainer>

      <Stack.Navigator 
        initialRouteName='Home'
      >
        <Stack.Screen  // Each Stack.Screen requires at least two props; name & component
          name='Home'
          component={Home}
        />
        <Stack.Screen 
          name='Chat'>
            {props => <Chat db={db} {...props}/>}
        </Stack.Screen>
      </Stack.Navigator>

    </NavigationContainer>
  );
}

export default App;




// NavigationContainer Doc https://reactnavigation.org/docs/navigation-container/ // 