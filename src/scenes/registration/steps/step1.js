import React from 'react';
import { View, Text } from 'react-native';
import { Input, Button } from '@ui-kitten/components';
import { useTranslation } from 'react-i18next';
import Spinner from 'react-native-spinkit';
import styles from './styles';
import moment from 'moment';
import { APP_COLOR } from '_styles/colors';
import { MemberService } from '_services';
import { Stack } from 'react-native-spacing-system';

const Step1 = ({ back, next, saveState }) => {
  const { t } = useTranslation();

  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [memberRecord, setMemberRecord] = React.useState(null);
  const [disableNextButton, setDisableNextButton] = React.useState(false);

  //Member Information
  const [memberInformation, setMemberInformation] = React.useState({
    memberID: '',
    dateOfBirth: '',
    zipcode: '',
  });

  const updateMemberInformation = React.useCallback((key, value) => {
    setMemberInformation(memberInformation => {
      return {
        ...memberInformation,
        [key]: value,
      };
    });
  }, []);

  const onValidateMemberInfo = () => {
    const { memberID, dateOfBirth, zipcode } = memberInformation;

    setErrorMessage('');
    setMemberRecord(null);
    setLoading(true);
    MemberService.validateMemberInfo(memberID, dateOfBirth, zipcode)
      .then(data => {
        setLoading(false);
        setMemberRecord(data);
        saveState({ memberRecord: data.memberInfo });
        next();
      })
      .catch(err => {
        //alert(JSON.stringify(err))
        setErrorMessage(err.message);
        setLoading(false);
      });
  };

  const nextStep = () => {
    //const {next, saveState} = this.props;
    // Save state for use in other steps
    saveState({ name: 'samad' });
    next();
  };

  React.useEffect(() => {
    setDisableNextButton(
      memberInformation.memberID.length === 0 ||
        memberInformation.dateOfBirth.length === 0 ||
        memberInformation.zipcode.length < 5,
    );
  }, [memberInformation]);

  const onDateOfBirth = value => {
    if (value.length < 11) {
      let formattedDob = value
        .replace(/^(\d\d)(\d)$/g, '$1/$2')
        .replace(/^(\d\d\/\d\d)(\d+)$/g, '$1/$2')
        .replace(/[^\d\/]/g, '');
      updateMemberInformation('dateOfBirth', formattedDob);
    }
  };

  const isDOBValid = (dob, age = null) => {
    if (!moment(dob).isValid()) return false;

    const minAge = age || 15;
    const maxAge = 105;

    if (moment().diff(dob, 'years', false) > maxAge) return false; //check max age
    if (moment().diff(dob, 'years', true) < minAge) return false; //check min age
    if (moment().diff(dob, 'days', true) < 1) return false; //today && future

    return true;
  };

  const onZipcode = value => {
    if (value.length < 6) {
      let formattedZipcode = value.replace(/[^\d\/]/g, '');
      updateMemberInformation('zipcode', formattedZipcode);
    }
  };

  return (
    <View style={[styles.container, styles.step1]}>
      <View style={styles.formContainer}>
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
          placeholder={t('date_of_birth') + ': MM/dd/yyyy'}
          pattern="[0-9]*"
        />
        <Input
          style={styles.input}
          onChangeText={text => onZipcode(text)}
          value={memberInformation.zipcode}
          label={t('zipcode') + '*'}
          placeholder={t('zipcode')}
        />
      </View>

      <Text>{JSON.stringify(memberRecord)}</Text>

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

      <View
        style={[
          {
            width: '85%',
            justifyContent: 'space-around',
            flexDirection: 'row',
          },
        ]}>
        <Button
          title={t('validate')}
          size="large"
          style={styles.forwardButton}
          // disabled={disableNextButton || !loading}
          onPress={nextStep}>
          {t('validate')}
        </Button>
      </View>
    </View>
  );
};

export default Step1;
