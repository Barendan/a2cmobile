import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { TextInputCard } from '_organisms';
import styles from './styles';
import { Inset, Stack } from 'react-native-spacing-system';
import { useTripDetails } from '../../../../hooks/useTripDetails';

const Step3 = ({ back }) => {
  const { tripDetails, onSpecialNeedsEntered, onRequestTrip } =
    useTripDetails();
  const { t } = useTranslation();

  return (
    <View style={[styles.container, styles.step3]}>
      <Text>{t('step')} 3</Text>

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
            <Text style={styles.customBtnText}>{t('back')}</Text>
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

export default Step3;
