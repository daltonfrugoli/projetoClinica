import React, { useState, useRef } from "react";

import {
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import { Form } from "@unform/mobile";
import { styles } from "./FormPaciente.style";
import { HideButton } from "../hidebutton/HideButton";
import { TextInput } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";

export const FormPaciente = (props) => {

    const email = useRef();
    const senha = useRef();
    const formRef = useRef(null);
    const [emailValue, SetEmailValue] = useState();
    const [senhaValue, setSenhaValue] = useState();
    const [hidePass, setHidePass] = useState(true);
    
    

    function printData(){
        props.func(emailValue, senhaValue)
        senha.current.clear()
    }

    function esconder(esconderSenha){
        setHidePass(esconderSenha)
    }


    const labelEmail = () => (
        <Text style = {{color: '#ffffff'}}>Email</Text>     
    )


    const labelSenha = () => (
        <Text style = {{color: '#ffffff'}}>Senha</Text>     
    )

    return(
            
            <View>
                <Form ref = { formRef } onSubmit = { printData }>
                    <View style = { styles.formContainer }>
                        <TextInput 
                        textColor="#ffffff"
                        underlineColor="#ffffff"
                        activeUnderlineColor="#FF4500"
                        label={labelEmail()}
                        autoCapitalize = "none"
                        style = { styles.inputEmail } 
                        placeholderTextColor = { 'grey' } 
                        returnKeyType = "next" 
                        ref = { email }
                        onChangeText = { (value) => {SetEmailValue(value)} }>
                        </TextInput>
                        <View style = { styles.inputSenhaContainer }>
                            <TextInput 
                            textColor="#ffffff"
                            underlineColor="#ffffff"
                            activeUnderlineColor="#FF4500"
                            label={labelSenha()}
                            style = { styles.inputSenha }  
                            placeholderTextColor = { 'grey' } 
                            secureTextEntry = { hidePass } 
                            ref = { senha }
                            onChangeText = { (value) => {setSenhaValue(value)} }>
                            </TextInput>

                            {/*componente para ativar/desativar visibilidade da senha*/}
                            <HideButton func = { (esconderSenha) => esconder(esconderSenha) }/>
                        </View>
                    </View>
                </Form>
                <View style = { styles.buttonContainer }>
                    <TouchableOpacity 
                    style = {[ styles.upButton, {opacity: emailValue && senhaValue ? 1 : 0.5} ]} 
                    disabled = { emailValue && senhaValue ? false : true } 
                    onPress = { () => {formRef.current.submitForm()} }>
                        <Text style = { styles.upButtonText }>Entrar</Text>
                    </TouchableOpacity>
                </View> 
            </View> 
      
      
    ) 
}