import React from 'react';
import { View, Text, ScrollView, TouchableHighlight } from 'react-native';
import { Button, Input, Radio, RadioGroup } from '@ui-kitten/components';
import { useTranslation } from 'react-i18next';
import Spinner from 'react-native-spinkit';
import { APP_COLOR } from '_styles/colors';
import { Stack } from 'react-native-spacing-system';
import styles from './styles';
import { OTPInput } from '_atoms';
import { useAccountMethods } from '_hooks';

const Step2 = ({ back, next, getState, saveState }) => {
  const { t } = useTranslation();

  const {
    loading,
    errorMessage,
    setErrorMessage,
    tempCodeValidated,
    loginMethod,
    randomGenerateCode,
    showValidate,
    setRandomGenerateCode,
    memberRecord,
    onValidateTemporaryCode,
    onSendTempPassCode,
    fetchMemberRecord,
    updateLoginMethod,
  } = useAccountMethods();

  const { memberLogin } = getState();

  const [pageLoaded, setPageLoaded] = React.useState(false);
  const [securityAnswersExist, setSecurityAnswersExist] = React.useState(false);
  const [
    disableSecurityAnswerButton,
    setDisableSecurityAnswerButton,
  ] = React.useState(false);

  const [securityAnswers, setSecurityAnswers] = React.useState({
    answerOne: '',
    answerTwo: '',
    answerThree: '',
  });

  const updateSecurityAnswers = React.useCallback((key, value) => {
    setSecurityAnswers(securityAnswers => {
      return {
        ...securityAnswers,
        [key]: value,
      };
    });
  }, []);

  React.useEffect(() => {
    if (tempCodeValidated) {
      next();
    }
  }, [tempCodeValidated]);

  React.useEffect(() => {
    fetchMemberRecord(memberLogin.id);
  }, []);

  React.useEffect(() => {
    setDisableSecurityAnswerButton(
      securityAnswers.answerOne.length === 0 ||
        securityAnswers.answerTwo.length === 0 ||
        securityAnswers.answerThree.length === 0,
    );
  }, [securityAnswers]);

  React.useEffect(() => {
    if (memberRecord != null) {
      setPageLoaded(true);
      if (
        memberRecord.SecurityQuestionOne &&
        memberRecord.SecurityQuestionTwo &&
        memberRecord.SecurityQuestionThree
      ) {
        setSecurityAnswersExist(true);
      } else {
        setSecurityAnswersExist(false);

        updateLoginMethod('loginType', memberRecord.loginType);
        updateLoginMethod('login', memberRecord.login);
      }
    }
  }, [memberRecord]);

  React.useEffect(() => {
    if (loginMethod.loginType.length > 0 && loginMethod.login.length > 0) {
      onSendTempPassCode();
    }
  }, [loginMethod]);

  const onValidateSecurityAnswers = () => {
    const {
      SecurityAnswerOne,
      SecurityAnswerTwo,
      SecurityAnswerThree,
    } = memberRecord;
    const { answerOne, answerTwo, answerThree } = securityAnswers;

    if (
      SecurityAnswerOne.toLowerCase() === answerOne.toLocaleLowerCase() &&
      SecurityAnswerTwo.toLowerCase() === answerTwo.toLocaleLowerCase() &&
      SecurityAnswerThree.toLowerCase() === answerThree.toLocaleLowerCase()
    ) {
      next();
    } else {
      setErrorMessage(t('wrong_answers_text'));
    }
  };

  const goBack = () => {
    // Go to previous step
    back();
  };

  return (
    <View style={[styles.container]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.formContainer}>
        <View
          style={[
            {
              alignItems: 'flex-start',
              width: '85%',
              marginBottom: Platform.OS === 'ios' ? '5%' : '3%',
            },
          ]}>
          {memberRecord && (
            <Text category="h6" style={[{ marginBottom: '5%' }]}>
              {t('greeting-text')} {memberRecord.login}
            </Text>
          )}
        </View>

        {pageLoaded && (
          <>
            {!securityAnswersExist && (
              <>
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

            {securityAnswersExist && memberRecord && (
              <>
                <Input
                  style={styles.input}
                  onChangeText={text =>
                    updateSecurityAnswers('answerOne', text)
                  }
                  value={securityAnswers.answerOne}
                  label={<Text>{memberRecord.SecurityQuestionOne}</Text>}
                  placeholder={t('question_answer')}
                />

                <Input
                  style={styles.input}
                  onChangeText={text =>
                    updateSecurityAnswers('answerTwo', text)
                  }
                  value={securityAnswers.answerTwo}
                  label={<Text>{memberRecord.SecurityQuestionTwo}</Text>}
                  placeholder={t('question_answer')}
                />

                <Input
                  style={styles.input}
                  onChangeText={text =>
                    updateSecurityAnswers('answerThree', text)
                  }
                  value={securityAnswers.answerThree}
                  label={<Text>{memberRecord.SecurityQuestionThree}</Text>}
                  placeholder={t('question_answer')}
                />
              </>
            )}
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
            disabled={disableSecurityAnswerButton || loading}
            onPress={onValidateSecurityAnswers}>
            {t('continue')}
          </Button>
        )}
      </View>
    </View>
  );
};

export default Step2;
