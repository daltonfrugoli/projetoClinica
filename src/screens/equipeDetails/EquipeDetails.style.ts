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
        marginLeft: 15
    },
    profileIconContainer: {
        alignItems: 'center',
        marginVertical: 10
    },
    profileIcon: {
        color: '#ffffff',
        fontSize: 130
    },
    profileText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold'
    },
    firstRowInfo: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginVertical: 25
    },
    infosIcon: {
        color: '#2B5353',
        fontSize: 55
    },
    infosText: {
        color: '#ffffff',
        fontSize: 18
    },
    infosContainer: {
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor:'#64ABA3',
        height: 65,
        width: 65,
        justifyContent: 'center',
        marginBottom: 5
    }
})