import React, {useState} from 'react';
import {View} from 'react-native';
import {Input, Button, Text} from '@ui-kitten/components';

import styles from './styles';

const Step1 = ({back, next, saveState}) => {
  const [text, setText] = useState('');

  const nextStep = () => {
    //const {next, saveState} = this.props;
    // Save state for use in other steps
    saveState({name: 'samad'});
    next();
  };

  const goBack = () => {
    back();
  };

  return (
    <View style={[styles.container, styles.step3]}>
      <View style={styles.formContainer}>
        <View
          style={[
            {alignItems: 'flex-start', width: '85%', marginBottom: '5%'},
          ]}>
          <Text category="s1" style={[{marginBottom: '5%'}]}>
            Please choose the password for your account
          </Text>
        </View>
        <Input
          style={styles.input}
          onChangeText={text => setText(text)}
          value={text}
          label="Password*"
          placeholder="Password"
        />
        <Input
          style={styles.input}
          onChangeText={text => setText(text)}
          value={text}
          label="Confirm Password*"
          placeholder="Confirm Password"
        />
        <View style={[{width: '85%'}]}>
          <Button
            title="Validate"
            size="large"
            className={styles.btn}
            onPress={nextStep}>
            Complete Registration
          </Button>
        </View>
      </View>
    </View>
  );
};

export default Step1;
