import React from 'react';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import styles from './style';
import { Colors } from '../../libs/color';


function getVariantStyle(variant, color) {
    const variants = {
        solid: {
            backgroundColor: color,
            borderColor: color
        },
        plain: {
            backgroundColor: Colors.White,
            borderColor: Colors.White,
        },
        hollow: {
            backgroundColor: Colors.White,
            borderColor: color
        }
    }
    return variants[variant];
}

function getStateColor(state) {
    const colors = {
        primary: Colors.Brand,
        success: Colors.Success,
        error: Colors.Error,
        normal: Colors.White
    }
    return colors[state]
}

export default function Button(props) {
    const stateColor= getStateColor(props.state);
    const variantStyle = getVariantStyle(props.variant, stateColor);
    const loadingColor = (stateColor === Colors.White) ? Colors.Brand : Colors.White;
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