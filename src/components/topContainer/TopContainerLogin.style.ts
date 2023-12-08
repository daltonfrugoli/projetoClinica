import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    topContainer: {
        width: '100%',
        backgroundColor: '#2B5353',
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30
    },
    topContainerOptions: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'flex-end',
        height: 85
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