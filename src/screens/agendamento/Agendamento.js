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
import Spinner from "react-native-loading-spinner-overlay";




export function Agendamento({navigation}){
    
    
    const [appointmentsData, setAppointmentsData] = useState([])
    const [spinnerIsVisible, setSpinnerIsVisible] = useState(false)
     

    useEffect(() => {
        listAllAppointments()
    },[])

    function listAllAppointments(){
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
    }

    

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

    function attList(){
        setAppointmentsData([])
        setSpinnerIsVisible(true)
        setTimeout(() => {
            listAllAppointments()
            setSpinnerIsVisible(false)
        }, 3000)
        
    }


    const renderItem = ({item, index}) => {
        return(
                <Card 
                name = {item.member.name}
                specialization = {item.member.specialization.name}
                date = {item.date}
                cancelable = {item.cancelable}
                past = {item.past}
                id = {item.id}
                updateList = {() => attList()}
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
            //extraData={appointmentsData}
            />
            <Spinner visible = {spinnerIsVisible}/>
        </SafeAreaView>
    )
}