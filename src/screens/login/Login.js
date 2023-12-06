import React from "react";

import {
    View,
    Text,
    ScrollView,
    TouchableOpacity
} from 'react-native'

import { styles } from './Login.style.ts'
import { SafeAreaView } from "react-native-safe-area-context";
import { TopContainerLogin } from '../../components/TopContainerLogin.js'

export function Login({navigation}){
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#2B5353D9'}}>
            <ScrollView>
                <TopContainerLogin/>
            </ScrollView>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.upButton}>
                    <Text style={styles.upButtonText}>Entrar</Text>
                </TouchableOpacity>
            </View>
            
        </SafeAreaView>
    )
}