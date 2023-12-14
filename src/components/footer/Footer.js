import React, { useState } from "react";

import {
    View,
    TouchableOpacity,
    Text
} from "react-native"

import { styles } from "./Footer.style";
import Ionicons from "react-native-vector-icons/Ionicons";


export const Footer = () => {

    const [press, setPress] = useState('home')

    return(
        <View style={styles.footerContainer}>
            <TouchableOpacity 
            onPress={ () => {
                setPress('home')
            }}
            style={styles.footerButtons}
            >
                <Ionicons name="home" style={[styles.footerIcon, {color: press == 'home'? '#FF4500' : '#ffffff'}]}></Ionicons>
            </TouchableOpacity>

            <TouchableOpacity 
            onPress={ () => {
                setPress('user')
            }}
            style={styles.footerButtons}
            >
                <Ionicons name="person"style={[styles.footerIcon, {color: press == 'user'? '#FF4500' : '#ffffff'}]}></Ionicons>
            </TouchableOpacity>
        </View>
    )
}