import React, { useRef } from "react";

import {
    ScrollView, 
} from 'react-native';

import { SafeAreaView } from "react-native-safe-area-context";
import { TopContainerLogin } from '../../components/topContainer/TopContainerLogin.js';

export function Login({navigation}){
    return (
        <SafeAreaView style = {{ flex: 1, backgroundColor: '#2B5353D9' }}>
            <ScrollView>
                {/*componente principal de tela de login, que controla o form carregado*/}
                <TopContainerLogin/>
            </ScrollView>      
        </SafeAreaView>
    )
}