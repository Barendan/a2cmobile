import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TITLE_COLOR } from '_styles/colors';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

export default function OTPInput(props) {
  const { label, pinCount, codeValue, onCodeChanged } = props;

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
        onCodeFilled={code => {
          console.log(`Code is ${code}, you are good to go!`);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    color: TITLE_COLOR,
    fontSize: scale(10),
    marginBottom: moderateScale(10),
  },
  container: {
    width: '80%',
    height: verticalScale(50),
    alignSelf: 'center',
  },
  underlineStyleBase: {
    fontSize: scale(12),
    width: scale(30),
    height: verticalScale(40),
    borderWidth: 0,
    borderBottomWidth: moderateScale(1),
    borderColor: 'black',
    color: 'black',
  },
  underlineStyleHighLighted: {
    borderColor: '#03DAC6',
  },
});
