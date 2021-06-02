import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Button } from '@ui-kitten/components';
import { useTranslation } from 'react-i18next';
import { Inset } from 'react-native-spacing-system';
import {
  CheckboxCard,
  NumericCountCard,
  DateTimePickerCard,
  DropDownPickerCard,
} from '_molecules';
import styles from './styles';
import { useTripDetails } from '_hooks';

const Step2 = ({ back , next }) => {
  const {
    tripDetails,
    onAdditionPassengersChange,
    onWheelchairRequiredChecked,
    onTripReasonSelected,
    onAppointmentDateTimeChange
  } = useTripDetails();
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
          count={tripDetails.additionalPassengers}
          onCountChange={value => onAdditionPassengersChange(value)}
        />
        <CheckboxCard
          cardIcon={'wheelchair-accessibility'}
          title={t('need_wheelchair')}
          checkedValue={tripDetails.wheelchairRequired}
          onChecked={value => onWheelchairRequiredChecked(value)}
        />
        <DateTimePickerCard
          required={true}
          cardIcon={'calendar-clock'}
          title={t('appointment_date_time')}
          description={
            tripDetails.appointmentDateTime && (
              <>
                {tripDetails.appointmentDate}{' '}
                {tripDetails.appointmentDate && tripDetails.appointmentTime
                  ? 'at ' + tripDetails.appointmentTime
                  : tripDetails.appointmentTime}
              </>
            )
          }
          minimumDate={new Date()}
          showDatePicker={true}
          showTimePicker={true}
          dateValue={tripDetails.appointmentDate}
          timeValue={tripDetails.appointmentTime}
          onDateTimeChange={(type, value) =>
            onAppointmentDateTimeChange(type, value)
          }
        />
        <DropDownPickerCard
         required={true}
         cardIcon={'information-outline'}
          title={t('trip_reason')}
          multiple={false}
          optionsList={tripReasons}
          selectedValue={tripDetails.tripReason}
          onOptionSelected={value => onTripReasonSelected(value)}
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
