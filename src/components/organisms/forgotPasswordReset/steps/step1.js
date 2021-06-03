import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Input, Button } from '@ui-kitten/components';
import { useTranslation } from "react-i18next";
import Spinner from 'react-native-spinkit';
import { APP_COLOR } from '_styles/colors';
import { Stack } from 'react-native-spacing-system';
import styles from './styles';
import { useAccountMethods } from '_hooks';

const Step1 = ({ next, saveState }) => {

  const { t } = useTranslation();

  const {
    loading,
    errorMessage,
    loginMethod,
    disableNextButton,
    memberLogin,
    updateLoginMethod,
    onValidateMemberLogin
  } = useAccountMethods();

  React.useEffect(() => {
    if (memberLogin) {
      saveState({ memberLogin: memberLogin })

      next();
    }
  }, [memberLogin]);

  return (
    <View style={[styles.container]}>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.formContainer}>

        <View
          style={[
            { alignItems: 'flex-start', width: '85%', marginBottom: '5%' },
          ]}>

          <Text category="h6" style={[{ marginBottom: '5%' }]}>
            {t('login_options_text')}
          </Text>

        </View>

        <Input
          style={styles.input}
          onChangeText={text => updateLoginMethod('login', text)}
          value={loginMethod.login}
          label={t('login') + "*"}
          placeholder={t('login')}
        />

      </ScrollView>

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
      <View style={styles.footer}>

        <Button
          title={t('continue')}
          size="large"
          style={styles.forwardButton}
          disabled={disableNextButton || loading}
          onPress={onValidateMemberLogin}>
          {t('continue')}
        </Button>

      </View>


    </View>
  );
};

export default Step1;
