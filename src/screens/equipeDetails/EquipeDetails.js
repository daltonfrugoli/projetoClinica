import React, { useState, useEffect } from "react";

import {
    SafeAreaView,
    View,
    TouchableOpacity,
    Text
} from "react-native";

import { styles } from "./EquipeDetails.style"
import Ionicons from "react-native-vector-icons/Ionicons";
import { CommonActions } from "@react-navigation/native";
import { Footer } from "../../components/footer/Footer"

export function EquipeDetails({navigation, route}){


    const doctorInfo = route.params

    useEffect( () => {
        console.log(doctorInfo)
    }, [])


    return(
        <SafeAreaView style={{flex: 1, backgroundColor: '#476969'}}>
            <View style={styles.topView}>
                <TouchableOpacity
                onPress={ () => {
                    navigation.dispatch(CommonActions.goBack())
                }}
                >
                    <Ionicons name= "arrow-back-outline" style={styles.goBackArrow}></Ionicons>
                </TouchableOpacity>
                <Text style={styles.topText}>{doctorInfo.data.name}</Text>
            </View>
            <View style={{flex: 1}}>
                <View style={styles.profileIconContainer}>
                    <Ionicons name="person-circle-outline" style={styles.profileIcon}></Ionicons>
                    <Text style={styles.profileText}>{doctorInfo.data.name}</Text>
                </View>
            </View>
            <Footer/>
        </SafeAreaView>
    )
}