import React from 'react';
import { TextInput, View } from 'react-native';
import styles from './styles';

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