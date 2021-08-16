import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Input, Button } from '@ui-kitten/components';
import { Stack } from 'react-native-spacing-system';
import Spinner from 'react-native-spinkit';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

import { useAccountMethods } from '_hooks';
import { APP_COLOR } from '_styles/colors';
import styles from './styles';

const Step1 = ({ next, saveState }) => {
  const { t } = useTranslation();

  const {
    loading,
    errorMessage,
    loginMethod,
    disableNextButton,
    memberLogin,
    updateLoginMethod,
    onValidateMemberLogin,
    passwordResetLogin,
  } = useAccountMethods();

  React.useEffect(() => {
    if (memberLogin) {
      saveState({ memberLogin: memberLogin });

      next();
    }
  }, [memberLogin]);

  return (
    // <KeyboardAwareScrollView>
    <View style={[styles.container]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.formContainer}>
        <View style={[{ alignItems: 'flex-start', width: '85%' }]}>
          <Text style={{ marginBottom: '5%', fontSize: scale(10) }}>
            {t('login_options_text')}
          </Text>
        </View>

        <Input
          style={[styles.input]}
          onChangeText={text => passwordResetLogin(text)}
          value={loginMethod.login}
          label={() => (
            <Text style={styles.inputLabel}>{t('login') + '*'}</Text>
          )}
          placeholder={t('login')}
          textStyle={styles.inputText}
        />
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
          title={t('continue')}
          style={styles.forwardButton}
          disabled={disableNextButton || loading}
          onPress={onValidateMemberLogin}>
          <Text style={{ fontSize: moderateScale(16) }}>{t('continue')}</Text>
        </Button>
      </View>
    </View>
    // </KeyboardAwareScrollView>
  );
};

export default Step1;
