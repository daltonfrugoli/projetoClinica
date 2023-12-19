import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

    formContainer: {
        width: '90%',
        alignSelf: 'center',
        marginVertical: 0,
        maxWidth: 400,
    },
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
        marginLeft: 15
    },
    textInputs: {
        color: '#ffffff',
        fontSize: 18,
        marginTop: 18,
        marginBottom: 10
    },
    inputEmail: {
        backgroundColor: '#2B5353',
        borderRadius: 8,
        color: '#ffffff',
        height: 50,
        padding: 10
    },
    upButton: {
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#FF4500',
        height: 40,
        width: '100%',
        borderRadius: 10,
        marginTop: 10
    },
    exitButton: {
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        borderColor: '#FF4500',
        borderWidth: 2,
        height: 40,
        width: '100%',
        borderRadius: 10,
        marginTop: 10
    },
    upButtonText: {
        color: '#ffffff'
    }
})