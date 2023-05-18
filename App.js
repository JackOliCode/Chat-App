import { StyleSheet, View, TextInput, Text, Button, Alert, ScrollView } from 'react-native';
import { useState } from 'react';
import Screen1 from './components/Screen1';
import Screen2 from './components/Screen2';
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
          component={Screen1}
        />
        <Stack.Screen 
          name='Chat'
          component={Screen2}
        />
      </Stack.Navigator>

    </NavigationContainer>
  );
}

export default App;




// NavigationContainer Doc https://reactnavigation.org/docs/navigation-container/ // 