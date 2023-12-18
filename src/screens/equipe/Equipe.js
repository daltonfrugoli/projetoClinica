import React, { useState, useEffect } from "react";

import {
    SafeAreaView,
    View,
    TouchableOpacity,
    Text,
    Alert,
    FlatList
} from "react-native";

import { styles } from "./Equipe.style";
import { CommonActions } from "@react-navigation/native";
import { Footer } from "../../components/footer/Footer";
import Ionicons from "react-native-vector-icons/Ionicons";
import { getMembers } from "../../services/Http";
import { Card } from "../../components/equipesCard/Card"


export function Equipe({navigation}){


    //esta seção busca informações de membros no DB
    useEffect(() => {
        getMembers()
        .then((res) => {
            setEquipe(res.data)
            console.log(res.data)
        })

        .catch((error) => {
            Alert.alert('Atenção!', error.error)
        })
    }, [])

    const [equipe, setEquipe] = useState()

    const renderItem = ({item, index}) => {
        return(
                <Card name = {item.name} data = {item}/> 
          )
    }

    const HeaderList = () => {

        return(
            <View>
                <View style = {styles.topView}>
                    <TouchableOpacity 
                    onPress = {() => {
                        navigation.dispatch(CommonActions.goBack())
                    }}
                    >
                        <Ionicons name = "arrow-back-outline" style = {styles.goBackArrow}></Ionicons>  
                    </TouchableOpacity>
                    <Text style = {styles.topText}>Equipe de Profissionais</Text>
                </View>
                
                <View style = {styles.descTextContainer}>
                    <Text style = {styles.descText}>
                        Conheça o nosso time de profissionais
                        que vão te proporcionar a melhor
                        experiência odontológica possível!
                    </Text>
                </View>
            </View>
        )
    }

    return(
        <SafeAreaView style = {{backgroundColor: '#476969', flex: 1}}>
            <FlatList 
                ListHeaderComponent = {HeaderList}
                contentContainerStyle = {{ paddingBottom: 100 }}
                data = {equipe}
                keyExtractor = {item => item.id}
                renderItem = {renderItem}
                numColumns = {2}
                columnWrapperStyle = {{ flexWrap: 'wrap', justifyContent: 'space-evenly'}}
            />
            <Footer pressButton = {null}/>
        </SafeAreaView>
    )
}