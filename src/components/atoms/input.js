import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import { GREY, WHITE } from '_styles/colors';

const styles = StyleSheet.create({
    wrapper: {
        borderRadius: 5,
        borderColor: GREY,
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10
    }, 
    container: {
        backgroundColor: WHITE,
        paddingHorizontal: 12,
        marginVertical: 1,
        marginLeft: 1,
        flex: 1,
        marginRight: 1
    },
    hideRightMargin: {
        marginRight: 0,

    },
    input: {
        fontSize: 16,
        fontWeight: "500",
        paddingVertical: 0,
    },
    textArea: {
        textAlignVertical: 'top'
    },
    placeholder: {
        fontWeight: "400"
    },
    rightComponentWrapper: {
        alignSelf: "flex-end",
        paddingRight: 5
    },
    leftComponentWrapper: {
        alignSelf: "flex-start",
        paddingLeft: 5,
    }
})

function Input(props) {
    return (
        <View style={[styles.wrapper, props.containerStyle]}>
            {
                props.leftComponent ? (
                    <View style={styles.leftComponentWrapper}>{props.leftComponent}</View>
                ) : null
            }
            <View style={[styles.container, props.hideRightMargin && styles.hideRightMargin, props.containerStyle]}>
                <TextInput
                    value={props.value}
                    defaultValue={props.defaultValue}
                    placeholder={props.placeholder}
                    style={[styles.input, !props.value && styles.placeholder, props.isTextArea && styles.textArea]}
                    keyboardType={props.keyboardType}
                    textContentType={props.contentType}
                    multiline={props.isTextArea}
                    numberOfLines={props.numberOfLines}
                    secureTextEntry={props.secureTextEntry}
                    onChangeText={props.onChange}
                    autoCompleteType={props.autoCompleteType}
                    placeholderTextColor={props.placeholderTextColor}
                    editable={props.editable}
                    maxLength={props.maxLength}
                    returnKeyType="done"
                    pointerEvents={props.pointerEvents}

                >

                </TextInput>
            </View>
            {
                props.rightComponent ? 
                (
                    <View style={styles.rightComponentWrapper}>
                        {props.rightComponent} 
                    </View> 
                )
                : null
            }
        </View>

    )
}

Input.defaultProps = {
    editable: true,
    numberOfLines: 1,
}

export default React.memo(Input);