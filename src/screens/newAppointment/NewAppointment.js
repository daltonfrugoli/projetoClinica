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
import { Card } from "../../components/membersListCard/Card";
import { getMembers } from "../../services/Http";
import { datesList } from "../../services/Http";
import { timetableList } from "../../services/Http";
import { saveAppointment } from "../../services/Http";
import Spinner from "react-native-loading-spinner-overlay";
import Modal from "react-native-modal"
import globalVariables from "../../services/GlobalVariables";

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
            selected = {(selected) => resetDates(selected)} 
            />
        )
    }

    //reseta as listas quando um novo dentista é selecionado
    function resetDates(selected){

        setShowDates(false)
        setSpinnerVisible(true)
        setDateSelectedId(null)
        setShowTime(false)

        setTimeout(() => {
            changeMember(selected)
            setSpinnerVisible(false)
        }, 500)
    }


    //contém as datas disponíveis 
    const [dates, setDates] = useState([])


    //carrega as datas disponíveis
    function changeMember(selected){

        datesList()
        .then((res) => {
            var currentDate = new Date()
            var availableDates = []
            res.data.map((date, index) => {
                if(Date.parse(date.name) >= currentDate){
                    availableDates.push(date)
                }
            })
            setDates(availableDates)
        })

        .catch((error) => {
            console.log(error);
            Alert.alert('Atenção!', 'Ocorreu um erro inesperado, por favor tente novamente mais tarde!')
        })

        setShowDates(true)
        setMemberSelected(selected)   
    }


    //variavel que permite a exibição da segunda lista
    const [showDates, setShowDates] = useState(false)


    //componente que contém a segunda lista com os cards de datas 
    const secondList = () => {

        return (
            <View style = {{marginHorizontal: 20}}>
                <Text style = {styles.listsHeader}>Datas disponíveis</Text>
                <FlatList 
                    horizontal = {true}
                    contentContainerStyle = {{marginBottom: 25}}
                    data = {dates}
                    keyExtractor = {item => item.id}
                    renderItem = {renderDates}
                />
            </View>
        )
    }


    //contem o ID da data selecionada para mudança de cor do card
    const [dateSelectedId, setDateSelectedId] = useState(null)

    
    //cards de datas disponiveis 
    const renderDates = (item, index) => {

        const weekDays = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom']
        const appointmentDate = new Date(item.item.name)
        var dayName = weekDays[appointmentDate.getDay()]
        var dateString = appointmentDate.toLocaleDateString("pt-BR",{timeZone:"UTC"}).slice(0,5)
       

        return(
            <TouchableOpacity
            style = {[styles.buttonMenu, {backgroundColor: dateSelectedId == item.item.id ? '#FF4500' : '#2B5353'}]}
            onPress={() => {
                loadTimetable(item.item.id, appointmentDate)
                console.log('data:-----------')
                console.log(appointmentDate)
            }}
            >
                <Text style = {[styles.buttonNames, {fontWeight: 'bold'}]}>{dateString}</Text>
                <Text style = {styles.buttonNames}> {dayName} </Text>
            </TouchableOpacity>
        )
    }


    //contém a data selecionada 
    const [dateSelected, setDateSelected] = useState({})


    //altera a data selecionada e o ID da data selecionada
    function loadTimetable(dateButtonId, date){

        setTimeSelected(null)
        setDateSelectedId(dateButtonId) 
        setDateSelected(date)
        setShowTime(false)
        setSpinnerVisible(true)

        setTimeout(()=> {
            searchTimetables(dateButtonId, date)
        }, 500)
        
    }


    //contém os horários disponíveis para consultas
    const [times, setTimes] = useState()


    //busca os horários disponíveis para consulta 
    function searchTimetables(idSelect, dateSelect){
        
        console.log(idSelect, dateSelect)
        setSpinnerVisible(false)

        timetableList(memberSelected, dateSelect.getTime())
        .then((res) => {
            var timeTables = res.data.filter(timeTable => timeTable.available == true)
            setTimes(timeTables)
            console.log(timeTables)
        })

        .catch((error) => {
            console.log(error);
            Alert.alert('Atenção!', 'Ocorreu um erro inesperado, por favor tente novamente mais tarde!')
        })

        setShowTime(true)
    }


    //controla a exibição da lista de horários
    const [showTime, setShowTime] = useState(false) 

    //contém o o horário selecionado
    const [timeSelected, setTimeSelected] = useState()


    //lista de horários disponiveis
    const ThirdList = () => {

        return (

            <View style = {{marginHorizontal: 20}}>
                <Text style = {styles.listsHeader}>Horários disponíveis</Text>
                {times ? null : <Text style = {{color: '#ffffff', marginTop: 10, opacity: 0.5}}>Nenhum horário disponível...</Text>}
                <FlatList 
                    horizontal = {true}
                    contentContainerStyle = {{marginBottom: 25}}
                    data = {times}
                    keyExtractor = {item => item.time}
                    renderItem = {renderTimes}
                />
            </View>
          
        )
    }


    //cards de horários
    const renderTimes = (item, index) => {

        return(
            <TouchableOpacity
            style = {[
                styles.buttonTime, 
                {backgroundColor: timeSelected == item.item.time ? '#FF4500' : '#2B5353'}  
            ]}
            onPress={() => {
                console.log(item.item.time)
                setTimeSelected(item.item.time)
                setDataCompleta(item.item.value)
            }}>
                <Text style = {[styles.buttonNames, {fontWeight: 'bold'}]}>{item.item.time}</Text>
                
            </TouchableOpacity>
        )
    }

   


    const [dataCompleta, setDataCompleta] = useState("")


    //controla exibição do spinner
    const [spinnerVisible, setSpinnerVisible] = useState(false)


    //controla exibição do modal
    const [modalIsVisible, setModalIsVisible] = useState(false)


    const renderModal = () => (
        
        <Modal   
        isVisible = {modalIsVisible}
        onBackButtonPress = {() => {
            setModalIsVisible(false)
            navigation.dispatch(CommonActions.goBack())
        }}
        onBackdropPress = {() => {
            setModalIsVisible(false)
            navigation.dispatch(CommonActions.goBack())
        }}
        >
            <View style = {styles.modal}>
                <Text style = {styles.modalTitle}>Atenção</Text>
                <Text style = {styles.modalText}>Consulta agendada com sucesso!</Text>
                <TouchableOpacity
                    onPress={() => {
                        setModalIsVisible(false)
                        navigation.dispatch(CommonActions.goBack())
                    }}

                >
                    <Text style = {styles.modalButtonText}>Ok</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    )

    function agendamento(userId, memberId, date){

        saveAppointment(userId, memberId, date.replace("+00:00", "-03:00"))
        .then(() => {
            setModalIsVisible(true)
        })

        .catch((error) => {
            console.log(error);
            Alert.alert('Atenção!', 'Ocorreu um erro inesperado, por favor tente novamente mais tarde!')
        })

        console.log(userId, memberId, date.replace("+00:00", "-03:00"))
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
            
            <View style = {{marginHorizontal: 20}}>
                <Text style = {styles.listsHeader}>Profissionais disponíveis</Text>
                <FlatList 
                    horizontal = {true}
                    contentContainerStyle = {{marginBottom: 25}}
                    data = {membersData}
                    keyExtractor = {item => item.id}
                    renderItem = {renderMembers}
                />
            </View>
            {showDates == true ? secondList() : null}
            {showTime == true ? ThirdList() : null}
            </ScrollView> 
            <TouchableOpacity 
            style = {[styles.submitButton,{opacity: memberSelected && dateSelected && timeSelected ? 1 : 0.5}]}
            disabled = {memberSelected && dateSelected && timeSelected ? false : true}
            onPress={() => {
                console.log('realizaragendamento')
                agendamento(globalVariables.userId, memberSelected, dataCompleta)
            }}
            >
                <Text style = {styles.submitButtonText}>Realizar agendamento</Text>
            </TouchableOpacity>
            <Footer disable = {true}/>
            <Spinner visible = {spinnerVisible}/>
            {renderModal()}
        </SafeAreaView>
    )
}