import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Button } from '@ui-kitten/components';
import { useTranslation } from 'react-i18next';
import { LocationSearchCard, CheckboxCard } from '_molecules';
import { Inset } from 'react-native-spacing-system';
import styles from './styles';
import { useTripDetails } from '_hooks';

const Step1 = ({ next }) => {
  const { tripDetails, onRoundTripChecked, onAddressSelected } = useTripDetails();
  const { t } = useTranslation();

  const nextStep = () => {
    next();
  };

  return (
    <View style={[styles.container]}>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.formContainer}>
        <LocationSearchCard
          required={true}
          locationIndex={0}
          title={t('pickup_address')}
          description={
            tripDetails.pickupAddress
              ? tripDetails.pickupAddress.FormattedAddress
              : t('pickup_address_description')
          }
          onAddressSelected={addr => onAddressSelected('pickupAddress', addr)}
        />
        {tripDetails.tripStops.map((currentStop, index) => (
          <>
            <LocationSearchCard
              disableClick={true}
              icon={'minus'}
              iconColor={GRAY_BLUE}
              showBorder={true}
              title={t('trip_stop') + (index + 1)}
              description={currentStop.FormattedAddress}
              onPress={() => deleteTripStop(index)}
            />
          </>
        ))}
        <LocationSearchCard
          showBorder={true}
          dashedBorder={true}
          title={t('add_stop_title')}
          description={t('add_stop_description')}
          onAddressSelected={addr => onAddressSelected('tripStops', addr)}
        />
        <LocationSearchCard
          required={true}
          locationIndex={1}
          title={t('destination_address')}
          description={
            tripDetails.destinationAddress
              ? tripDetails.destinationAddress.FormattedAddress
              : t('destination_address_description')
          }
          onAddressSelected={addr =>
            onAddressSelected('destinationAddress', addr)
          }
        />
        <CheckboxCard
          cardIcon={'swap-horizontal'}
          title={t('round_trip')}
          checkedValue={tripDetails.isRoundTrip}
          onChecked={value => onRoundTripChecked(value)}
        />
      </ScrollView>

      <View style={styles.footer}>

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

export default Step1;
