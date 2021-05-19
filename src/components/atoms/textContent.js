import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { GREY } from '_styles/colors';


export default function TextContent(props) {
    const styles = {
        color: props.color,
        fontSize: props.fontSize,
        fontWeight: props.fontWeight,
        textAlign: props.textAlign,
        textDecorationLine: props.underline ? "underline" : "none",
    }

    return (
        <Text style={[ styles, props.style]} onPress={props.onClick}>
            {props.children}
        </Text>
    )
}

TextContent.defaultProps = {
    colour: GREY,
    fontSize: 16,
    fontWeight: "500",
    textAlign: "left",
}
