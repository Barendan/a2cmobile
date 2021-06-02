import React, { useState } from 'react';
import { View } from 'react-native';
import { Input, Button, Text } from '@ui-kitten/components';
import { useTranslation } from 'react-i18next';
import styles from './styles';

const Step3 = ({ back, next, saveState }) => {
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
    <View style={[styles.container, styles.step3]}>
      <View style={styles.formContainer}>
        <View
          style={[
            { alignItems: 'flex-start', width: '85%', marginBottom: '5%' },
          ]}>
          <Text category="s1" style={[{ marginBottom: '5%' }]}>
            {t('account_password_text')}
          </Text>
        </View>
        <Input
          style={styles.input}
          secureTextEntry={true}
          onChangeText={text => setText(text)}
          value={text}
          label={t('password') + '*'}
          placeholder={t('password')}
        />
        <Input
          style={styles.input}
          secureTextEntry={true}
          onChangeText={text => setText(text)}
          value={text}
          label={t('confirm_password') + '*'}
          placeholder={t('confirm_password')}
        />
      </View>
      <View style={[{ width: '85%' }]}>
        <Button
          title="Validate"
          size="large"
          className={styles.forwardButton}
          onPress={nextStep}>
          {t('complete_registration')} 
        </Button>
      </View>
    </View>
  );
};

export default Step3;
