import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

    cardContainer: {
        width: 320,
        height: 150,
        borderWidth: 2,
        borderColor: '#ffffff',
        borderRadius: 15,
        alignSelf: 'center',
        marginBottom: 20
    },
    cardMargin: {
        width: '90%',
        alignSelf: 'center'
    },
    topLine: {
        flexDirection: 'row', 
        marginTop:3, 
        alignItems: 'center'
    },
    topIcon: {
        fontSize: 52, 
        color: '#ffffff'
    },
    topName: {
        color: '#ffffff', 
        fontWeight: 'bold', 
        fontSize: 15
    },
    midLine: {
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 8
    },
    midLineContainers: {
        flexDirection: 'row', 
        alignItems: 'center'
    },
    midIcons: {
        fontSize: 25, 
        color: '#ffffff', 
        marginLeft: 5,
        marginRight: 5
    },
    midText: {
        color: '#ffffff', 
        fontWeight: 'bold', 
        fontSize: 14,
        marginRight: 5
    },
    bottomIcon: {
        color: '#ffffff',
        fontSize: 25,
        marginLeft: 5,
        marginRight: 4
    },
    bottomText: {
        color: '#ffffff',
        width: 250
    }
})