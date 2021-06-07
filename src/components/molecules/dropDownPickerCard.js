import React, { useState } from 'react';
import { View, TouchableHighlight, StyleSheet, ScrollView, Animated } from 'react-native';
import { Avatar, Options, Provider, Portal, List, Text, Divider } from 'react-native-paper';
import { CloseButton } from '_atoms'

import PropTypes from 'prop-types';
import { Inset, Stack } from "react-native-spacing-system";

import { Picker } from '@react-native-picker/picker';

// styles
import { BLUE, GRAY_DARK } from '_styles/colors';
import { scaleFont } from '_styles/mixins';

const styles = StyleSheet.create({
    surface: {
        padding: 2,
        width: '100%',
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
    optionsHolder: {
        marginVertical: 50,
        justifyContent: 'center',
        textAlign: 'center',
        flexDirection: 'row'
    },
    cardOptionsIcon: {
        backgroundColor: 'transparent',
        marginRight: -8,
    },
    optionStyleTitle: {
        fontSize: 18,
        color: BLUE
    },
    requiredCard: {
        borderColor: "red",
        borderStyle: "solid",
        borderWidth: 1,
    },
});


const DropDownPickerCard = (props) => {

    const {
        required,
        showBorder,
        solidBorder,
        dashedBorder,
        cardIcon,
        title,
        description,
        mulitple,
        optionsList,
        selectedValue,
        onOptionSelected,
        onChecked,
        ...rest
    } = props;

    const [showOptions, setShowOptions] = useState(false);

    const optionSelected = (option) => {
        onOptionSelected(option);
        setShowOptions(false);
    }

    const heightAnim = React.useRef(new Animated.Value(60)).current  // Initial value for opacity: 0

    React.useEffect(() => {
        Animated.timing(
            heightAnim,
            {
                toValue: showOptions ? 200 : 80,
                duration: 250,           // <-- animation duration
                useNativeDriver: false
            }
        ).start();
    }, [showOptions])

    const viewHeight = {
        height: heightAnim
    };

    return (
        <View>
            <TouchableHighlight onPress={() => setShowOptions(!showOptions)}>
                <Inset all={5} >
                    <Animated.View style={[styles.surface, props.showBorder && props.dashedBorder ? styles.dashedBorderStyle : (required ? styles.requiredCard : styles.solidBorderStyle), viewHeight]}>


                        {!showOptions && <List.Item
                            title={title + (required ? '*' : '')}
                            description={selectedValue}
                            descriptionNumberOfLines={2}
                            left={props => <Avatar.Icon {...props} size={40} color="black" icon={cardIcon} style={styles.cardIcon} />}
                            right={props => <View style={styles.optionsHolder}>
                                <TouchableHighlight onPress={() => setShowOptions(!showOptions)}><Avatar.Icon {...props} size={40} color={BLUE} icon={'arrow-down-drop-circle'} style={styles.cardOptionsIcon} /></TouchableHighlight>
                            </View>}
                        />}

                        {showOptions && <>
                            <CloseButton
                                onPress={() => setShowOptions(!showOptions)}
                            />

                            <ScrollView showsVerticalScrollIndicator={false}>
                                {optionsList.map(currentOption => (<>
                                    <TouchableHighlight key={currentOption.label} onPress={() => optionSelected(currentOption)}>
                                        <Text style={styles.optionStyleTitle}>{currentOption.label}</Text>
                                    </TouchableHighlight>
                                    <Divider />
                                </>))}

                            </ScrollView>


                        </>}

                    </Animated.View>

                </Inset>

            </TouchableHighlight>
        </View>
    );
}

DropDownPickerCard.defaultProps = {
    align: 'center',
    cardContentProps: {},
};

DropDownPickerCard.propTypes = {
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
export default DropDownPickerCard;