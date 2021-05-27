import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { LocationSearchCard, CheckboxCard } from '_organisms';
import { Inset } from 'react-native-spacing-system';
import styles from './styles';
import { useTripDetails } from './useTripDetails';

const step1 = ({ next }) => {
  const { tripDetails, onRoundTripChecked } = useTripDetails();
  const { t } = useTranslation();

  return (
    <View>
      <Text>Step 1</Text>

      <LocationSearchCard
        locationIndex={0}
        title={'Pickup Address'}
        description={
          tripDetails.pickupAddress
            ? tripDetails.pickupAddress.FormattedAddress
            : 'This is the location where you will be picked up from'
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
            title={'Trip Stop ' + (index + 1)}
            description={currentStop.FormattedAddress}
            onPress={() => deleteTripStop(index)}
          />
        </>
      ))}

      <LocationSearchCard
        showBorder={true}
        dashedBorder={true}
        title={'Add A Stop (Optional)'}
        description={'Add a stop address on your way to your destination'}
        onAddressSelected={addr => onAddressSelected('tripStops', addr)}
      />

      <LocationSearchCard
        locationIndex={1}
        title={'Destination Address'}
        description={
          tripDetails.destinationAddress
            ? tripDetails.destinationAddress.FormattedAddress
            : 'This is the location where you will be dropped off'
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
            <Text style={styles.customBtnText}>{t('Continue')}</Text>
          </TouchableOpacity>
        </Inset>
      </View>
    </View>
  );
};

export default step1;
