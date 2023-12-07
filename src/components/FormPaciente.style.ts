import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    formContainer: {
        width: '90%',
        alignSelf: 'center',
        marginVertical: 25
    },
    textInputs: {
        color: 'white',
        fontSize: 18,
        marginTop: 18,
        marginBottom: 10

    },
    inputEmail: {
        backgroundColor: '#2B5353',
        borderRadius: 8,
        color: 'white'
    },
    inputSenhaContainer: {
        flexDirection: "row"
    },
    inputSenha: {
        backgroundColor: '#2B5353',
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        marginBottom: 65,
        width: '85%',
        color: 'white'
    },
    hideButton: {
        backgroundColor:'#2B5353',
        height: 49,
        width: '15%',
        alignItems: "center",
        justifyContent: "center",
        borderBottomRightRadius: 8,
        borderTopRightRadius: 8
    },
    upButton: {
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#FF4500',
        height: 40,
        width: '90%',
        borderRadius: 10,
        margin: 10
    },
    upButtonText: {
        color: 'white'
    },
    buttonContainer: {
        backgroundColor: '#476969',
        height: 80,
        width:"100%",
    }
})