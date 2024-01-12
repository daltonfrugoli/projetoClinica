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
import ContentLoader, { Circle, Rect } from "react-content-loader/native";

export function Historico({navigation}){

    const [isLoad, setIsLoad] = useState(false)

    useEffect(() => {
        listAllAppointments()
    },[])

    const [historicData, setHistoricData] = useState();


    function listAllAppointments(){
        listAppointments(globalVariables.userId)
                .then((res) => {
                    
                    if (res.status == 200) {   
                        setTimeout(() => {
                            setHistoricData(res.data.reverse()) 
                            setIsLoad(true)
                        },1000)  
                        
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

    

    const placeHolder = () => {

        return(
        
            <View 
                style = {{
                    backgroundColor: '#2B5353', 
                    width: 320,
                    height: 162,
                    alignSelf: 'center',
                    borderRadius: 15,
                    marginBottom: 20
                }}
            >
                <ContentLoader 
                    viewBox = {`0 0 320 162`}
                    backgroundColor="#578787"
                    foregroundColor="#73D5D5"
                >
                    <Circle cx = "36" cy = "34" r = "21"/>
                    <Rect x = "79" y = "20" rx = "4" ry = "4" width = {80} height = {12}/>
                    <Rect x = "79" y = "40" rx = "4" ry = "4" width = {100} height = {12}/>
                    <Rect x = "16" y = "78" rx = "4" ry = "4" width = {102} height = {12}/>
                    <Rect x = "160" y = "78" rx = "4" ry = "4" width = {70} height = {12}/>
                    <Rect x = "16" y = "114" rx = "4" ry = "4" width = {272} height = {12}/>
                    <Rect x = "16" y = "132" rx = "4" ry = "4" width = {136} height = {12}/>
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
                ListHeaderComponent={listHeader()}
                data = {historicData}
                keyExtractor = {item => item.id}
                renderItem = {renderItem}
                numColumns={1}
            /> ) : 
            <>
            {listHeader()}
            <View style = {{flex: 1}}>
                {renderPlace()}
            </View>
            </>
            }
            <Footer/>
        </SafeAreaView>
    )
}