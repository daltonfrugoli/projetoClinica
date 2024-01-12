import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

    cardContainer: {
        marginBottom: 20,
        borderWidth: 2,
        borderColor: '#ffffff',
        borderRadius: 15,
        width: 320,
        height: 182,
        alignSelf: 'center'
    },
    profile: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 6
    },
    profileIcon: {
        color: '#ffffff',
        fontSize: 50,
        marginRight: 10
    },
    dateContainer: {
        backgroundColor: '#19192333',
        width: '98%',
        height: 55,
        alignSelf: 'center',
        borderRadius: 10,
        flexDirection: 'row',
        marginBottom: 2,
        justifyContent: "space-between"
    },
    dateIcons: {
        fontSize: 30,
        color: '#ffffff',   
        marginLeft: 15,
        marginRight: 5
    },
    dayHour: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15
    }
})