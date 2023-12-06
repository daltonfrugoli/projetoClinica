import React from "react";

import {
    View,
    Text,
    Image
} from 'react-native'

import { styles } from './TopContainerLogin.style'

export const TopContainerLogin = () => {
    return(
        <View style={styles.topContainer}>
            <Image 
            source={require('../assets/dentist.png')}
            style={{height: 120, width: 120, alignSelf: "center", marginTop: 55}} 
            />
            <View style={styles.topContainerOptions}>
                <View style={styles.options}>
                    <Text style={styles.optionsText}>Sou Paciente</Text>
                </View>
                <View style={styles.options}>
                    <Text style={styles.optionsText}>Clínica</Text>
                </View>
            </View>
        </View>
    )
}