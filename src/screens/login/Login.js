import React, { useRef } from "react";

import {
    View,
    Text,
    ScrollView,
    TouchableOpacity
} from 'react-native'

import { SafeAreaView } from "react-native-safe-area-context";
import { TopContainerLogin } from '../../components/TopContainerLogin.js'
import { FormPaciente } from '../../components/FormPaciente.js'

export function Login({navigation}){
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#2B5353D9'}}>
            <ScrollView>
                <TopContainerLogin/>
                <FormPaciente/>
            </ScrollView>      
        </SafeAreaView>
    )
}