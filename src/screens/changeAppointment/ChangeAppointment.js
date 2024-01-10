import React, { useState, useEffect } from "react";

import {
    View,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    Text,
    ScrollView
} from "react-native";

import { styles } from "./ChangeAppointment.style";
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
import { attAppointment } from "../../services/Http";




export function ChangeAppointment({navigation, route}){

    //contém infos dos profissionais disponíveis
    const [membersData, setMembersData] = useState([])


    useEffect(() => {
        loadMemberList()   
        loadDates()
        searchTimetables(route.params.date)
        setSpinnerVisible(true)
    },[])

    const [desabilitar, setDesabilitar] = useState(true)

    //busca infos dos profissionais disponíveis na API
    function loadMemberList(){

        getMembers()
        .then((res) => {
            setMembersData(res.data)
        })

        .catch((error) => {
            console.log(error);
            Alert.alert('Atenção!', 'Ocorreu um erro inesperado, por favor tente novamente mais tarde!')
        })
    }

    //contém o id do profissional selecionado  
    const memberSelected = route.params.member

    
    //cards que serão carregados com profissionais disponíveis 
    const renderMembers = (item, index) => {

        return (
            <Card 
            color = {memberSelected} 
            name = {item.item.name} 
            id = {item.item.id}  
            disabled = {true}
            />
        )
    }


    //contém as datas disponíveis 
    const [dates, setDates] = useState([])


    //variavel que permite a exibição da segunda lista
    const [showDates, setShowDates] = useState(false)


    //carrega as datas disponíveis
    function loadDates(){

        datesList()
        .then((res) => {
            var currentDate = new Date()
            var availableDates = []
            res.data.map((date, index) => {
                if(Date.parse(date.name) >= currentDate){
                    availableDates.push(date)
                }

                if(route.params.date.slice(0,10) == date.name.slice(0,10)){
                    setDateSelectedId(date.id)
                }
            })
            setDates(availableDates)
            
        })

        .catch((error) => {
            console.log(error);
            Alert.alert('Atenção!', 'Ocorreu um erro inesperado, por favor tente novamente mais tarde!')
        })
          
    }



    //contem o ID da data selecionada para mudança de cor do card
    const [dateSelectedId, setDateSelectedId] = useState(null)

    //contém a data selecionada 
    const [dateSelected, setDateSelected] = useState(route.params.date)

    const [dateColor, setDateColor] = useState(route.params.date)


    //cards de datas disponiveis 
    const renderDates = (item, index) => {

        const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']
        const appointmentDate = new Date(item.item.name)
        var dayName = weekDays[appointmentDate.getDay()]
        var dateString = appointmentDate.toLocaleDateString("pt-BR",{timeZone:"UTC"}).slice(0,5)
        var dataConvertida = dateColor.slice(0,10)
        var dataDoItem = item.item.name.slice(0,10)

        return(
            <TouchableOpacity
            style = {[styles.buttonMenu, {backgroundColor: dataConvertida == dataDoItem ? '#FF4500' : '#2B5353'}]}
            onPress={() => {
                setTimes(null)
                loadTimetable(item.item.id, appointmentDate)
            }}
            >
                <Text style = {[styles.buttonNames, {fontWeight: 'bold'}]}>{dateString}</Text>
                <Text style = {styles.buttonNames}> {dayName} </Text>
            </TouchableOpacity>
        )
    }


    //altera a data selecionada e o ID da data selecionada
    function loadTimetable(dateId, date){

        setTimeSelected(null)
        setDateSelected(date) 
        setDateSelectedId(dateId)
        setDateColor(date.toJSON())
        setSpinnerVisible(true)

        setTimeout(()=> {
            searchTimetables(date)
        }, 500)

    }


    //contém os horários disponíveis para consultas
    const [times, setTimes] = useState()


    //busca os horários disponíveis para consulta 
    function searchTimetables(dateSelect){

        var dateConvert = new Date(dateSelect)
        timetableList(memberSelected, dateConvert.getTime())
        .then((res) => {
            var timeTables = res.data.filter(timeTable => timeTable.available == true)
            setTimes(timeTables) 
            setSpinnerVisible(false)
        })

        .catch((error) => {
            console.log(error);
            Alert.alert('Atenção!', 'Ocorreu um erro inesperado, por favor tente novamente mais tarde!')
        })

    }


    //controla a exibição da lista de horários
    const [showTime, setShowTime] = useState(true) 

    //contém o o horário selecionado
    const [timeSelected, setTimeSelected] = useState(route.params.horario)


    //cards de horários
    const renderTimes = (item, index) => {

        return(
            <TouchableOpacity
            style = {[
                styles.buttonTime, 
                {backgroundColor: timeSelected == item.item.time ? '#FF4500' : '#2B5353'}  
            ]}
            onPress={() => {
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
                <Text style = {styles.modalText}>Consulta alterada com sucesso!</Text>
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

        console.log(route.params.id, userId, memberId, date.replace("+00:00", "-03:00"))
        attAppointment(route.params.id, userId, memberId, date.replace("+00:00", "-03:00"))
        .then(() => {
            setModalIsVisible(true)
        })

        .catch((error) => {
            console.log(error);
            Alert.alert('Atenção!', 'Ocorreu um erro inesperado, por favor tente novamente mais tarde!')
        })
    }

    useEffect(() => {
        if(dateSelected == route.params.date && timeSelected == route.params.horario){
            setDesabilitar(false)
        }else{
            setDesabilitar(true)
        }
    },[memberSelected, dateSelected, timeSelected])


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
                <Text style = {styles.topText}>Alterar Consultas</Text>
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
            
            </ScrollView> 
            <TouchableOpacity 
            style = {[styles.submitButton,{opacity: (memberSelected && dateSelected && timeSelected) && (desabilitar) ? 1 : 0.5}]}
            disabled = {(memberSelected && dateSelected && timeSelected) && (desabilitar) ? false : true}
            onPress={() => {
                agendamento(globalVariables.userId, memberSelected, dataCompleta)
            }}
            >
                <Text style = {styles.submitButtonText}>Alterar consulta</Text>
            </TouchableOpacity>
            <Footer disable = {true}/>
            <Spinner visible = {spinnerVisible}/>
            {renderModal()}
        </SafeAreaView>
    )
}