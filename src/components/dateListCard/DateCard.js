import React, { useState } from "react";

import {
    TouchableOpacity,
    Text
} from "react-native";

import { styles } from "./DateCard.style"

export const DateCard = (props) => {

    const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']
    const appointmentDate = new Date(props.date)
    
    

    return(
        <TouchableOpacity
        style = {[styles.buttonMenu, {backgroundColor: props.color == props.id ? 'red' : '#2B5353'}]}
        onPress={() => {
            props.selected(props.id, appointmentDate)
        }}
        >
            <Text style = {[styles.buttonNames, {fontWeight: 'bold'}]}>{appointmentDate.getDate()}/{appointmentDate.getMonth()}</Text>
            <Text style = {styles.buttonNames}> {weekDays[appointmentDate.getDay()]} </Text>
        </TouchableOpacity>
    )
}