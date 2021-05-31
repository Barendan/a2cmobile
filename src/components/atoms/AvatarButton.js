import React, { useState } from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import DraggablePanel from 'react-native-draggable-panel';
import { Inset, Stack } from "react-native-spacing-system";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { PreferencesContext } from '_context';
import { CloseButton } from '_atoms'
import { Avatar } from 'react-native-paper';

const styles = StyleSheet.create({
    viewHolder: {
        flexDirection: 'row',
    },
    icon: {
        marginTop: -5,
        marginLeft: 20,
        backgroundColor: 'white',
    },
    defaultButtonTextStyle: {
        height: 20,
        marginLeft: 5
      }
});


const AvatarButton = (props) => {

    const  {
        icon,
        iconColor,
        buttonText,
        buttonTextStyle,
        onPress,
    } = props;

    return (
            <TouchableHighlight onPress={onPress}>
                <View style={styles.viewHolder}>
                    <Avatar.Icon
                        size={30}
                        icon={icon}
                        color={iconColor}
                        style={styles.icon}
                    />
                    <Text style={buttonTextStyle || styles.defaultButtonTextStyle}>{buttonText}</Text>
                </View>
            </TouchableHighlight>
    );
}
export default AvatarButton;