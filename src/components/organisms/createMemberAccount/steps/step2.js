import React from 'react';
import { View, Text, ScrollView, TouchableHighlight } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Button, Input, Radio, RadioGroup } from '@ui-kitten/components';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
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
            <Text style={styles.nameGreeting}>
              {t('greeting-text')} {memberRecord.firstName}{' '}
              {memberRecord.lastName},
            </Text>
          )}

          <Text style={{ fontSize: scale(10) }}>{t('login_option')}</Text>

          <View style={styles.radioGroup}>
            <RadioGroup
              selectedIndex={selectedIndex}
              onChange={index => {
                setSelectedIndex(index);
                setShowValidate(false);
              }}>
              <Radio>
                {() => <Text style={styles.radioText}>{t('email')}</Text>}
              </Radio>
              <Radio>
                {() => (
                  <Text style={styles.radioText}>{t('phone_number')}</Text>
                )}
              </Radio>
            </RadioGroup>
          </View>
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
                    label={() => (
                      <Text style={styles.inputLabel}>{t('email') + '*'}</Text>
                    )}
                    placeholder={t('email')}
                    textStyle={styles.inputText}
                  />
                ),
                1: (
                  <Input
                    style={styles.input}
                    onChangeText={text => onLoginMethod('phone_number', text)}
                    value={loginMethod.login}
                    label={() => (
                      <Text style={styles.inputLabel}>
                        {t('phone_number') + '*'}
                      </Text>
                    )}
                    placeholder={t('phone_number')}
                    textStyle={styles.inputText}
                  />
                ),
              }[selectedIndex]
            }
          </>
        )}

        {showValidate && (
          <View style={styles.radioGroup}>
            <View
              style={[
                { alignItems: 'flex-start', width: '85%', marginBottom: '5%' },
              ]}>
              {
                {
                  0: (
                    <Text style={styles.tempCode}>
                      {t('temp_code_email')}:{' '}
                      <Text style={styles.highlightText}>
                        {loginMethod.login}
                      </Text>
                    </Text>
                  ),
                  1: (
                    <Text style={styles.tempCode}>
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
                <Text style={[styles.linkText, styles.tempCode]}>
                  {t('resend_temp_code')}
                </Text>
              </TouchableHighlight>
            </View>
          </View>
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

      <View style={styles.footer}>
        <Button
          // title={t('back_button')}
          size="large"
          appearance="outline"
          style={styles.backButton}
          disabled={loading}
          onPress={goBack}>
          <Text style={{ fontSize: moderateScale(16) }}>
            {t('back_button')}
          </Text>
        </Button>
        {showValidate ? (
          <Button
            style={styles.forwardButton}
            disabled={randomGenerateCode.length === 0}
            onPress={onValidateTemporaryCode}>
            <Text style={{ fontSize: moderateScale(16) }}>
              {t('validate_temp_code')}
            </Text>
          </Button>
        ) : (
          <Button
            style={styles.forwardButton}
            disabled={disableNextButton || loading}
            onPress={onSendTempPassCode}>
            <Text style={{ fontSize: moderateScale(16) }}>{t('continue')}</Text>
          </Button>
        )}
      </View>
    </View>
  );
};

export default Step2;
