import React from 'react';
import { View, ScrollView } from 'react-native';
import { Button } from '@ui-kitten/components';
import { useTranslation } from 'react-i18next';
import { TextInputCard } from '_molecules';
import styles from './styles';
import { Inset, Stack } from 'react-native-spacing-system';
import { useTripDetails } from '_hooks';

const Step3 = ({ back }) => {
  const { tripDetails, onSpecialNeedsEntered, onRequestTrip } = useTripDetails();
  const { t } = useTranslation();


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
          required={true}
          cardIcon={'handshake'}
          title={t('special_needs')}
          placeholder={t('special_needs_required')}
          textValue={tripDetails.specialNeeds}
          onChangeText={value => onSpecialNeedsEntered(value)}
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
          title={t('request_trip')}
          size="large"
          style={styles.forwardButton}
          onPress={() => onRequestTrip()}>
          {t('request_trip')}
        </Button>
      </View>

    </View>
  );
};

export default Step3;
