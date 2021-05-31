import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Button, Input, Radio, RadioGroup } from '@ui-kitten/components';
import { useTranslation } from "react-i18next";
import styles from './styles';

const Step2 = ({ back, next, saveState }) => {

  const { t } = useTranslation();

  const [text, setText] = useState('');
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [showValidate, setShowValidate] = React.useState(false);

  const nextStep = () => {
    // Save state for use in other steps
    saveState({ name: 'samad' });

    // Go to next step
    next();
  };

  const goBack = () => {
    // Go to previous step
    back();
  };

  return (
    <View style={[styles.container, styles.step2]}>
      <View style={styles.formContainer}>
        <View
          style={[
            { alignItems: 'flex-start', width: '85%', marginBottom: '5%' },
          ]}>
          <Text category="h6" style={[{ marginBottom: '5%' }]}>
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
        {{
          0: <Input
            style={styles.input}
            onChangeText={text => setText(text)}
            value={text}
            label={t('email') + "*"}
            placeholder={t('email')}
          />,
          1: <Input
            style={styles.input}
            onChangeText={text => setText(text)}
            value={text}
            label={t('phone_number') + "*"}
            placeholder={t('phone_number')}
          />
        }[selectedIndex]}

        {showValidate && <>
          <View
            style={[
              { alignItems: 'flex-start', width: '85%', marginBottom: '5%' },
            ]}>
            {{
              0: <Text>{t('temp_code_email')}</Text>,
              1: <Text>{t('temp_code_text')}</Text>
            }[selectedIndex]}
          </View>
          <Input
            style={styles.input}
            onChangeText={text => setText(text)}
            value={text}
            label={t('temp_code') + "*"}
            placeholder={t('temp_code')}
          />
          <View
            style={[{ alignItems: 'center', width: '100%', marginBottom: '5%' }]}>
            <Text>{t('resend_temp_code')}</Text>
          </View>
        </>}
      </View>
      <View style={[{ width: '85%', justifyContent: 'space-around', flexDirection: 'row' }]}>
        <Button
          title={t('back_button')}
          size="large"
          appearance="outline"
          style={styles.backButton}
          onPress={goBack}>
          {t('back_button')}
        </Button>
        {showValidate ? <Button
          title={t('validate_temp_code')}
          size="large"
          style={styles.forwardButton}
          onPress={nextStep}>
          {t('validate_temp_code')}
        </Button> : <Button
          title="Validate"
          size="large"
          style={styles.forwardButton}
          onPress={() => setShowValidate(true)}>
          {t('continue')}
        </Button>}
      </View>
    </View>
  );
};

export default Step2;
