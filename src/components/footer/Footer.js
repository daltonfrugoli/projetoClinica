import React, { useState } from "react";

import {
    View,
    TouchableOpacity,
    Text
} from "react-native"

import { styles } from "./Footer.style"

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
                <Text style={[styles.footerIcon, {color: press == 'home'? '#FF4500' : '#ffffff'}]}>HOME</Text>
            </TouchableOpacity>

            <TouchableOpacity 
            onPress={ () => {
                setPress('user')
            }}
            style={styles.footerButtons}
            >
                <Text style={[styles.footerIcon, {color: press == 'user'? '#FF4500' : '#ffffff'}]}>USER</Text>
            </TouchableOpacity>
        </View>
    )
}