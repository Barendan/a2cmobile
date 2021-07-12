import React from 'react';
import { View, Text, ScrollView, TouchableHighlight } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Button, Input, Radio, RadioGroup } from '@ui-kitten/components';
import Spinner from 'react-native-spinkit';

import { OTPInput } from '_atoms';
import { useAccountMethods } from '_hooks';

import { APP_COLOR } from '_styles/colors';
import { Stack } from 'react-native-spacing-system';
import styles from './styles';

const Step2 = ({ back, next, getState, saveState }) => {
  const { t } = useTranslation();

  const {
    loading,
    errorMessage,
    disableNextButton,
    selectedIndex,
    randomGenerateCode,
    showValidate,
    memberLogin,
    loginMethod,
    setSelectedIndex,
    setRandomGenerateCode,
    onLoginMethod,
    onValidateTemporaryCode,
    onSendTempPassCode,
    setShowValidate,
  } = useAccountMethods();

  const { memberRecord } = getState();

  React.useEffect(() => {
    if (memberLogin) {
      saveState({ memberLogin: memberLogin });
      next();
    }
  }, [memberLogin]);

  const goBack = () => {
    saveState({ savedInfo: memberRecord });
    back();
  };

  return (
    <View style={[styles.container]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.formContainer}>
        <View
          style={[
            { alignItems: 'flex-start', width: '85%', marginBottom: '5%' },
          ]}>
          {memberRecord && (
            <Text category="h6" style={[{ marginBottom: '5%' }]}>
              {t('greeting-text')} {memberRecord.firstName}{' '}
              {memberRecord.lastName}
            </Text>
          )}

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
        {!showValidate && (
          <>
            {
              {
                0: (
                  <Input
                    style={styles.input}
                    onChangeText={text => onLoginMethod('email', text)}
                    value={loginMethod.login}
                    label={t('email') + '*'}
                    placeholder={t('email')}
                  />
                ),
                1: (
                  <Input
                    style={styles.input}
                    onChangeText={text => onLoginMethod('phone_number', text)}
                    value={loginMethod.login}
                    label={t('phone_number') + '*'}
                    placeholder={t('phone_number')}
                  />
                ),
              }[selectedIndex]
            }
          </>
        )}

        {showValidate && (
          <>
            <View
              style={[
                { alignItems: 'flex-start', width: '85%', marginBottom: '5%' },
              ]}>
              {
                {
                  0: (
                    <Text>
                      {t('temp_code_email')}:{' '}
                      <Text style={styles.highlightText}>
                        {loginMethod.login}
                      </Text>
                    </Text>
                  ),
                  1: (
                    <Text>
                      {t('temp_code_text')}:{' '}
                      <Text style={styles.highlightText}>
                        {loginMethod.login}
                      </Text>
                    </Text>
                  ),
                }[selectedIndex]
              }
            </View>
            {/* <Input
                        style={styles.input}
                        onChangeText={text => setRandomGenerateCode(text)}
                        value={loginMethod.tempCode}
                        label={t('temp_code') + "*"}
                        placeholder={t('temp_code')}
                    /> */}

            <OTPInput
              label={t('temp_code') + '*'}
              pinCount={4}
              codeValue={randomGenerateCode}
              onCodeChanged={code => setRandomGenerateCode(code)}
            />

            <Stack size={48} />

            <View
              style={[
                { alignItems: 'center', width: '100%', marginBottom: '5%' },
              ]}>
              <TouchableHighlight onPress={() => onSendTempPassCode()}>
                <Text style={styles.linkText}>{t('resend_temp_code')}</Text>
              </TouchableHighlight>
            </View>
          </>
        )}
      </ScrollView>

      <Text style={styles.errorMessage}>{errorMessage}</Text>
      {loading && (
        <View style={styles.loadingView}>
          <Spinner
            isVisible={loading}
            size={50}
            type={'ThreeBounce'}
            color={APP_COLOR}
          />
        </View>
      )}

      <Stack size={12} />
      <View style={styles.footer}>
        <Button
          title={t('back_button')}
          size="large"
          appearance="outline"
          style={styles.backButton}
          disabled={loading}
          onPress={goBack}>
          {t('back_button')}
        </Button>
        {showValidate ? (
          <Button
            title={t('validate_temp_code')}
            size="large"
            style={styles.forwardButton}
            disabled={randomGenerateCode.length === 0}
            onPress={onValidateTemporaryCode}>
            {t('validate_temp_code')}
          </Button>
        ) : (
          <Button
            title="Validate"
            size="large"
            style={styles.forwardButton}
            disabled={disableNextButton || loading}
            onPress={onSendTempPassCode}>
            {t('continue')}
          </Button>
        )}
      </View>
    </View>
  );
};

export default Step2;
