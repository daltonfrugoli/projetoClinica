import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

    goBackArrow: {
        fontSize: 30, 
        marginLeft: 20, 
        marginTop:5,
        color: '#ffffff' 
    },
    topView: {
        flexDirection: 'row',
        marginTop: 20
    },
    topText: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 5,
        marginLeft: 15
    },
    descTextContainer: {
        width: '80%',
        alignSelf: 'center',
        marginTop: 30
    },
    descText: {
        color: '#ffffff',
        fontSize: 18,
        textAlign: 'center',
        paddingBottom: 10  
    }
})