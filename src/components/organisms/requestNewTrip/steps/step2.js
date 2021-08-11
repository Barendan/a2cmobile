import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { Button } from '@ui-kitten/components';
import { useTranslation } from 'react-i18next';
import { Inset, Stack } from 'react-native-spacing-system';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

import {
  CheckboxCard,
  NumericCountCard,
  DateTimePickerCard,
  DropDownPickerCard,
} from '_molecules';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles';
import {
  setRequiredWheelChair,
  setAdditionalPassenger,
  setAppointMentSchedule,
  setTripReason,
} from '_store/steps';

const Step2 = ({ back, next }) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const dispatch = useDispatch();
  const { steps } = useSelector(state => state.steps);

  const {
    additionalPassengers,
    wheelchairRequired,
    appointmentDateTime,
    tripReason,
    appointmentDate,
    appointmentTime,
    specialNeeds,
  } = steps;

  const { t } = useTranslation();

  const [tripReasons, setTripReasons] = useState([
    { label: 'Physician Services', value: 'Physician Services' },
    { label: 'Mental Health', value: 'Mental Health Adult Rehab' },
    { label: 'Pediatric Services', value: 'Pediatric Services' },
    { label: 'Drug Rehab', value: 'Drug Rehabilitation' },
    { label: 'Radiation Treatments', value: 'Radiation Treatments' },
    { label: 'Chemotherapy', value: 'Chemotherapy' },
    { label: 'Dialysis', value: 'Dialysis' },
    { label: 'Other', value: 'Other Medical Related' },
  ]);

  const nextStep = () => {
    next();
  };

  const goBack = () => {
    // Go to previous step
    back();
  };

  useEffect(() => {
    if (appointmentDateTime && tripReason) {
      setIsDisabled(false);
    }
  }, [appointmentDateTime, tripReason]);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.formContainer}>
        <NumericCountCard
          cardIcon={'account-multiple-outline'}
          title={t('additional_passengers')}
          count={additionalPassengers}
          onCountChange={value => dispatch(setAdditionalPassenger(value))}
        />
        <Stack size={moderateScale(12)} />
        <CheckboxCard
          cardIcon={'wheelchair-accessibility'}
          title={t('need_wheelchair')}
          checkedValue={wheelchairRequired}
          onChecked={value => dispatch(setRequiredWheelChair(value))}
        />
        <Stack size={moderateScale(12)} />
        <DateTimePickerCard
          required={!appointmentDate || !appointmentTime ? true : false}
          cardIcon={'calendar-clock'}
          title={t('appointment_date_time')}
          description={
            appointmentDateTime && (
              <>
                {appointmentDate}{' '}
                {appointmentDate && appointmentTime
                  ? 'at ' + appointmentTime
                  : appointmentTime}
              </>
            )
          }
          minimumDate={new Date()}
          showDatePicker={true}
          showTimePicker={true}
          dateValue={appointmentDate}
          timeValue={appointmentTime}
          onDateTimeChange={(type, value) =>
            dispatch(setAppointMentSchedule({ type: type, value: value }))
          }
        />
        <Stack size={moderateScale(12)} />
        <DropDownPickerCard
          required={!tripReason ? true : false}
          cardIcon={'information-outline'}
          title={t('trip_reason')}
          multiple={false}
          optionsList={tripReasons}
          selectedValue={tripReason}
          onOptionSelected={value => dispatch(setTripReason(value?.value))}
        />
        <Stack size={moderateScale(12)} />
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title={() => <Text style={{ fontSize: 60 }}>{t('back')}</Text>}
          // size="large"
          appearance="outline"
          style={styles.backButton}
          onPress={goBack}>
          {t('back')}
        </Button>
        <Button
          title={t('continue')}
          titleStyle={{ fontSize: 50 }}
          size="large"
          style={styles.forwardButton}
          disabled={isDisabled}
          onPress={nextStep}>
          {t('continue')}
        </Button>
      </View>
    </View>
  );
};

export default Step2;
