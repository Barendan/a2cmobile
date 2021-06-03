import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Button } from '@ui-kitten/components';
import { useTranslation } from 'react-i18next';
import {
  CheckboxCard,
  NumericCountCard,
  DateTimePickerCard,
  DropDownPickerCard,
} from '_molecules';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles';
import { requireWheelChair, additionalPassenger, appointMentSchedule, enterTripReason, setSpecialNeeds } from '_store/steps';

const Step2 = ({ back , next }) => {

  const dispatch = useDispatch();
  const { steps } = useSelector(state => state.steps);
  
  const { additionalPassengers, wheelchairRequired, appointmentDateTime, tripReason, appointmentDate, appointmentTime, specialNeeds } = steps;

  const { t } = useTranslation();

  const [tripReasons, setTripReasons] = useState([
    { label: 'Routine Checkup', value: 'Routine Checkup' },
    { label: 'Monthly Appointment', value: 'Monthly Appointment' },
    { label: 'Yearly Physical', value: 'Yearly Physical' },
  ]);

  const nextStep = () => {
    next();
  };

  const goBack = () => {
    // Go to previous step
    back();
  };

  return (
    <View style={styles.container}>

      <ScrollView style={styles.formContainer}>        
        <NumericCountCard
          cardIcon={'account-multiple-outline'}
          title={t('additional_passengers')}
          count={additionalPassengers}
          onCountChange={value => dispatch(additionalPassenger(value))}
        />
        <CheckboxCard
          cardIcon={'wheelchair-accessibility'}
          title={t('need_wheelchair')}
          checkedValue={wheelchairRequired}
          onChecked={value => dispatch(requireWheelChair(value))}
        />
        <DateTimePickerCard
          required={true}
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
            dispatch(appointMentSchedule({type: type, value: value}))
          }
        />
        <DropDownPickerCard
         required={true}
         cardIcon={'information-outline'}
          title={t('trip_reason')}
          multiple={false}
          optionsList={tripReasons}
          selectedValue={tripReason}
          onOptionSelected={value => dispatch(enterTripReason(value?.value))}
          onOptionSelected={selected => dispatch(enterTripReason(selected?.value))}
        />
      </ScrollView>

      <View style={styles.footer}>
      <Button
          title={t('back')}
          size="large"
          appearance="outline"
          style={styles.backButton}
          onPress={goBack}>
          {t('back')}
        </Button>
        <Button
          title={t('continue')}
          size="large"
          style={styles.forwardButton}
          onPress={nextStep}>
          {t('continue')}
        </Button>
      </View>
    </View>
  );
};

export default Step2;
