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

    const weekDays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado']
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
    var today = new Date(props.date)

    function attList(){
        props.updateList()
    }
    

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
                    <View style = {[styles.dayHour, {width: '55%'}]}>
                        <Ionicons style = {styles.dateIcons} name="calendar"></Ionicons>
                        <Text style = {{color: '#ffffff', fontWeight: 'bold'}}>{weekDays[today.getDay()]}, {today.getDate()} {months[today.getMonth()]} </Text>
                    </View>
                    <View style = {styles.dayHour}>
                        <Ionicons style = {styles.dateIcons} name="time"/>
                        <Text style = {{color: '#ffffff', fontWeight: 'bold'}}>{today.toLocaleTimeString("pt-BR").slice(0,5)}h</Text>
                    </View>
                </View>
                <AppointmentStatus past = {props.past} cancelable = {props.cancelable} date = {props.date} id = {props.id} updateList = {() => attList()} />
            </View>
        </View>
    )
}
