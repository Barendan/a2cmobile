import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {Input, Button} from '@ui-kitten/components';

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
    <View style={[styles.container, styles.step1]}>
      <View>
        <Text style={styles.title}>Register Account</Text>
      </View>
      <View style={styles.formContainer}>
        <Input
          style={styles.input}
          onChangeText={text => setText(text)}
          value={text}
          label="Member ID*"
          placeholder="Member ID"
        />
        <Input
          style={styles.input}
          onChangeText={text => setText(text)}
          value={text}
          label="Date Of Birth*"
          placeholder="Date Of Birth"
        />
        <Input
          style={styles.input}
          onChangeText={text => setText(text)}
          value={text}
          label="Address Zip Code*"
          placeholder="Address Zip Code"
        />
        <View style={[{width: '85%'}]}>
          <Button
            title="Validate"
            size="large"
            className={styles.btn}
            onPress={nextStep}>
            Validate
          </Button>
        </View>
      </View>
    </View>
  );
};

export default Step1;
