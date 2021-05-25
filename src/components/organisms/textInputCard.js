import React, { useState } from 'react';
import { View, TextInput, TouchableHighlight, StyleSheet, ScrollView, useWindowDimensions } from 'react-native';
import { Avatar, Card, Surface, IconButton, Divider, List } from 'react-native-paper';

import Counter from "react-native-counters";

import PropTypes from 'prop-types';
import { Inset, Stack } from "react-native-spacing-system";

// styles
import { BLUE, GRAY_DARK, GRAY_LIGHT } from '_styles/colors';
import { scaleFont } from '_styles/mixins';
import { GRAY_MEDIUM } from '_styles';

const styles = StyleSheet.create({
    surface: {
        padding: 2,
        height: 220,
        width: '100%',
        // elevation: 10,
        borderWidth: 1,
        borderColor: GRAY_DARK,
        borderRadius: 10,
        // padding: 10,
        justifyContent: 'flex-start',
    },
    solidBorderStyle: {
        borderStyle: 'solid'
    },
    dashedBorderStyle: {
        borderStyle: 'dashed'
    },
    cardIcon: {
        backgroundColor: 'transparent',
        marginVertical: 50,
        marginLeft: -5
    },
    counterHolder: {
        marginVertical: 50,
        justifyContent: 'center',
        textAlign: 'center',
        height: 10,
        marginHorizontal: -8,
        borderColor: BLUE,
        borderWidth: 1
    },
    titleStyle: {
        marginBottom: 10
    },
    textInputStyleClass: {
        padding: 10,
        textAlign: 'left',
        height: 150,
        fontSize: 17,
        borderWidth: 1,
        borderColor: GRAY_MEDIUM,
        borderRadius: 5,
        borderStyle: 'dashed',
    }
});


const TextInputCard = (props) => {

    const {
        showBorder,
        solidBorder,
        dashedBorder,
        cardIcon,
        title,
        description,
        placeholder,
        textValue,
        onChangeText,
        ...rest
    } = props;

    return (
        <View>
            <Inset all={5}>
                <Surface style={[styles.surface, props.showBorder && props.dashedBorder ? styles.dashedBorderStyle : styles.solidBorderStyle]}>
                    <List.Item
                        title={title}
                        titleStyle={styles.titleStyle}
                        description={props => <TextInput
                            placeholder={placeholder}
                            underlineColorAndroid='transparent'
                            multiline={true}
                            numberOfLines={4}
                            style={styles.textInputStyleClass}
                            value={textValue}
                            onChangeText={onChangeText}
                        />}
                        // left={props => <Avatar.Icon {...props} size={40} color="black" icon={cardIcon} style={styles.cardIcon} />}
                    />

                </Surface>
            </Inset>

        </View>
    );
}

TextInputCard.defaultProps = {
    align: 'center',
    cardContentProps: {},
};

TextInputCard.propTypes = {
    /**
     * External classes
     */
    className: PropTypes.string,
    /**
     * Card Icon
     */
    cardIcon: PropTypes.string,
    /**
     * Card Title
     */
    title: PropTypes.string,
    /**
     * Card Description Text
     */
    description: PropTypes.string,
    /**
     * Whether to show border
     */
    showBorder: PropTypes.bool,
    /**
     * Whether to solid border
     */
    solidBorder: PropTypes.bool,
    /**
     * Whether to dashed border
     */
    dashedBorder: PropTypes.bool,
    /**
     * Additional props to pass to the CardContent component
     */
    cardContentProps: PropTypes.object,
};
export default TextInputCard;