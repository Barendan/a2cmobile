import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {Button, Input, Radio, RadioGroup} from '@ui-kitten/components';
import styles from './styles';

const Step2 = ({back, next, saveState}) => {
  const [text, setText] = useState('');
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [showValidate, setShowValidate] = React.useState(false);

  const nextStep = () => {
    // Save state for use in other steps
    saveState({name: 'samad'});

    // Go to next step
    next();
  };

  const goBack = () => {
    // Go to previous step
    back();
  };
  const renderValidationPhone = () => {
    if (showValidate === false) {
      return (
        <View style={[{width: '85%'}]}>
          <Button
            title="Validate"
            size="large"
            className={styles.btn}
            onPress={() => setShowValidate(true)}>
            Continue
          </Button>
        </View>
      );
    } else {
      return (
        <React.Fragment>
          <View
            style={[
              {alignItems: 'flex-start', width: '85%', marginBottom: '5%'},
            ]}>
            <Text>Enter the temporary Code that was sent to your Phone</Text>
          </View>
          <Input
            style={styles.input}
            onChangeText={text => setText(text)}
            value={text}
            label="Temporary Code*"
            placeholder="Temporary Code"
          />
          <View
            style={[{alignItems: 'center', width: '100%', marginBottom: '5%'}]}>
            <Text>Resend Temporary Code</Text>
          </View>
          <View style={[{width: '85%'}]}>
            <Button
              title="Validate Temporary Code"
              size="large"
              className={styles.btn}
              onPress={nextStep}>
              Validate Temporary Code
            </Button>
          </View>
        </React.Fragment>
      );
    }
  };

  const renderValidationEmail = () => {
    if (showValidate === false) {
      return (
        <View style={[{width: '85%'}]}>
          <Button
            title="Validate"
            size="large"
            className={styles.btn}
            onPress={() => setShowValidate(true)}>
            Continue
          </Button>
        </View>
      );
    } else {
      return (
        <React.Fragment>
          <View
            style={[
              {alignItems: 'flex-start', width: '85%', marginBottom: '5%'},
            ]}>
            <Text>Enter the temporary Code that was sent to your Email</Text>
          </View>
          <Input
            style={styles.input}
            onChangeText={text => setText(text)}
            value={text}
            label="Temporary Code*"
            placeholder="Temporary Code"
          />
          <View
            style={[{alignItems: 'center', width: '100%', marginBottom: '5%'}]}>
            <Text>Resend Temporary Code</Text>
          </View>
          <View style={[{width: '85%'}]}>
            <Button
              title="Validate Temporary Code"
              size="large"
              className={styles.btn}
              onPress={nextStep}>
              Validate Temporary Code
            </Button>
          </View>
        </React.Fragment>
      );
    }
  };

  const renderInput = index => {
    if (index === 0) {
      return (
        <React.Fragment>
          <Input
            style={styles.input}
            onChangeText={text => setText(text)}
            value={text}
            label="Email*"
            placeholder="Email"
          />
          {renderValidationEmail()}
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Input
            style={styles.input}
            onChangeText={text => setText(text)}
            value={text}
            label="Phone Number*"
            placeholder="Phone"
          />
          {renderValidationPhone()}
        </React.Fragment>
      );
    }
  };

  return (
    <View style={[styles.container, styles.step2]}>
      <View>
        <Text style={styles.title}>Register Account</Text>
      </View>
      <View style={styles.formContainer}>
        <View
          style={[
            {alignItems: 'flex-start', width: '85%', marginBottom: '5%'},
          ]}>
          <Text category="h6" style={[{marginBottom: '5%'}]}>
            Please select login option:
          </Text>
          <RadioGroup
            selectedIndex={selectedIndex}
            onChange={index => {
              setSelectedIndex(index);
              setShowValidate(false);
            }}>
            <Radio>Email</Radio>
            <Radio>Phone Number</Radio>
          </RadioGroup>
        </View>
        {renderInput(selectedIndex)}
      </View>
    </View>
  );
};

export default Step2;
