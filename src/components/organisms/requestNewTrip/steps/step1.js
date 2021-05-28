import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { LocationSearchCard, CheckboxCard } from '_organisms';
import { Inset } from 'react-native-spacing-system';
import styles from './styles';
import { useTripDetails } from '../../../../hooks/useTripDetails';

const Step1 = ({ next }) => {
  const { tripDetails, onRoundTripChecked } = useTripDetails();
  const { t } = useTranslation();

  return (
    <View>
      <Text>{t('step')} 1</Text>
      <LocationSearchCard
        locationIndex={0}
        title={t('pickup_address')}
        description={
          tripDetails.pickupAddress
            ? tripDetails.pickupAddress.FormattedAddress
            : t('pickup_address_alt')
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
        title={'Is this a round trip?'}
        checkedValue={tripDetails.isRoundTrip}
        onChecked={value => onRoundTripChecked(value)}
      />
      <View style={styles.callToActionBtnHolder}>
        <Inset all={16}>
          <TouchableOpacity style={styles.customBtnBG} onPress={next}>
            <Text style={styles.customBtnText}>{t('continue')}</Text>
          </TouchableOpacity>
        </Inset>
      </View>
    </View>
  );
};

export default Step1;
