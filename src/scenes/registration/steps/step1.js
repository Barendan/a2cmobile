import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Input, Button } from '@ui-kitten/components';
import { useTranslation } from "react-i18next";
import styles from './styles';

const Step1 = ({ back, next, saveState }) => {

  const { t } = useTranslation();

  const [text, setText] = useState('');

  const nextStep = () => {
    //const {next, saveState} = this.props;
    // Save state for use in other steps
    saveState({ name: 'samad' });
    next();
  };

  const goBack = () => {
    back();
  };

  return (
    <View style={[styles.container, styles.step1]}>
      <View style={styles.formContainer}>
        <Input
          style={styles.input}
          onChangeText={text => setText(text)}
          value={text}
          label={t('member_id') + "*"}
          placeholder={t('member_id')}
        />
        <Input
          style={styles.input}
          onChangeText={text => setText(text)}
          value={text}
          label={t('date_of_birth') + "*"}
          placeholder={t('date_of_birth')}
        />
        <Input
          style={styles.input}
          onChangeText={text => setText(text)}
          value={text}
          label={t('zipcode') + "*"}
          placeholder={t('zipcode')}
        />
      </View>
      <View style={[{ width: '85%' }]}>
        <Button
          title={t('validate')}
          size="large"
          className={styles.btn}
          onPress={nextStep}>
          {t('validate')}
        </Button>
      </View>
    </View>
  );
};

export default Step1;
