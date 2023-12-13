import React, { useState, useEffect } from "react"

import {
    View,
    SafeAreaView,
    Text,
    FlatList
} from "react-native"

import { styles } from "./Menu.style"
import { Footer } from "../../components/footer/Footer"
import { Card } from "../../components/menuCard/Card"

export function Menu({navigation, route}){

    const dados = route.params
    const nome = dados.dataUser.name
    const [horario, setHorario] = useState('asdfasdfas')

    useEffect( () => {
        horarioConfig()
    }, [])

   function horarioConfig(){ 

        let data = new Date()
        let hora = data.getHours() 

        console.log(hora)
        console.log(data)

        if(hora >= 0 && hora < 12)
        {
            setHorario('Bom dia,')
        }
        else if (hora >= 12 && hora <= 18)
        {
            setHorario('Boa tarde,')
        }
        else
        {
            setHorario('Boa noite,')
        }

    }


    const servicos = [
        {
            id: 1,
            name: 'Agendamento',
            icon: "calendar-outline"
        },
        {
            id: 2,
            name: 'Historico',
            icon: "list-outline"
        },
        {
            id: 3,
            name: 'Equipe',
            icon: "body-outline"
        },

    ];

    const renderItem = ({item, index}) => {
        return(
            <Card name={item.name} icon={item.icon}/>
          )
    }

    const headerList = () => {

        return(
            <View>
                <View style={styles.header}>
                    <Text style={{color: '#ffffff', fontSize: 15}}>{horario}</Text>
                    <Text style={{color: '#ffffff', fontSize: 18, fontWeight: 'bold'}}>{nome}</Text>
                </View>  
                <Text style={styles.pergunta}>O que gostaria de fazer?</Text>
            </View>
              
        )
    }

    
   
    return(
        <SafeAreaView style={{backgroundColor: '#476969', flex: 1}}>
            <View style={styles.flatList}>
                <FlatList 
                ListHeaderComponent={headerList}
                contentContainerStyle={{paddingBottom: 100}}
                data={servicos}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                numColumns={2}
                columnWrapperStyle={{flexWrap: 'wrap', justifyContent: 'space-evenly'}}
                />
            </View>
            <Footer/>
        </SafeAreaView>
    )
}