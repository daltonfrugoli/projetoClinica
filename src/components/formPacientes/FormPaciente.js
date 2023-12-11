import React, { useState, useRef } from "react";

import {
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

import { Form } from "@unform/mobile";
import { styles } from "./FormPaciente.style";
import { HideButton } from "../hidebutton/HideButton";

export const FormPaciente = () => {

    const email = useRef();
    const senha = useRef();
    const formRef = useRef(null);
    const [emailValue, SetEmailValue] = useState();
    const [senhaValue, setSenhaValue] = useState();
    const [hidePass, setHidePass] = useState(true);
    
    

    function printData(){
        console.log(emailValue, senhaValue);
    }

    function esconder(esconderSenha){
        setHidePass(esconderSenha)
    }


    return(
            
            <View>
                <Form ref = { formRef } onSubmit = { printData }>
                    <View style = { styles.formContainer }>
                        <Text style = { styles.textInputs }>Email</Text>
                        <TextInput 
                        style = { styles.inputEmail } 
                        placeholder = "Digite seu email" 
                        placeholderTextColor = { 'grey' } 
                        returnKeyType = "next" 
                        ref = { email }
                        onChangeText = { (value) => {SetEmailValue(value)} }>
                        </TextInput>
                        <Text style = { styles.textInputs }>Senha</Text>
                        <View style = { styles.inputSenhaContainer }>
                            <TextInput 
                            style = { styles.inputSenha } 
                            placeholder = "Digite sua senha" 
                            placeholderTextColor = { 'grey' } 
                            secureTextEntry = { hidePass } 
                            ref = { senha }
                            onChangeText = { (value) => {setSenhaValue(value)} }>
                            </TextInput>

                            {/*componente para ativar/desativar visibilidade da senha*/}
                            <HideButton func={ (esconderSenha) => esconder(esconderSenha) }/>
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