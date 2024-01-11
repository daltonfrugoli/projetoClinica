import React from "react";

import {
    View
} from "react-native"

import ContentLoader, { Circle } from "react-content-loader/native";

export const LoaderHistorico = () => {



    return(
    <ContentLoader 
        backgroundColor="red"
        foregroundColor="blue"
    >
        <Circle cx = "45" cy = "45" r = "45"/>
    </ContentLoader>
    )
}