import React, { useState, useEffect }from "react";

import {
    View,
    SafeAreaView,
    Text,
    TouchableOpacity,
    FlatList
} from "react-native";

import { styles } from "./Historico.style";
import { Footer } from "../../components/footer/Footer";
import Ionicons from "react-native-vector-icons/Ionicons";
import { CommonActions } from "@react-navigation/native";
import { HistoricCard } from "../../components/historicCard/HistoricCard";
import { listAppointments } from "../../services/Http";
import globalVariables from "../../services/GlobalVariables";

export function Historico({navigation}){


    useEffect(() => {
        listAllAppointments()
    },[])


    const [historicData, setHistoricData] = useState();


    function listAllAppointments(){
        listAppointments(globalVariables.userId)
                .then((res) => {
                    
                    if (res.status == 200) {     
                        setHistoricData(res.data.reverse()) 
                    } else {
                        Alert.alert("Atenção", res.data.error)
                    }
                })
    }
      

    const listHeader = () => (

        <View style = {styles.topView}>
                <TouchableOpacity
                onPress = {() => {
                    navigation.dispatch(CommonActions.goBack())
                }}
                >
                    <Ionicons name = "arrow-back-outline" style = {styles.goBackArrow}></Ionicons>
                </TouchableOpacity>
                <Text style = {styles.topText}>Historico de consultas</Text>
        </View>

    )


    const renderItem = ({item, index}) => {

        return(
            <HistoricCard
                name = {item.member.name}
                specialization = {item.member.specialization.name}
                date = {item.date}
                contentContainerStyle = {{ paddingBottom: 100 }}
            />
        )
    }


    return(
        <SafeAreaView style = {{flex: 1, backgroundColor: '#476969'}}>
            <FlatList
                ListHeaderComponent = {listHeader()}
                data = {historicData}
                keyExtractor = {item => item.id}
                renderItem = {renderItem}
                numColumns={1}
            />

            
            <Footer/>
        </SafeAreaView>
    )
}