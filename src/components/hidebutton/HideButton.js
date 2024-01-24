import React, { useState } from "react";

import {
    TouchableOpacity
} from "react-native";

import { styles } from "./HideButton.style";
import Ionicons from "react-native-vector-icons/Ionicons";

export const HideButton = (props) => {

    const [hidePass, setHidePass] = useState(false);

    function changeButton(){
        hidePass == true ? setHidePass(false) : setHidePass(true);
    }

    const mudarPassword = () => {
        props.func(hidePass)
    }

    return(

    <TouchableOpacity 
    style = {styles.hideButton} onPress = { () =>{ changeButton(), mudarPassword() }}>
        <Ionicons name = { hidePass == true ? 'eye-off-outline' : 'eye-outline' } style = { styles.icon }/>
    </TouchableOpacity>
    )
}