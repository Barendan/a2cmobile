import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TITLE_COLOR } from "_styles/colors";
import OTPInputView from '@twotalltotems/react-native-otp-input';

export default function OTPInput(props) {
    const {
        label,
        pinCount,
        codeValue,
        onCodeChanged
    } = props;

    return (
        <View>
            <Text style={styles.title}>{label}</Text>
            <OTPInputView
                style={styles.container}
                pinCount={pinCount}
                code={codeValue} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                onCodeChanged={onCodeChanged}
                codeInputFieldStyle={styles.underlineStyleBase}
                codeInputHighlightStyle={styles.underlineStyleHighLighted}
                onCodeFilled={(code) => {
                    console.log(`Code is ${code}, you are good to go!`)
                }}
            />
        </View>

    );
}

const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        color: TITLE_COLOR,
        fontSize: 16,
        marginBottom: 10,
    },
    container: {
        width: '80%',
        height: 50,
        alignSelf: 'center'
    },
    borderStyleBase: {
        width: 30,
        height: 45
    },

    borderStyleHighLighted: {
        borderColor: "#03DAC6",
    },
    underlineStyleBase: {
        width: 30,
        height: 45,
        borderWidth: 0,
        borderBottomWidth: 1,
        borderColor: "black",
        color: 'black'
    },

    underlineStyleHighLighted: {
        borderColor: "#03DAC6",
    },
});