import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Inset } from 'react-native-spacing-system';
import {
  CheckboxCard,
  NumericCountCard,
  DateTimePickerCard,
  DropDownPickerCard,
} from '_organisms';
import styles from './styles';
import { useTripDetails } from '../../../../hooks/useTripDetails';

const Step2 = ({ back, next }) => {
  const {
    tripDetails,
    onAdditionPassengersChange,
    onWheelchairRequiredChecked,
  } = useTripDetails();
  const { t } = useTranslation();

  const [tripReasons, setTripReasons] = useState([
    { label: 'Routine Checkup', value: 'Routine Checkup' },
    { label: 'Monthly Appointment', value: 'Monthly Appointment' },
    { label: 'Yearly Physical', value: 'Yearly Physical' },
  ]);

  return (
    <View style={[styles.container, styles.step2]}>
      <Text>{t('step')} 2</Text>

      <NumericCountCard
        cardIcon={'account-multiple-outline'}
        title={'Additional Passengers'}
        count={tripDetails.additionalPassengers}
        onCountChange={value => onAdditionPassengersChange(value)}
      />
      <CheckboxCard
        cardIcon={'wheelchair-accessibility'}
        title={'Do you need a Wheelchair?'}
        checkedValue={tripDetails.wheelchairRequired}
        onChecked={value => onWheelchairRequiredChecked(value)}
      />
      <DateTimePickerCard
        cardIcon={'calendar-clock'}
        title={'Appointment Date & Time'}
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
        cardIcon={'information-outline'}
        title={'Trip Reason'}
        multiple={false}
        optionsList={tripReasons}
        selectedValue={tripDetails.tripReason}
        onOptionSelected={value => onTripReasonSelected(value)}
      />
      <View style={styles.callToActionBtnHolder}>
        <Inset all={16}>
          <TouchableOpacity style={styles.customBtnBGBack} onPress={back}>
            <Text style={styles.customBtnText}>{t('back')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.customBtnBG} onPress={next}>
            <Text style={styles.customBtnText}>{t('continue')}</Text>
          </TouchableOpacity>
        </Inset>
      </View>
    </View>
  );
};

export default Step2;
