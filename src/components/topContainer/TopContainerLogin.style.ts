import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    image: {
        height: 120, 
        width: 120, 
        alignSelf: "center", 
        marginTop: 55,
        marginBottom: 20
    },
    topContainer: {
        width: '100%',
        backgroundColor: '#2B5353'
    },
    topContainerOptions: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'flex-end',
        height: 50,
        backgroundColor: '#2B5353',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30
    },
    options: {
        height: 39
    },
    optionsText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    }
    
})