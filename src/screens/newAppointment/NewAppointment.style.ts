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
        fontSize: 18
    },
    buttonMenu: {
        backgroundColor: '#2B5353',
        marginRight: 20,
        justifyContent: 'center',
        width: 70,
        height: 50,
        borderColor: '#ffffff',
        borderRadius: 10,
        borderWidth: 2,
        alignItems: 'center',
        marginTop: 10
    },
    buttonNames: {
        fontSize: 15,
        color: '#ffffff',
    },
    buttonTime: {
        backgroundColor: '#2B5353',
        marginRight: 20,
        justifyContent: 'center',
        width: 70,
        height: 30,
        borderColor: '#ffffff',
        borderRadius: 8,
        borderWidth: 2,
        alignItems: 'center',
        marginTop: 10,
    },
    submitButton: {
        width: '90%',
        height: 40,
        backgroundColor: '#FF4500',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginBottom: 15
    },
    submitButtonText: {
        color: '#ffffff',
        fontSize: 16,
    },
    modal: {
        width: 280,
        height: 145,
        backgroundColor: '#2B5353',
        borderColor: '#ffffff',
        borderWidth: 2,
        borderRadius: 20,
        alignSelf: 'center'
    },
    modalTitle: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginTop: 15
    },
    modalText: {
        color: '#ffffff',
        marginVertical: 15,
        fontSize: 15,
        alignSelf: 'center'
    },
    modalButtonText: {
        color: '#ffffff',
        alignSelf: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 5
    }
})