import React from 'react';
import { View, Text, ScrollView, TouchableHighlight } from 'react-native';
import { Input, Button } from '@ui-kitten/components';
import { useTranslation } from 'react-i18next';
import Spinner from 'react-native-spinkit';
import { moderateScale } from 'react-native-size-matters';

import { useAccountMethods } from '_hooks';
import { APP_COLOR } from '_styles/colors';
import styles from './styles';

const Step1 = ({ finish, next, saveState, getState }) => {
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

  <Text style={styles.inputLabel}>{t('login') + '*'}</Text>;

  return (
    <View style={[styles.container]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.formContainer}>

        <View style={[{ alignItems: 'flex-start', width: '85%' }]}>
          <Text style={{ marginBottom: '5%', fontSize: moderateScale(14) }}>
            {t('register_info')}
          </Text>
        </View>

        <Input
          style={styles.input}
          onChangeText={text => updateMemberInformation('memberID', text)}
          value={memberInformation.memberID}
          label={() => (
            <Text style={styles.inputLabel}>{t('member_id') + '*'}</Text>
          )}
          placeholder={t('member_id')}
          textStyle={styles.inputText}
        />

        <Input
          style={styles.input}
          onChangeText={text => onDateOfBirth(text)}
          value={memberInformation.dateOfBirth}
          label={() => (
            <Text style={styles.inputLabel}>{t('date_of_birth') + '*'}</Text>
          )}
          placeholder='mm/dd/yyyy'
          pattern="[0-9]*"
          textStyle={styles.inputText}
        />

        <Input
          style={styles.input}
          onChangeText={text => onZipcode(text)}
          value={memberInformation.zipcode}
          label={() => (
            <Text style={styles.inputLabel}>{t('zipcode') + '*'}</Text>
          )}
          placeholder={t('zipcode')}
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
          style={styles.forwardButton}
          disabled={disableNextButton || loading}
          onPress={onValidateMemberInfo}>
          <Text style={{ fontSize: moderateScale(18) }}>{t('validate')}</Text>
        </Button>
      </View>
      
    </View>
  );
};

export default Step1;
