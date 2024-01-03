import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

    topView: {
        flexDirection: 'row',
        marginVertical: 20
    },
    goBackArrow: {
        fontSize: 30, 
        marginLeft: 20, 
        marginTop:5,
        color: '#ffffff'
    },
    topText: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 5,
        marginLeft: 15,
        flex: 0.85
    },
    novaConsultaText: {
        color: '#ffffff'
    },
    listsHeader: {
        color: '#ffffff',
        marginLeft: 20,
        fontSize: 18
    },
    buttonMenu: {
        backgroundColor: '#2B5353',
        marginHorizontal: 10,
        justifyContent: 'center',
        width: 70,
        height: 50,
        borderColor: '#ffffff',
        borderRadius: 10,
        borderWidth: 2,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonNames: {
        fontSize: 15,
        color: '#ffffff',
    },
    buttonTime: {
        backgroundColor: '#2B5353',
        marginHorizontal: 10,
        justifyContent: 'center',
        width: 70,
        height: 30,
        borderColor: '#ffffff',
        borderRadius: 8,
        borderWidth: 2,
        alignItems: 'center',
        marginTop: 10,
    }

})