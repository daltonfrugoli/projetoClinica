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
    novaConsultaButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2DD36F',
        borderRadius: 10,
        height: 35,
        width: 130,
        justifyContent: 'center'
    }
})