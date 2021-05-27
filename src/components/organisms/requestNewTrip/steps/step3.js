import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import {
  LocationSearchCard,
  CheckboxCard,
  NumericCountCard,
  DateTimePickerCard,
  DropDownPickerCard,
  TextInputCard,
} from '_organisms';
import styles from './styles';
import { Inset, Stack } from 'react-native-spacing-system';
import { useTripDetails } from './useTripDetails';

const step3 = ({ back, next, saveState }) => {
  const { tripDetails, onSpecialNeedsEntered, onRequestTrip } =
    useTripDetails();
  const { t } = useTranslation();

  return (
    <View style={[styles.container, styles.step3]}>
      <Text>Step 3</Text>

      <TextInputCard
        cardIcon={'handshake'}
        title={'Special Needs'}
        placeholder={'Provide all the special needs you will require'}
        textValue={tripDetails.specialNeeds}
        onChangeText={value => onSpecialNeedsEntered(value)}
      />

      <Stack size={12} />

      <View style={styles.callToActionBtnHolder}>
        <Inset all={16}>
          <TouchableOpacity style={styles.customBtnBGBack} onPress={back}>
            <Text style={styles.customBtnText}>{t('Back')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.customBtnBG}
            onPress={() => onRequestTrip()}>
            <Text style={styles.customBtnText}>{t('request_trip')}</Text>
          </TouchableOpacity>
        </Inset>
      </View>
    </View>
  );
};

export default step3;
