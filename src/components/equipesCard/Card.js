import React, { useState } from "react";

import {
    TouchableOpacity,
    Text,
} from "react-native"

import { useNavigation } from "@react-navigation/native";
import { styles } from "./Card.style"
import Ionicons from "react-native-vector-icons/Ionicons";

export const Card = (props) => {


    const navigation = useNavigation()


    return(
        <TouchableOpacity
        style = {styles.buttonMenu}
        onPress={() => {
            navigation.navigate("EquipeDetails", {data: props.data})
        }}
        >
            <Ionicons name = {"person"} style = {{fontSize: 80, marginBottom: 10, color: '#ffffff'}}></Ionicons>
            <Text style = {styles.buttonNames}> {props.name} </Text>
        </TouchableOpacity>
    )
}