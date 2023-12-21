import React from "react";

import {
    TouchableOpacity,
    Text,
} from "react-native"

import { styles } from "./Card.style"
import Ionicons from "react-native-vector-icons/Ionicons";

export const Card = (props) => {
    

    return(
        <TouchableOpacity
        style = {[styles.buttonMenu, {backgroundColor: props.color == props.id ? 'red' : '#2B5353'}]}
        onPress={() => {
            props.selected(props.id) 
        }}
        >
            <Ionicons name = {"person-circle"} style = {{fontSize: 55, marginBottom: 10, color: '#ffffff', marginHorizontal: 10}}/>
            <Text style = {styles.buttonNames}> {props.name} </Text>
        </TouchableOpacity>
    )
}