import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

    cardContainer: {
        marginVertical: 20,
        borderWidth: 2,
        borderColor: '#ffffff',
        borderRadius: 10,
        width: 320,
        height: 180,
        alignSelf: 'center'
    },
    profile: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5
    },
    profileIcon: {
        color: '#ffffff',
        fontSize: 50,
        marginRight: 10
    },
    dateContainer: {
        backgroundColor: '#19192333',
        width: '100%',
        height: 55,
        alignSelf: 'center',
        borderRadius: 10,
        flexDirection: 'row',
        marginTop: 5
    },
    dateIcons: {
        fontSize: 30,
        color: '#ffffff',   
        marginLeft: 15,
        marginRight: 5
    },
    dayHour: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})