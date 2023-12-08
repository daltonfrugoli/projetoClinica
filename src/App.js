/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from './screens/login/Login';

const Stack = createNativeStackNavigator();

function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName = "Login" screenOptions = {{ headerShown: false, headerLeft: null, animation: "slide_from_right" }}>
        <Stack.Screen name = "Login" component = { Login }/>
      </Stack.Navigator>
    </NavigationContainer>  
  )
}


export default App;
