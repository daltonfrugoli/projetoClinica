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
        backgroundColor: '#2B5353',
        borderRadius: 8,
        color: '#ffffff',
        height: 50,
        padding: 10
    },
    inputSenhaContainer: {
        flexDirection: "row"
    },
    inputSenha: {
        backgroundColor: '#2B5353',
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        marginBottom: 65,
        color: '#ffffff',
        width: '85%',
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
    },
    upButtonText: {
        color: '#ffffff'
    },
    buttonContainer: {
        height: 80,
        width: '90%',
        maxWidth: 400,
        alignSelf: 'center'
    }
})