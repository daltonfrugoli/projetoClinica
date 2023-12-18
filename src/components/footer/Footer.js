import React, { useState } from "react";

import {
    View,
    TouchableOpacity,
} from "react-native"

import { styles } from "./Footer.style";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { db } from "../../App"; 


export const Footer = (props) => {

    const navigation = useNavigation()
    const [press, setPress] = useState(props.pressButton)
    const [disable, setDisable] = useState(props.disable)

    return(
        <View style={styles.footerContainer}>
            <TouchableOpacity 
            onPress={ () => {
                setPress('home')

                //esta seção trás de volta os dados necessários para carregamento da pag.
                db.transaction((qr) => {
                    qr.executeSql(
                        "SELECT * FROM users",
                        [],
                        (qr2, results) => {
                            
                            //conversão dos dados de string para objeto
                            var res = JSON.parse(results.rows.raw()[0].user)
                            console.log(typeof(res)) 
                            navigation.navigate("Menu", {dataUser: res})

                        }
                    )
                }); 
                
            }}
            style={styles.footerButtons}
            >
                <Ionicons name = "home" style = {[styles.footerIcon, {color: press == 'home' ? '#FF4500' : '#ffffff'}]}></Ionicons>
            </TouchableOpacity>

            <TouchableOpacity 
            onPress={ () => {
                setPress('user')
            }}
            style = {styles.footerButtons}
            disabled = {disable}
            >
                <Ionicons name = "person" style = {[styles.footerIcon, {color: press == 'user' ? '#FF4500' : '#ffffff', opacity: disable == true ? 0.5 : 1}]}></Ionicons>
            </TouchableOpacity>
        </View>
    )
}