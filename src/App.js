/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from './screens/login/Login';
import { Menu } from "./screens/menu/Menu";
import { Agendamento } from "./screens/agendamento/Agendamento";
import { Equipe } from "./screens/equipe/Equipe";
import { Historico } from "./screens/historico/Historico";
import { EquipeDetails } from "./screens/equipeDetails/EquipeDetails";
import { UserCadastro }  from "./screens/cadastro/UserCadastro";
import SQLite from "react-native-sqlite-storage";


const Stack = createNativeStackNavigator();
export const db = SQLite.openDatabase( 
  {
    name: "app.db",
    createFromLocation: 2
  },
  () => { },
  error => { console.log(error) }
);


function App() {

  useEffect(() => {
    createTables()
  }, [])


  const createTables = () => {
    db.transaction((qr) => {
      qr.executeSql(
        "CREATE TABLE IF NOT EXISTS " +
        "users" + 
        "(id INTEGER PRIMARY KEY AUTOINCREMENT, user TEXT,email TEXT, senha TEXT, token TEXT, userId INTEGER);"
      );
    })
  }


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName = "Login" screenOptions = {{ headerShown: false, headerLeft: null, animation: "slide_from_right" }}>
        <Stack.Screen name = "Login" component = { Login }/>
        <Stack.Screen name = "Menu" component = { Menu }/>
        <Stack.Screen name = "Agendamento" component = { Agendamento }/>
        <Stack.Screen name = "Historico" component = { Historico }/>
        <Stack.Screen name = "Equipe" component = { Equipe }/>
        <Stack.Screen name = "EquipeDetails" component = { EquipeDetails }/>
        <Stack.Screen name = "UserCadastro" component = { UserCadastro }/>
      </Stack.Navigator>
    </NavigationContainer>  
  )
}


export default App;
