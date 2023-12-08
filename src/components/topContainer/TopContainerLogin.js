import React, { useState } from "react";

import {
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';

import { styles } from './TopContainerLogin.style';
import { FormPaciente } from '../formPacientes/FormPaciente.js';

export const TopContainerLogin = () => {

    const [menuSelected, setMenuSelected] = useState(true)

    return(
        <View>
            <View style = { styles.topContainer }>
                <Image 
                source = { require('../../assets/images/dentist.png') }
                style = { styles.image } 
                />

                {/*Opções que o usuário deve selecionar para efetuar login */}
                <View style = { styles.topContainerOptions }>
                    <TouchableOpacity
                    onPress = { () => setMenuSelected(true) }
                    style = {[ styles.options, {borderBottomColor: menuSelected == true ? '#FF4500' : null, borderBottomWidth: menuSelected == true ? 3 : null} ]}>
                        <Text style = { styles.optionsText }>Sou Paciente</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress = { () => setMenuSelected(false) }
                    style = {[ styles.options, {borderBottomColor: menuSelected == false ? '#FF4500' : null, borderBottomWidth: menuSelected == false ? 3 : null} ]}>
                        <Text style = { styles.optionsText }>Clínica</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/*formulário carregado para pacientes*/}
            <View>
                { menuSelected == true ? <FormPaciente/> : null }
            </View>
        </View>
    )

}


