import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@ui-kitten/components';
import { useTranslation } from 'react-i18next';
import Spinner from 'react-native-spinkit';
import moment from 'moment';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

import { setSpecialNeeds } from '_store/steps';
import { MemberService } from '_services';
import { TextInputCard } from '_molecules';
import { APP_COLOR } from '_styles/colors';
import styles from './styles';

const Step3 = ({ back, next }) => {
  // const [isLoading, setIsLoading] = React.useState(false);
  // const [errorMessage, setErrorMessage] = React.useState('');
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { steps } = useSelector(state => state.steps);
  // const { user } = useSelector(state => state.user);

  const { specialNeeds } = steps;

  const nextStep = () => {
    next();
  };

  const goBack = () => {
    back();
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.formContainer}>
        <TextInputCard
          // required={specialNeeds.length === 0 ? true : false}
          cardIcon={'handshake'}
          title={t('special_needs')}
          placeholder={t('special_needs_required')}
          textValue={specialNeeds}
          onChangeText={value => dispatch(setSpecialNeeds(value))}
        />
      </ScrollView>

      <View style={styles.footer}>
        <Button appearance="outline" style={styles.backButton} onPress={goBack}>
          <Text style={{ fontSize: moderateScale(16) }}>{t('back')}</Text>
        </Button>
        <Button
          // disabled={isLoading}
          style={styles.forwardButton}
          onPress={nextStep}>
          <Text style={{ fontSize: moderateScale(16) }}>{t('continue')}</Text>
        </Button>
      </View>
    </View>
  );
};

export default Step3;
