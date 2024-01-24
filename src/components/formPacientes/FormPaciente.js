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
    const password = useRef();
    const formRef = useRef(null);
    const [emailValue, SetEmailValue] = useState();
    const [passwordValue, setPasswordValue] = useState();
    const [hidePass, setHidePass] = useState(true);
    
    

    function printData(){
        props.func(emailValue, passwordValue)
        password.current.clear()
    }

    function hide(hidePassword){
        setHidePass(hidePassword)
    }


    const labelEmail = () => (
        <Text style = {{color: '#ffffff'}}>Email</Text>     
    )


    const labelPassword = () => (
        <Text style = {{color: '#ffffff'}}>Password</Text>     
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
                        <View style = { styles.inputPasswordContainer }>
                            <TextInput 
                            textColor="#ffffff"
                            underlineColor="#ffffff"
                            activeUnderlineColor="#FF4500"
                            label={labelPassword()}
                            style = { styles.inputPassword }  
                            placeholderTextColor = { 'grey' } 
                            secureTextEntry = { hidePass } 
                            ref = { password }
                            onChangeText = { (value) => {setPasswordValue(value)} }>
                            </TextInput>

                            {/*componente para ativar/desativar visibilidade da password*/}
                            <HideButton func = { (hidePassword) => hide(hidePassword) }/>
                        </View>
                    </View>
                </Form>
                <View style = { styles.buttonContainer }>
                    <TouchableOpacity 
                    style = {[ styles.upButton, {opacity: emailValue && passwordValue ? 1 : 0.5} ]} 
                    disabled = { emailValue && passwordValue ? false : true } 
                    onPress = { () => {formRef.current.submitForm()} }>
                        <Text style = { styles.upButtonText }>Entrar</Text>
                    </TouchableOpacity>
                </View> 
            </View> 
      
      
    ) 
}