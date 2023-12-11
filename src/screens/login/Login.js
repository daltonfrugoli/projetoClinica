import React, {useState} from "react";

import {
    ScrollView, 
} from 'react-native';

import { SafeAreaView } from "react-native-safe-area-context";
import { TopContainerLogin } from '../../components/topContainer/TopContainerLogin.js';
import { FormPaciente } from "../../components/formPacientes/FormPaciente.js";

export function Login({navigation}){


    const [printForm, setPrintForm] = useState('client');

    const MudarPrint = (dadoQueVemDoComponente) => {
        setPrintForm(dadoQueVemDoComponente)
    }



    return (
        <SafeAreaView style = {{ flex: 1, backgroundColor: '#2B5353D9' }}>
            <ScrollView>
                {/*componente principal de tela de login, que controla o form carregado*/}
                <TopContainerLogin func = { (dadoQueVemDoComponente) => MudarPrint(dadoQueVemDoComponente)}/>
                { printForm == 'client' ? <FormPaciente/> : null }
            </ScrollView>      
        </SafeAreaView>
    )
}