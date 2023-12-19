import React from "react";

import {
    View,
    Text,
    TouchableOpacity
} from "react-native";

import { styles } from "./Card.style";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AppointmentStatus } from "../appointmentStatus/AppointmentStatus";

export const Card = (props) => {

    return (
        <View style = {styles.cardContainer}>
            <View style = {{width: '90%', alignSelf: 'center'}}>
                <View style = {styles.profile}>
                    <Ionicons style = {styles.profileIcon} name="person-circle"/>
                    <View>
                        <Text style = {{color: '#ffffff', fontSize: 16, fontWeight: 'bold'}}>{props.name}</Text>
                        <Text style = {{color: '#ffffff'}}>{props.specialization}</Text>
                    </View>
                </View>
                <View style = {styles.dateContainer}>
                    <View style = {[styles.dayHour, {width: '60%'}]}>
                        <Ionicons style = {styles.dateIcons} name="calendar"></Ionicons>
                        <Text style = {{color: '#ffffff', fontWeight: 'bold'}}>Sexta, 28 Abr </Text>
                    </View>
                    <View style = {styles.dayHour}>
                        <Ionicons style = {styles.dateIcons} name="time"/>
                        <Text style = {{color: '#ffffff', fontWeight: 'bold'}}>09:00h</Text>
                    </View>
                </View>
                <AppointmentStatus past = {props.past} cancelable = {props.cancelable}/>
            </View>
        </View>
    )
}
