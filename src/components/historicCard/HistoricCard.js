import React from "react";

import {
    View,
    Text,
    TouchableOpacity
} from "react-native"

import { styles } from "./HistoricCard.style"
import Ionicons from "react-native-vector-icons/Ionicons";

export const HistoricCard = (props) => {

//style = {{flexDirection: 'row', alignItems: 'center'}}

    var today = new Date(props.date)
    var horario = today.toLocaleString("pt-BR", {timeZone: "America/Sao_Paulo"}).slice(11,16)

    return(
        
        <View style = {styles.cardContainer}>
            <View style = {styles.cardMargin}>
                <View style = {styles.topLine}>
                    <Ionicons style = {styles.topIcon} name = "person-circle-outline"/>
                    <View style = {{marginLeft: 15}}>
                        <Text style = {styles.topName}>{props.name}</Text>
                        <Text style = {{color: '#ffffff'}}>{props.specialization}</Text>
                    </View>
                </View>
                <View style = {styles.midLine}>
                    <View style = {[styles.midLineContainers]}>
                        <Ionicons style = {styles.midIcons} name="calendar"/>
                        <Text style = {styles.midText}>{today.getDate()}/{today.toJSON().slice(5,7)}/{today.getFullYear()}</Text>
                    </View>
                    <View style = {styles.midLineContainers}>
                        <Ionicons style = {styles.midIcons} name="time"/>
                        <Text style = {styles.midText}>{horario}h</Text>
                    </View>
                </View>
                <View style = {{flexDirection: 'row'}}>
                    <Ionicons style = {styles.bottomIcon} name="location"/>
                    <Text style = {styles.bottomText}>Rua exemplo de endereço, 123. Bairro um. Estado, País</Text>
                </View>
            </View>
        </View>
       
        
    )
}