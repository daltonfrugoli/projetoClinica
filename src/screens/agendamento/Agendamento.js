import React, {useEffect, useState} from "react";

import {
    View,
    SafeAreaView,
    Text,
    TouchableOpacity,
    Alert,
    FlatList,
} from "react-native"

import Ionicons from "react-native-vector-icons/Ionicons";
import { CommonActions, useIsFocused } from "@react-navigation/native";
import { Footer } from "../../components/footer/Footer";
import { styles } from "./Agendamento.style"
import { listAppointments } from "../../services/Http";
import globalVariables from "../../services/GlobalVariables";
import { Card } from "../../components/consultasCard/Card";
import Spinner from "react-native-loading-spinner-overlay";
import ContentLoader, { Circle, Rect } from "react-content-loader/native";





export function Agendamento({navigation}){
    
    
    const [appointmentsData, setAppointmentsData] = useState([])
    const [spinnerIsVisible, setSpinnerIsVisible] = useState(false)
    const isFocused = useIsFocused()
    const [isLoad, setIsLoad] = useState(false)
    

    useEffect(() => {
        if(isFocused){
        listAllAppointments()
        }
    },[isFocused])

    function listAllAppointments(){
        listAppointments(globalVariables.userId)
                .then((res) => {
                    
                    if (res.status == 200) {     
                        setAppointmentsData(res.data.reverse()) 
                        setTimeout(() => {
                            setIsLoad(true)
                        }, 1000)
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
        navigation.navigate("NewAppointment")
    }

    function attList(){
        setAppointmentsData([])
        setIsLoad(false)
        setTimeout(() => {
            listAllAppointments()
            setIsLoad(true)
        }, 3000)   
    }


    const renderItem = ({item, index}) => {
        return(
                <Card 
                name = {item.member.name}
                memberId = {item.member.id}
                specialization = {item.member.specialization.name}
                date = {item.date}
                cancelable = {item.cancelable}
                past = {item.past}
                id = {item.id}
                updateList = {() => attList()}
                />
          )
    }


    const placeHolder = () => {

        return(
        
            <View 
                style = {{
                    backgroundColor: '#2B5353', 
                    width: 320,
                    height: 182,
                    alignSelf: 'center',
                    borderRadius: 15,
                    marginBottom: 20
                }}
            >
                <ContentLoader 
                    viewBox = {`0 0 320 182`}
                    backgroundColor="#578787"
                    foregroundColor="#73D5D5"
                >
                    <Circle cx = "36" cy = "34" r = "21"/>
                    <Rect x = "75" y = "20" rx = "4" ry = "4" width = {80} height = {12}/>
                    <Rect x = "75" y = "40" rx = "4" ry = "4" width = {100} height = {12}/>
                    <Rect x = "16" y = "87" rx = "4" ry = "4" width = {102} height = {12}/>
                    <Rect x = "198" y = "87" rx = "4" ry = "4" width = {102} height = {12}/>
                    <Rect x = "16" y = "144" rx = "4" ry = "4" width = {286} height = {12}/>
                </ContentLoader>
            </View>
                
        )
    }



    const renderPlace = () => {

        return(
            <View>
                <View>
                    {placeHolder()}
                </View>
                <View>
                    {placeHolder()}
                </View>
                <View>
                    {placeHolder()}
                </View>
                <View>
                    {placeHolder()}
                </View>
            </View>
        )
    }


   


    return(
        <SafeAreaView style = {{flex: 1, backgroundColor: '#476969'}}>
            
            {isLoad ? (
            <FlatList
            ListHeaderComponent={HeaderList()}
            contentContainerStyle = {{ paddingBottom: 100 }}
            data = {appointmentsData}
            keyExtractor = {item => item.id}
            renderItem = {renderItem}
            numColumns = {1}    
            />) : 
            <>
            {HeaderList()}
            <View style = {{flex: 1}}>
                {renderPlace()}
            </View> 
            </>
            }
            <Footer/>
        </SafeAreaView>
    )
}