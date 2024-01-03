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
import { datesList } from "../../services/Http";
import { timetableList } from "../../services/Http";
import Spinner from "react-native-loading-spinner-overlay";

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
            selected = {(selected, hidelist) => resetDates(selected, hidelist)} 
            />
        )

    }

    const [spinnerVisible, setSpinnerVisible] = useState(false)

    function resetDates(selected, hidelist){
        setShowDates(hidelist)
        setSpinnerVisible(true)
        setDateSelectedId(null)
        setShowTime(hidelist)
        setTimeout(() => {
            changeMember(selected)
            setSpinnerVisible(false)
        }, 500)
    }

    //contém as datas disponíveis 
    const [dates, setDates] = useState([])

    function changeMember(selected){

        console.log('changeMember chamado')
        console.log(selected)

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

     

        const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']
        const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
        const appointmentDate = new Date(item.item.name)
    
        

        return(
            <TouchableOpacity
            style = {[styles.buttonMenu, {backgroundColor: dateSelectedId == item.item.id ? '#FF4500' : '#2B5353'}]}
            onPress={() => {
                loadTimetable(item.item.id, appointmentDate)
            }}
            >
                <Text style = {[styles.buttonNames, {fontWeight: 'bold'}]}>{appointmentDate.getDate()}/{months[appointmentDate.getMonth()]}</Text>
                <Text style = {styles.buttonNames}> {weekDays[appointmentDate.getDay()]} </Text>
            </TouchableOpacity>
        )
    }

    //contém a data selecionada 
    const [dateSelected, setDateSelected] = useState({})


    //deveria alterar a data selecionada e o ID da data selecionada, porém não funciona na primeira tentativa
    function loadTimetable(dateButtonId, date){

        setDateSelectedId(dateButtonId) 
        setDateSelected(date)
        setShowTime(false)
        setSpinnerVisible(true)

        
        setTimeout(()=> {
        buscarHorarios(dateButtonId, date)
        }, 500)
        
    }

    const [times, setTimes] = useState()

    //apenas printa o que está dentro de memberSelected e dateSelected
    function buscarHorarios(idSelect, dateSelect){
        
        console.log(idSelect, dateSelect)
        setSpinnerVisible(false)

        timetableList(memberSelected, dateSelect.getTime())
        .then((res) => {
            console.log(res.data)
            setTimes(res.data)
        })

        .catch((error) => {
            console.log(error);
            Alert.alert('Atenção!', 'Ocorreu um erro inesperado, por favor tente novamente mais tarde!')
        })

        setShowTime(true)
    }

    const [showTime, setShowTime] = useState(false) 

    const TerceiraLista = () => {

        if(showTime == true){ 
            return (
                <View>
                    <Text style = {styles.listsHeader}>Datas disponíveis</Text>
                    <FlatList 
                        horizontal = {true}
                        contentContainerStyle = {{marginLeft: 10, marginBottom: 25}}
                        data = {times}
                        keyExtractor = {item => item.time}
                        renderItem = {renderTimes}
                    />
                </View>
            )
        }
    }

    const [timeSelected, setTimeSelected] = useState()

    const renderTimes = (item, index) => {


        return(
            <TouchableOpacity
            style = {[
                styles.buttonTime, 
                {backgroundColor: timeSelected == item.item.time ? '#FF4500' : '#2B5353'}, {opacity: item.item.available == true ? 1 : 0.5}
                
            ]}
            onPress={() => {
                console.log(item.item.time)
                setTimeSelected(item.item.time)
            }}
            disabled = {item.item.available == true ? false : true}
            >
                <Text style = {[styles.buttonNames, {fontWeight: 'bold'}]}>{item.item.time}</Text>
                
            </TouchableOpacity>
        )
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
            {showDates == true ? SegundaLista() : null}
            {showTime == true ? TerceiraLista() : null}
            </ScrollView>
            <Footer/>
            <Spinner visible = {spinnerVisible}/>
        </SafeAreaView>
    )
}