import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView } from 'react-native';
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
  } = steps;

  const { t } = useTranslation();

  const [tripReasons, setTripReasons] = useState([
    { label: t('physician_services'), value: 'Physician Services' },
    { label: t('mental_health'), value: 'Mental Health Adult Rehab' },
    { label: t('pediatric_services'), value: 'Pediatric Services' },
    { label: t('drug_rehab'), value: 'Drug Rehabilitation' },
    { label: t('radiation_treatments'), value: 'Radiation Treatments' },
    { label: t('chemotherapy'), value: 'Chemotherapy' },
    { label: t('dialysis'), value: 'Dialysis' },
    { label: t('other'), value: 'Other Medical Related' },
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

        <CheckboxCard
          cardIcon={'wheelchair-accessibility'}
          title={t('need_wheelchair')}
          checkedValue={wheelchairRequired}
          moddedStyle={{
            height: verticalScale(55),
            borderWidth: 1,
            elevation: 10,
            backgroundColor: 'white',
          }}
          onChecked={value => dispatch(setRequiredWheelChair(value))}
        />

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
          onDateTimeChange={(type, value) => {
            dispatch(setAppointMentSchedule({ type: type, value: value }))
          }
          }
        />

        <DropDownPickerCard
          required={!tripReason ? true : false}
          cardIcon={'information-outline'}
          title={t('trip_reason')}
          multiple={false}
          optionsList={tripReasons}
          selectedValue={tripReason}
          onOptionSelected={value => dispatch(setTripReason(value?.value))}
        />

      </ScrollView>

      <View style={styles.footer}>
        <Button appearance="outline" style={styles.backButton} onPress={goBack}>
          <Text style={{ fontSize: moderateScale(16) }}>{t('back')}</Text>
        </Button>
        <Button
          disabled={isDisabled}
          style={styles.forwardButton}
          onPress={nextStep}>
          <Text style={{ fontSize: moderateScale(16) }}>{t('continue')}</Text>
        </Button>
      </View>

    </View>
  );
};

export default Step2;
