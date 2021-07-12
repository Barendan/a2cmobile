import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import Spinner from 'react-native-spinkit';
import { Stack } from 'react-native-spacing-system';
import { Input, Button } from '@ui-kitten/components';

import { useAccountMethods } from '_hooks';

import { APP_COLOR } from '_styles/colors';
import styles from './styles';

const Step1 = ({ next, saveState, getState }) => {
  const { t } = useTranslation();

  const {
    loading,
    errorMessage,
    memberInformation,
    disableNextButton,
    memberRecord,
    updateMemberInformation,
    onDateOfBirth,
    onZipcode,
    onValidateMemberInfo,
  } = useAccountMethods();

  const { savedInfo } = getState();

  React.useEffect(() => {
    savedInfo ? fillInput(savedInfo) : null;
  }, []);

  React.useEffect(() => {
    if (memberRecord) {
      saveState({ memberRecord: memberRecord });
      next();
    }
  }, [memberRecord]);

  const fillInput = ({ memberID, dob, Zip }) => {
    updateMemberInformation('memberID', memberID);
    onDateOfBirth(dob);
    // onZipcode(Zip);
  };

  return (
    <View style={[styles.container]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.formContainer}>
        <Input
          style={styles.input}
          onChangeText={text => updateMemberInformation('memberID', text)}
          value={memberInformation.memberID}
          label={t('member_id') + '*'}
          placeholder={t('member_id')}
        />
        <Input
          style={styles.input}
          onChangeText={text => onDateOfBirth(text)}
          value={memberInformation.dateOfBirth}
          label={t('date_of_birth') + '*'}
          placeholder={t('date_of_birth') + ': mm/dd/yyyy'}
          pattern="[0-9]*"
        />
        <Input
          style={styles.input}
          onChangeText={text => onZipcode(text)}
          value={memberInformation.zipcode}
          label={t('zipcode') + '*'}
          placeholder={t('zipcode')}
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

      <Stack size={12} />
      <View style={styles.footer}>
        <Button
          title={t('validate')}
          size="large"
          style={styles.forwardButton}
          disabled={disableNextButton || loading}
          onPress={onValidateMemberInfo}>
          {t('validate')}
        </Button>
      </View>
    </View>
  );
};

export default Step1;
