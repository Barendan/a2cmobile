import React from 'react';
import { ActivityIndicator, TouchableOpacity, View, StyleSheet } from 'react-native';
import { GREY, WHITE, APP_COLOR, SUCCESS, ERROR  } from '_styles/colors';

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        padding: 16,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    disabled: { opacity: 0.6 }
})

function getVariantStyle(variant, color) {
    const variants = {
        solid: {
            backgroundColor: color,
            borderColor: color
        },
        plain: {
            backgroundColor: WHITE,
            borderColor: WHITE,
        },
        hollow: {
            backgroundColor: WHITE,
            borderColor: color
        }
    }
    return variants[variant];
}

function getStateColor(state) {
    const colors = {
        primary: APP_COLOR,
        success: SUCCESS,
        error: ERROR,
        normal: WHITE
    }
    return colors[state]
}

export default function Button(props) {
    const stateColor= getStateColor(props.state);
    const variantStyle = getVariantStyle(props.variant, stateColor);
    const loadingColor = (stateColor === WHITE) ? APP_COLOR : WHITE;
    function onClick() {
        if(!props.disabled && props.onClick && !props.loading) {
            props.onClick();
        }
    }

    return (
        <View style={props.disabled && styles.disabled}>
            <TouchableOpacity style={[styles.container, variantStyle, props.style]}
                onPress={onClick}
                disabled={props.disabled}
            >
                {
                    props.loading ? (<ActivityIndicator size="small" color={loadingColor} />) : props.children
                }
            </TouchableOpacity>
        </View>
    )
}

Button.defaultProps = {
    variant: 'solid',
    state: 'primary'
}