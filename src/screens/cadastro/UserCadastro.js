import React, { useState, useRef, useEffect } from "react";

import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Alert
} from "react-native";

import { Form } from "@unform/mobile";
import { styles } from "./UserCadastro.style";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Footer } from "../../components/footer/Footer";
import { CommonActions, useIsFocused } from "@react-navigation/native";
import { db } from "../../App";
import Spinner from "react-native-loading-spinner-overlay";
import { updateUser } from "../../services/Http";
import globalVariables from "../../services/GlobalVariables";

export function UserCadastro({navigation}){

    
    const [nomeAtual, setNomeAtual] = useState()
    const [emailAtual, setEmailAtual] = useState()
    const [nomeCompleto, setNomeCompleto] = useState()
    const [email, setEmail] = useState()
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [newPasswordConf, setNewPasswordConf] = useState("")
    const formRef = useRef(null)
    const [spinnerVisible, setSpinnerVisible] = useState(false)
    

    useEffect(() => {
            db.transaction((qr) => {
            qr.executeSql(
                "SELECT * FROM users WHERE userId = ?",
                [globalVariables.userId],
                (qr2, results) => {
                    var res = JSON.parse(results.rows.raw()[0].user)
                    setNomeCompleto(res.name)
                    setEmail(res.email)
                    setEmailAtual(res.email)
                    setNomeAtual(res.name)
                }
            )
        })
    }, [])

    const validationAlert = (titulo, texto) => Alert.alert(titulo, texto) 

    


    function saveData(infos){

        if(nomeAtual == nomeCompleto && emailAtual == email && !currentPassword && !newPassword && !newPasswordConf){
            return validationAlert("Atenção", "Nenhuma alteração detectada!")
        }
        if((!newPassword || !newPasswordConf) && currentPassword.length > 0){
            return validationAlert("Atenção", 'Preencha corretamente os campos: \"Nova password\" e \"Confirmar nova password\"')
        }
        if((newPassword.length > 0 && newPasswordConf.length > 0) && !currentPassword){
            return validationAlert("Atenção", "Você deve informar sua password atual para validação das alterações")
        }
        if(newPassword != newPasswordConf){
            return validationAlert("Atenção", '\"Nova password\" e \"Confirmar nova password\" não coincidem')
        }
        if((newPassword.length < 6 && newPasswordConf.length < 6 ) && currentPassword.length > 0){
            return validationAlert("Atenção", "Sua nova password deve conter no mínimo 6 caracteres")
        }



        setSpinnerVisible(true)
        
            

        infos.name = nomeCompleto
        infos.email = email
        infos.currentPassword = currentPassword
        infos.newPassword = newPassword
        infos.newPasswordConf = newPasswordConf

        updateUser(infos)
        .then((res) => {
            setSpinnerVisible(false)
            if(res.status == 200){
                Alert.alert(
                    "Atenção",
                    "Alteração bem-sucedida",
                    [
                        {
                            text: 'ok',
                            onPress: () => {
                                var obj = {
                                    id: globalVariables.userId,
                                    name: nomeCompleto,
                                    email: email 
                                }

                                db.transaction((qr) => {
                                    qr.executeSql(
                                        
                                        "UPDATE users SET user = ?, email = ?, password = ? WHERE userId = ?",
                                        [JSON.stringify(obj), email, newPassword, globalVariables.userId]
                                    ), []
                                })

                                navigation.navigate("Menu", {dataUser: obj} )
                            }
                        }
                    ]
                )


            }else{
                validationAlert("Atenção!", res.data.error)
            }
        })
        .catch((error) => {
            setSpinnerVisible(false)
            validationAlert("Atenção", "Algo deu errado. tente novamente mais tarde!")
        })
 
    }


    return(
        <SafeAreaView style = {{flex: 1, backgroundColor: '#476969'}}>
        <ScrollView>
            <View style = {styles.topView}>
                <TouchableOpacity
                onPress = {() => {
                    navigation.dispatch(CommonActions.goBack())
                }}
                >
                    <Ionicons name = "arrow-back-outline" style = {styles.goBackArrow}></Ionicons>
                </TouchableOpacity>
                <Text style = {styles.topText}>Perfil</Text>
            </View>
            <View style = {styles.formContainer}>
                <Form ref={ formRef } onSubmit={ saveData }>
                    <Text style = {styles.textInputs}>Nome completo</Text>
                    <TextInput 
                    style = {styles.inputEmail}
                    onChangeText={setNomeCompleto}
                    value={nomeCompleto}
                    placeholder="Ex.: Paciente 1"
                    placeholderTextColor={"grey"}
                    returnKeyType="next"
                    />
                    <Text style = {styles.textInputs}>Email</Text>
                    <TextInput 
                    style = {styles.inputEmail}
                    onChangeText={setEmail}
                    value={email}
                    placeholder="Ex.: paciente1@email.com"
                    placeholderTextColor={"grey"}
                    returnKeyType="next"
                    autoCapitalize="none"
                    />
                    <Text style = {styles.textInputs}>Password atual</Text>
                    <TextInput 
                    style = {styles.inputEmail}
                    onChangeText = {setCurrentPassword}
                    value = {currentPassword}
                    secureTextEntry = {true}
                    autoCapitalize = "none"
                    />
                    <Text style = {styles.textInputs}>Nova password</Text>
                    <TextInput 
                    style = {styles.inputEmail}
                    onChangeText={setNewPassword}
                    value={newPassword}
                    returnKeyType="next"
                    secureTextEntry = {true}
                    autoCapitalize="none"
                    />
                    <Text style = {styles.textInputs}>Confirmar nova password</Text>
                    <TextInput 
                    style = {styles.inputEmail}
                    onChangeText={setNewPasswordConf}
                    value={newPasswordConf}
                    secureTextEntry = {true}
                    autoCapitalize="none"
                    />
                </Form>
            <View style = {{marginTop: 30, marginBottom: 15}}>
                <TouchableOpacity 
                style = {styles.upButton} 
                onPress={() => {
                    formRef.current.submitForm()
                }}
                >
                    <Text style = { styles.upButtonText }>Salvar alterações</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                style = {styles.exitButton}
                onPress={() => {
                    Alert.alert("Atenção", "deseja encerrar o aplicativo?",
                    [
                        {
                            text: 'cancelar'
                        },
                        {
                            text: 'sair',
                            onPress: () => {
                                db.transaction((qr) => {
                                    qr.executeSql(
                                        "DELETE FROM users where userId = ?",
                                        [globalVariables.userId]
                                    ), []
                                })

                                navigation.navigate("Login")
                            }
                        }
                    ])
                }}
                >
                    <Text style = { styles.upButtonText }>Sair da conta</Text>
                </TouchableOpacity>
            </View> 
            </View>
            
        </ScrollView>
        <Footer pressButton = {'user'}/>
        <Spinner visible = {spinnerVisible}/>
        </SafeAreaView>
        
    )

    
}

