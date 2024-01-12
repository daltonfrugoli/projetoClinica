import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    formContainer: {
        width: '90%',
        alignSelf: 'center',
        marginVertical: 25,
        maxWidth: 400
    },
    textInputs: {
        color: '#ffffff',
        fontSize: 18,
        marginTop: 18,
        marginBottom: 10
    },
    inputEmail: {
        backgroundColor: '#476969',
        color: '#ffffff', 
    },
    inputSenhaContainer: {
        flexDirection: "row",
        marginTop: 15
    },
    inputSenha: {
        backgroundColor: '#476969',
        width: '85%',
    },
    upButton: {
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#FF4500',
        height: 40,
        width: '100%',
        borderRadius: 10,
    },
    upButtonText: {
        color: '#ffffff'
    },
    buttonContainer: {
        height: 80,
        width: '90%',
        maxWidth: 400,
        alignSelf: 'center'
    },
    contentStyleEmail: {
        backgroundColor: "#dfdfdf"
    }
})