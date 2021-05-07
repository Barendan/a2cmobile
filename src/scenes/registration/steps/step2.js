import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {Button, Input, Radio, RadioGroup} from '@ui-kitten/components';
import { useTranslation } from "react-i18next";
import styles from './styles';

const Step2 = ({back, next, saveState}) => {

  const { t } = useTranslation();

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
            title={t('validate')}
            size="large"
            className={styles.btn}
            onPress={() => setShowValidate(true)}>
            {t('continue')}
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
            <Text>{t('temp_code_text')}</Text>
          </View>
          <Input
            style={styles.input}
            onChangeText={text => setText(text)}
            value={text}
            label={t('temp_code')+"*"}
            placeholder={t('temp_code')}
          />
          <View
            style={[{alignItems: 'center', width: '100%', marginBottom: '5%'}]}>
            <Text>{t('resend_temp_code')}</Text>
          </View>
          <View style={[{width: '85%'}]}>
            <Button
              title={t('validate_temp_code')}
              size="large"
              className={styles.btn}
              onPress={nextStep}>
              {t('validate_temp_code')}
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
            <Text>{t('temp_code_email')}</Text>
          </View>
          <Input
            style={styles.input}
            onChangeText={text => setText(text)}
            value={text}
            label={t('temp_code')+"*"}
            placeholder={t('temp_code')}
          />
          <View
            style={[{alignItems: 'center', width: '100%', marginBottom: '5%'}]}>
            <Text>{t('resend_temp_code')}</Text>
          </View>
          <View style={[{width: '85%'}]}>
            <Button
              title={t('validate_temp_code')}
              size="large"
              className={styles.btn}
              onPress={nextStep}>
              {t('validate_temp_code')}
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
            label={t('email')+"*"}
            placeholder={t('email')}
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
            label={t('phone_number')+"*"}
            placeholder={t('phone_number')}
          />
          {renderValidationPhone()}
        </React.Fragment>
      );
    }
  };

  return (
    <View style={[styles.container, styles.step2]}>
      <View style={styles.formContainer}>
        <View
          style={[
            {alignItems: 'flex-start', width: '85%', marginBottom: '5%'},
          ]}>
          <Text category="h6" style={[{marginBottom: '5%'}]}>
            {t('login_option')}
          </Text>
          <RadioGroup
            selectedIndex={selectedIndex}
            onChange={index => {
              setSelectedIndex(index);
              setShowValidate(false);
            }}>
            <Radio>{t('email')}</Radio>
            <Radio>{t('phone_number')}</Radio>
          </RadioGroup>
        </View>
        {renderInput(selectedIndex)}
      </View>
    </View>
  );
};

export default Step2;
