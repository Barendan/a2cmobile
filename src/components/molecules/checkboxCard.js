import React, { useState } from 'react';
import { View, Text, TouchableHighlight, StyleSheet, ScrollView, useWindowDimensions } from 'react-native';
import { Avatar, Card, Surface, IconButton, Divider, List } from 'react-native-paper';

import CheckBox from 'react-native-check-box'

import PropTypes from 'prop-types';
import { Inset, Stack } from "react-native-spacing-system";

// styles
import { BLUE, GRAY_DARK} from '_styles/colors';
import { scaleFont } from '_styles/mixins';

const styles = StyleSheet.create({
    surface: {
        padding: 2,
        height: 80,
        width: '100%',
        elevation: 10,
        borderWidth: 1,
        borderColor: GRAY_DARK,
        borderRadius: 10,
        padding: 10,
        justifyContent: 'center',
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
    checkBoxHolder: {
      marginVertical: 50,
      justifyContent: 'center',
      textAlign: 'center',
    },
    requiredCard: {
        borderColor: "red",
        borderStyle: "solid",
        borderWidth: 1,
    },
});


const CheckboxCard = (props) => {

    const {
        required,
        showBorder,
        solidBorder,
        dashedBorder,
        cardIcon,
        title,
        description,
        checkedValue,
        onChecked,
        ...rest
    } = props;

    return (
        <View>
            <TouchableHighlight onPress={()=> onChecked(!checkedValue)}>
            <Inset all={5}>
                <Surface style={[styles.surface, props.showBorder && props.dashedBorder ? styles.dashedBorderStyle : (required ? styles.requiredCard : styles.solidBorderStyle)]}>
                <List.Item
                        title={title + (required ? '*' : '')}
                        description={description}
                        descriptionNumberOfLines={2}
                        left={props => <Avatar.Icon {...props} size={40} color="black" icon={cardIcon} style={styles.cardIcon} />}
                        right={props => <CheckBox
                            style={styles.checkBoxHolder}
                            uncheckedCheckBoxColor={BLUE}
                            checkedCheckBoxColor={BLUE}
                            onClick={()=> onChecked(!checkedValue)}
                            isChecked={checkedValue}
                        />}
                    />
                </Surface>
            </Inset>
            </TouchableHighlight>
        </View>
    );
}

CheckboxCard.defaultProps = {
    align: 'center',
    cardContentProps: {},
};

CheckboxCard.propTypes = {
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
     * CurrentCheckedValue
     */
     checkedValue: PropTypes.bool.isRequired,        
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
export default CheckboxCard;