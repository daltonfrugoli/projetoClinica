import React, { useState, useEffect } from "react";

import {
    SafeAreaView,
    View,
    TouchableOpacity,
    Text,
    ScrollView
} from "react-native";

import { styles } from "./EquipeDetails.style"
import Ionicons from "react-native-vector-icons/Ionicons";
import { CommonActions } from "@react-navigation/native";
import { Footer } from "../../components/footer/Footer"
import { getQueries } from "../../services/Http";

export function EquipeDetails({navigation, route}){


    const doctorInfo = route.params
    const startDate = new Date(doctorInfo.data.professionStartAt).getFullYear()
    const currentYear = new Date().getFullYear()
    const [experiencia, setExperiencia] = useState('-')
    const [consultas, setConsultas] = useState([])
    
    useEffect( () => {
        console.log(startDate) 

        //seção que busca infos do doutor selecionado
        getQueries(doctorInfo.data.id)
        .then((res) => {
            console.log(res.data)
            setConsultas(res.data.length)
            
                if(currentYear - startDate > 1){
                    setExperiencia(currentYear - startDate + ' anos')
                }else if(currentYear - startDate == 1){
                    setExperiencia('1 ano')
                }else{
                    setExperiencia('< 1 ano')
                }
        })

        .catch((error) => {
            console.log(error)
        })
    }, [])


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
                <Text style = {styles.topText}>{doctorInfo.data.name}</Text>
            </View>
            
            <View style = {{flex: 1}}>
                <View style = {styles.profileIconContainer}>
                    <Ionicons name = "person-circle-outline" style = {styles.profileIcon}></Ionicons>
                    <Text style = {styles.profileText}>{doctorInfo.data.name}</Text>
                </View>
                <View style = {styles.firstRowInfo}>
                    <View style = {{alignItems: 'center'}}>
                        <View style = {styles.infosContainer}>
                            <Ionicons name = "briefcase" style = {styles.infosIcon}></Ionicons>    
                        </View>
                        <Text style = {styles.infosText}>Experiência</Text>
                        <Text style = {[styles.infosText, {fontWeight: 'bold'}]}>{experiencia}</Text>
                    </View>
                    <View style = {{alignItems: 'center'}}>
                        <View style = {styles.infosContainer}>
                            <Ionicons name = "people" style = {styles.infosIcon}></Ionicons>
                        </View>
                        <Text style = {styles.infosText}>Consultas</Text>
                        <Text style = {[styles.infosText, {fontWeight: 'bold'}]}>{consultas}</Text>
                    </View>
                </View>
                <View style = {{alignItems: 'center', margin: 20}}>
                    <View style = {styles.infosContainer}>
                        <Ionicons name = "people" style = {styles.infosIcon}></Ionicons>
                    </View>
                    <Text style = {styles.infosText}>Especialidade</Text>
                    <Text style = {[styles.infosText, {fontWeight: 'bold'}]}>{doctorInfo.data.specialization.name}</Text>
                </View>
            </View>
            </ScrollView>
            <Footer pressButton = {null} disable = {true}/>
        </SafeAreaView>
    )
}