import React, {useState} from "react";

import {
    ScrollView, 
    Alert
} from 'react-native';

import { SafeAreaView } from "react-native-safe-area-context";
import { TopContainerLogin } from '../../components/topContainer/TopContainerLogin.js';
import { FormPaciente } from "../../components/formPacientes/FormPaciente.js";
import { signIn }  from "../../services/Http.js" 
import Spinner from "react-native-loading-spinner-overlay";

export function Login({navigation}){


    const [printForm, setPrintForm] = useState('client');
    const [spinnerVisible, setSpinnerVisible] = useState(false);

    const mudarPrint = (dadoQueVemDoComponente) => {
        setPrintForm(dadoQueVemDoComponente)
    }

    const submitData = (email, senha) => {

        setSpinnerVisible(true)
        console.log(email, senha)
        signIn(email, senha)
        .then((res) => {
            //200, 400, 401
            console.log(res.status);
            console.log(res.data)
            setTimeout(() => {
                setSpinnerVisible(false)

                if (res.status != 200){
                    Alert.alert('Atenção!', res.data.error)
                }else{
                    Alert.alert('Login bem sucedido!', res.data.token)
                }
            }, 1000)
            
        })
        .catch((error) => {
            console.log(error);
            Alert.alert('Atenção!', 'Ocorreu um erro inesperado, por favor tente novamente mais tarde!')
        })
    }



    return (
        <SafeAreaView style = {{ flex: 1, backgroundColor: '#2B5353D9' }}>
            <ScrollView>
                {/*componente principal de tela de login, que controla o form carregado*/}
                <TopContainerLogin func = { (dadoQueVemDoComponente) => mudarPrint(dadoQueVemDoComponente)}/>
                { printForm == 'client' ? <FormPaciente func = {(email, senha) => submitData(email, senha)}/> : null }
            </ScrollView> 

            <Spinner visible={spinnerVisible}/>     
        </SafeAreaView>
    )
}