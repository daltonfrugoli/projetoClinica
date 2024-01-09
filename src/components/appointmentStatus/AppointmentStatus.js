import React from "react";

import {
    View,
    Text,
    TouchableOpacity,
    Alert
} from "react-native";

import { styles } from "./AppointmentStatus.style"
import { appointmentsCancel } from "../../services/Http";
import { useNavigation } from "@react-navigation/native";


export const AppointmentStatus = (props) => {


    const navigation = useNavigation()


    const alterar = () => {
       navigation.navigate("ChangeAppointment", {date: props.date, member: props.member, id: props.id})
      
    }

    
    const cancelar = () => {
        Alert.alert("Atenção!", "Você tem certeza que deseja cancelar a consulta?",
        [
            {
                text: 'Não',
            },
            {
                text: 'Sim',
                onPress: () => {
                     appointmentsCancel(props.id)
                    .then(() => {
                        props.updateList()
                    })

                    .catch((error) => {
                        validationAlert("Atenção", "Algo deu errado. tente novamente mais tarde!")
                    })
                }
            }
           
        ]
        )

       
    }

    if (props.past == true) {
        return(
            <Text style = {{color: '#2DD36F', alignSelf: 'center', fontSize: 18, marginVertical: 10}}>consulta finalizada</Text>
        )
    } else {
        return(
            <View style = {{flexDirection: 'row', justifyContent: 'space-between',
            marginTop: 10}}>
                <TouchableOpacity 
                style = {[styles.appointmentsCancelButton, {opacity: props.cancelable == true ? 1 : 0.5}]}
                disabled = {props.cancelable == true ? false : true}
                onPress={() => {
                    cancelar()
                }}
                >
                    <Text style = {{color: 'white'}}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                style = {styles.appointmentsChangeButton}
                onPress={() => {
                    alterar()
                }}
                >
                    <Text style = {{color: 'white'}}>Alterar</Text>
                </TouchableOpacity>
            </View>
        )
    }
    
}