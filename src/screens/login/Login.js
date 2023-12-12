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
import SQLite from "react-native-sqlite-storage";


const db = SQLite.openDatabase({name: 'app.db', createFromLocation: 2 }, () => {}, error => {console.log(error)}); 


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
                

                if (res.status != 200){
                    setSpinnerVisible(false)
                    Alert.alert('Atenção!', res.data.error)
                }else{
                    //Alert.alert('Login bem sucedido!', res.data.token)
                    setSpinnerVisible(false)
                    db.transaction((qr) => {
                        console.log(qr)
                        qr.executeSql(
                            "SELECT * FROM users",
                            [],
                            (qr2, results) => {
                               /* if(results.rows.length > 0){
                                    qr2.executeSql(
                                        "UPDATE users SET email = ?, senha = ?, user = ?, token = ?",
                                        [email, senha, res.data.user, res.data.token]
                                    )

                                } else {

                                    qr2.executeSql(
                                        "INSERT INTO users (email, senha, user, token) VALUES (?, ?, ?, ?)",
                                        [email, senha, res.data.user, res.data.token]
                                    )
                                }
                                setTimeout(() => {
                                    setSpinnerVisible(false)
                                    navigation.navigate("Menu")
                                }, 500)*/
                                console.log(results)
                            }
                        )
                    }); 
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