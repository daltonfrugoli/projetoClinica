import React, { useState } from "react";

import {
    View,
    Image,
    TouchableOpacity,
    Text
} from 'react-native';

import { styles } from './TopContainerLogin.style';

export const TopContainerLogin = (props) => {

    const [menuSelected, setMenuSelected] = useState(true);

    const ChargeForm = (userType) => {
        props.func(userType)
    }

    return (

        <View>
            <View style = { styles.topContainer }>
                <Image 
                source = { require('../../assets/images/dentist.png') }
                style = { styles.image } 
                />
            </View>
            
            <View style = { styles.topContainerOptions }>
                <TouchableOpacity
                onPress = { () => {
                    setMenuSelected(true),
                    ChargeForm('client')
                }}
                style = {[ styles.options, {borderBottomColor: menuSelected == true ? '#FF4500' : null, borderBottomWidth: menuSelected == true ? 3 : null} ]}>
                    <Text style = { styles.optionsText }>Sou Paciente</Text>
                </TouchableOpacity>
                <TouchableOpacity
                onPress = { () => {
                    setMenuSelected(false),
                    ChargeForm('provider')
                }}
                style = {[ styles.options, {borderBottomColor: menuSelected == false ? '#FF4500' : null, borderBottomWidth: menuSelected == false ? 3 : null} ]}>
                    <Text style = { styles.optionsText }>Clínica</Text>
                </TouchableOpacity>
            </View>
        </View>
    )

}