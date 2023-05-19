import { StyleSheet, View, TextInput, Text, Button, Alert, ScrollView } from 'react-native';
import { useState } from 'react';
import Home from './components/Home';
import Chat from './components/Chat';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// ---- Create Navigator --- //
const Stack = createNativeStackNavigator();

const App = () => {
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
          name='Chat'
          component={Chat}
        />
      </Stack.Navigator>

    </NavigationContainer>
  );
}

export default App;




// NavigationContainer Doc https://reactnavigation.org/docs/navigation-container/ // 