import React from "react";

import {
    View,
    Text,
    TouchableOpacity
} from "react-native";

import { styles } from "./AppointmentStatus.style"

export const AppointmentStatus = (props) => {


    const alterar = () => {
        var date = new Date()
        console.log(date.toLocaleDateString())
    }

    const cancelar = () => {
        console.log('cancelar consulta')
    }

    if (props.past == true) {
        return(
            <Text style = {{color: '#2DD36F', alignSelf: 'center', fontSize: 18, marginVertical: 10}}>consulta finalizada</Text>
        )
    } else {
        return(
            <View style = {{flexDirection: 'row', justifyContent: 'space-between',
            marginTop: 10}}>
                <TouchableOpacity 
                style = {[styles.appointmentsCancelButton, {opacity: props.cancelable == true ? 1 : 0.5}]}
                disabled = {props.cancelable == true ? false : true}
                onPress={() => {
                    cancelar()
                }}
                >
                    <Text style = {{color: 'white'}}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                style = {styles.appointmentsChangeButton}
                onPress={() => {
                    alterar()
                }}
                >
                    <Text style = {{color: 'white'}}>Alterar</Text>
                </TouchableOpacity>
            </View>
        )
    }
    
}