import React, {useEffect, useState} from "react";

import {
    View,
    SafeAreaView,
    Text,
    TouchableOpacity,
    Alert,
    FlatList
} from "react-native"

import Ionicons from "react-native-vector-icons/Ionicons";
import { CommonActions } from "@react-navigation/native";
import { Footer } from "../../components/footer/Footer";
import { styles } from "./Agendamento.style"
import { listAppointments } from "../../services/Http";
import globalVariables from "../../services/GlobalVariables";
import { Card } from "../../components/consultasCard/Card";

export function Agendamento({navigation}){
    
    
    const [appointmentsData, setAppointmentsData] = useState()

    useEffect(() => {
        listAppointments(globalVariables.userId)
                .then((res) => {
                    console.log(res.status)
                    if (res.status == 200) {     
                        setAppointmentsData(res.data) 
                        console.log(res.data)    
                    } else {
                        Alert.alert("Atenção", res.data.error)
                    }
                })
    },[])

    

    const HeaderList = () => {

        return(
            <View style = {styles.topView}>
                <TouchableOpacity
                onPress = {() => {
                    navigation.dispatch(CommonActions.goBack())
                }}
                >
                    <Ionicons name = "arrow-back-outline" style = {styles.goBackArrow}></Ionicons>
                </TouchableOpacity>
                <Text style = {styles.topText}>Consultas</Text>
                <TouchableOpacity 
                style = {styles.novaConsultaButton}
                onPress={() => {
                    newAppointment()
                }}
                >
                    <Ionicons style = {{color: '#ffffff', fontSize: 20, fontWeight: 'bold'}} name="add-outline"/>
                    <Text style = {{color: '#ffffff'}}>Nova consulta</Text>
                </TouchableOpacity>
            </View>
        )
    }

    const newAppointment = () => {

        return console.log('new appointment')
    }


    const renderItem = ({item, index}) => {
        return(
                <Card 
                name = {item.member.name}
                specialization = {item.member.specialization.name}
                date = {item.date}
                cancelable = {item.cancelable}
                past = {item.past}
                />
          )
    }


    return(
        <SafeAreaView style = {{flex: 1, backgroundColor: '#476969'}}>
            <FlatList
            ListHeaderComponent = {HeaderList}
            contentContainerStyle = {{ paddingBottom: 100 }}
            data = {appointmentsData}
            keyExtractor = {item => item.id}
            renderItem = {renderItem}
            numColumns = {1}
            />
        </SafeAreaView>
    )
}