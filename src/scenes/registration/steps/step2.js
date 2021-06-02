import React, { useState } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { Button, Input, Radio, RadioGroup } from '@ui-kitten/components';
import { useTranslation } from "react-i18next";
import Spinner from 'react-native-spinkit';
import styles from './styles';
import { APP_COLOR } from '_styles/colors';
import { MemberService } from '_services';
import { HelperMethods } from '_helpers';

import { Stack } from 'react-native-spacing-system';

const Step2 = ({ back, next, saveState, getState }) => {

  const { t } = useTranslation();
  const { memberRecord } = getState();

  const [randomGenerateCode, setRandomGenerateCode] = useState('');
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [showValidate, setShowValidate] = React.useState(false);



  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [memberLogin, setMemberLogin] = React.useState(null);
  const [disableNextButton, setDisableNextButton] = React.useState(false);




  //Member Login Information
  const [loginMethod, setLoginMethod] = React.useState({
    sendType: '',
    login: '',
    tempCode: ''
  });

  const updateLoginMethod = React.useCallback((key, value) => {
    setLoginMethod(loginMethod => {
      return {
        ...loginMethod,
        [key]: value,
      };
    });
  }, []);


  //when selected index, generate random generated code that will be emailed/texted to member
  React.useEffect(() => {
    updateLoginMethod('sendType', selectedIndex === 0 ? 'email' : 'phone');
    updateLoginMethod('login', '');
    let randomCode = Math.floor(1000 + Math.random() * 9000);
    updateLoginMethod('tempCode', randomCode);
  }, [selectedIndex]);

  //check if valid email or sendType method is set
  React.useEffect(() => {
    setDisableNextButton(loginMethod.sendType.length === 0 || (loginMethod.sendType === "email" ? !HelperMethods.isValidEmail(loginMethod.login) : loginMethod.login.length < 9));

    if(loginMethod.login.length === 0){
      setShowValidate(false);
    }

  }, [loginMethod]);


  //allow only digits for phone numbers
  const onLoginMethod = (type, value) => {

    let formattedValue = value;
    if (type === 'phone') {
      formattedValue = value.replace(/[^\d\/]/g, '');
    }
    updateLoginMethod('login', formattedValue);
  }

  const onSendTempPassCode = () => {

    let payload = {
      sendType: loginMethod.sendType,
      login: loginMethod.login,
      tempCode: loginMethod.tempCode
    };

    setErrorMessage('');
    setLoading(true);

    MemberService.sendTempPassCode(payload)
      .then((data) => {
        setLoading(false);
        setShowValidate(true);
      })
      .catch((err) => {
        //alert(JSON.stringify(err))
        setErrorMessage(err.message);
        setLoading(false);
      });

  }

  const onValidateTemporaryCode = () => {
    const { tempCode } = loginMethod;

    alert(randomGenerateCode + '-' + tempCode);
    if(randomGenerateCode != tempCode) {
      setErrorMessage(t('temp_code_error'));
    } else {
      saveState({ memberLoginMethod: loginMethod });
      setErrorMessage('');
      next();

    }
  }


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

          {memberRecord && <Text category="h6" style={[{ marginBottom: '5%' }]}>
            {t('greeting-text')} {memberRecord.firstName} {memberRecord.lastName}
          </Text>}

          <Stack size={12} />

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
        {!showValidate && <>
        {{
          0: <Input
            style={styles.input}
            onChangeText={text => onLoginMethod('email', text)}
            value={loginMethod.login}
            label={t('email') + "*"}
            placeholder={t('email')}
          />,
          1: <Input
            style={styles.input}
            onChangeText={text => onLoginMethod('phone', text)}
            value={loginMethod.login}
            label={t('phone_number') + "*"}
            placeholder={t('phone_number')}
          />
        }[selectedIndex]}
        </>}

        {showValidate && <>
          <View
            style={[
              { alignItems: 'flex-start', width: '85%', marginBottom: '5%' },
            ]}>
            {{
              0: <Text>{t('temp_code_email')}: <Text style={styles.highlightText}>{loginMethod.login}</Text></Text>,
              1: <Text>{t('temp_code_text')}: <Text style={styles.highlightText}>{loginMethod.login}</Text></Text>
            }[selectedIndex]}
          </View>
          <Input
            style={styles.input}
            onChangeText={text => setRandomGenerateCode(text)}
            value={loginMethod.tempCode}
            label={t('temp_code') + "*"}
            placeholder={t('temp_code')}
          />
          <View style={[{ alignItems: 'center', width: '100%', marginBottom: '5%' }]}>
            <TouchableHighlight onPress={() => onSendTempPassCode()}><Text style={styles.linkText}>{t('resend_temp_code')}</Text></TouchableHighlight>
          </View>
        </>}
      </View>


      <Text>{JSON.stringify(memberRecord)}</Text>

      <Stack size={12} />

      <Text>{JSON.stringify(loginMethod)}</Text>


      <Text style={styles.errorMessage}>{errorMessage}</Text>
      {loading && <View style={styles.loadingView}>
        <Spinner
          isVisible={loading}
          size={50}
          type={'ThreeBounce'}
          color={APP_COLOR}
        />
      </View>}

      <Stack size={12} />

      <View style={[{ width: '85%', justifyContent: 'space-around', flexDirection: 'row' }]}>
        <Button
          title={t('back_button')}
          size="large"
          appearance="outline"
          style={styles.backButton}
          disabled={loading}
          onPress={goBack}>
          {t('back_button')}
        </Button>
        {showValidate ? <Button
          title={t('validate_temp_code')}
          size="large"
          style={styles.forwardButton}
          disabled={randomGenerateCode.length === 0}
          onPress={onValidateTemporaryCode}>
          {t('validate_temp_code')}
        </Button> : <Button
          title="Validate"
          size="large"
          style={styles.forwardButton}
          disabled={disableNextButton || loading}
          onPress={onSendTempPassCode}>
          {t('continue')}
        </Button>}
      </View>
    </View>
  );
};

export default Step2;
