import React, { useState, useEffect } from "react";

import {
    View,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    Text,
    ScrollView
} from "react-native";

import { styles } from "./NewAppointment.style";
import { CommonActions } from "@react-navigation/native";
import { Footer } from "../../components/footer/Footer";
import Ionicons from "react-native-vector-icons/Ionicons";
import { getMembers } from "../../services/Http";
import { Card } from "../../components/membersListCard/Card";
import { DateCard } from "../../components/dateListCard/DateCard";
import { datesList } from "../../services/Http";
import { timetableList } from "../../services/Http";

export function NewAppointment({navigation}){

    //contém infos dos profissionais disponíveis
    const [membersData, setMembersData] = useState([])

    useEffect(() => {
        loadMemberList()    
    },[])

    //busca infos dos profissionais disponíveis na API
    function loadMemberList(){
        getMembers()
        .then((res) => {
            setMembersData(res.data)
            console.log(res.data)
        })

        .catch((error) => {
            console.log(error);
            Alert.alert('Atenção!', 'Ocorreu um erro inesperado, por favor tente novamente mais tarde!')
        })
    }

    //contém o id do profissional selecionado  
    const [memberSelected, setMemberSelected] = useState(null)
    

    //lista de cards que será carregada com profissionais disponíveis 
    const renderMembers = (item, index) => {

        return (
            <Card 
            color = {memberSelected} 
            name = {item.item.name} 
            id = {item.item.id} 
            selected = {(selected) => changeMember(selected)} 
            />
        )

    }

    //contém as datas disponíveis 
    const [dates, setDates] = useState([])

    function changeMember(selected){

        datesList()
        .then((res) => {
            console.log(res.data)
            setDates(res.data)
        })

        .catch((error) => {
            console.log(error);
            Alert.alert('Atenção!', 'Ocorreu um erro inesperado, por favor tente novamente mais tarde!')
        })

        setShowDates(true)
        setMemberSelected(selected)
    }

    const [showDates, setShowDates] = useState(false)


    //componente que contém a segunda lista com os cards de datas 
    const SegundaLista = () => {

        if(showDates == true){ 
            return (
                <View>
                    <Text style = {styles.listsHeader}>Datas disponíveis</Text>
                    <FlatList 
                        horizontal = {true}
                        contentContainerStyle = {{marginLeft: 10, marginBottom: 25}}
                        data = {dates}
                        keyExtractor = {item => item.id}
                        renderItem = {renderDates}
                    />
                </View>
            )
        }
    }

    //contem o ID da data selecionada para mudança de cor do card
    const [dateSelectedId, setDateSelectedId] = useState(null)
    
    //contém os cards de datas disponiveis 
    const renderDates = (item, index) => {

        return(
           <DateCard
                color = {dateSelectedId}
                id = {item.item.id}
                date = {item.item.name}
                selected = {(dateButtonId, date) => loadTimetable(dateButtonId, date)}
           />
        )
    }

    //contém a data selecionada 
    const [dateSelected, setDateSelected] = useState({})


    //deveria alterar a data selecionada e o ID da data selecionada, porém não funciona na primeira tentativa
    function loadTimetable(dateButtonId, date){

        setDateSelectedId(dateButtonId) 
        setDateSelected(date)

        /*setTimeout(() => {
            timetableList(botaoSelecionado, dateSelected)
            .then((res) => {
                console.log(res)
            })

            .catch((error) => {
                console.log(error);
                Alert.alert('Atenção!', 'Ocorreu um erro inesperado, por favor tente novamente mais tarde!')
            })
        },3000)*/
        setTimeout(() => {
            buscarHorarios(memberSelected, dateSelected)
        }, 2000);
        
    }

    //apenas printa o que está dentro de memberSelected e dateSelected
    function buscarHorarios(idSelect, dateSelect){
        console.log(idSelect, dateSelect)
    }




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
                <Text style = {styles.topText}>Agendar Consultas</Text>
            </View>
            <Text style = {styles.listsHeader}>Profissionais disponíveis</Text>
            <FlatList 
                horizontal = {true}
                contentContainerStyle = {{marginLeft: 10, marginBottom: 25}}
                data = {membersData}
                keyExtractor = {item => item.id}
                renderItem = {renderMembers}
            />
            <SegundaLista/>
            </ScrollView>
            <Footer/>
        </SafeAreaView>
    )
}