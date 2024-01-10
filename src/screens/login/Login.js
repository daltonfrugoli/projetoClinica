import React, { useState, useEffect} from "react";

import {
    ScrollView, 
    Alert
} from 'react-native';

import { SafeAreaView } from "react-native-safe-area-context";
import { TopContainerLogin } from '../../components/topContainer/TopContainerLogin.js';
import { FormPaciente } from "../../components/formPacientes/FormPaciente.js";
import { signIn }  from "../../services/Http.js" 
import Spinner from "react-native-loading-spinner-overlay";
import { db } from "../../App.js";
import globalVariables from "../../services/GlobalVariables";

 


export function Login({navigation}){

    const [printForm, setPrintForm] = useState('client');
    const [spinnerVisible, setSpinnerVisible] = useState(false);

    useEffect(() => {
        db.transaction((qr) => {
            qr.executeSql(
                "SELECT email, senha FROM users order by lastLoggedIn desc",
                [],
                (_, results) => {
                    submitData(results.rows.raw()[0].email, results.rows.raw()[0].senha)
                }
            )
        })
    },[])

    const mudarPrint = (dadoQueVemDoComponente) => {
        setPrintForm(dadoQueVemDoComponente)
    }

    const submitData = (email, senha) => {

        setSpinnerVisible(true)
        console.log(email, senha)
        signIn(email, senha)
        .then((res) => {
            //200, 400, 401
            setTimeout(() => {
                if (res.status != 200){
                    setSpinnerVisible(false)
                    Alert.alert('Atenção!', res.data.error)
                    console.log(res)
                }else{
                    //Alert.alert('Login bem sucedido!', res.data.token)
                    setSpinnerVisible(false)
                    console.log(res.data.user.id)
                    db.transaction((qr) => {
                        qr.executeSql(
                            "SELECT * FROM users WHERE userId = ?",
                            [res.data.user.id],
                            (qr2, results) => { console.log(results.rows.raw())
                                //Aqui falta converter o objeto "res.data.user" para string antes de salvar no SQLite
                                if(results.rows.length > 0){
                                    qr2.executeSql(
                                        "UPDATE users SET email = ?, senha = ?, user = ?, token = ?, userId = ?, lastLoggedIn = ? WHERE userId = ?",
                                        [email, senha, JSON.stringify(res.data.user), res.data.token, res.data.user.id, new Date().toString(), res.data.user.id]
                                    )

                                } else {

                                    qr2.executeSql(
                                        "INSERT INTO users (email, senha, user, token, userId, lastLoggedIn) VALUES (?, ?, ?, ?, ?, ?)",
                                        [email, senha, JSON.stringify(res.data.user), res.data.token, res.data.user.id, new Date().toString()]
                                    )
                                   } 
                                setTimeout(() => {
                                    // Passar os dados de usuário para tela de Menu
                                    
                                    globalVariables.userId = res.data.user.id
                                    navigation.navigate("Menu", {dataUser: res.data.user})
                                }, 500)
                            setSpinnerVisible(false)
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

            <Spinner visible = {spinnerVisible}/>     
        </SafeAreaView>
    )
}