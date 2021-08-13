import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Button } from '@ui-kitten/components';
import { useTranslation } from 'react-i18next';
import { LocationSearchCard, CheckboxCard } from '_molecules';
import { Inset, Stack } from 'react-native-spacing-system';
import { useDispatch, useSelector } from 'react-redux';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

import styles from './styles';
import { GRAY_BLUE } from '_styles/colors';
import {
  selectAddress,
  updateTripStop,
  destinationSelect,
  roundTrip,
  removeATripStop,
} from '_store/steps';

const Step1 = ({ next }) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { steps } = useSelector(state => state.steps);

  const { pickupAddress, tripStops, destinationAddress, isRoundTrip } = steps;

  const nextStep = () => {
    next();
  };

  useEffect(() => {
    if (pickupAddress && destinationAddress) {
      setIsDisabled(false);
    }
  }, [pickupAddress, destinationAddress]);

  return (
    <View style={[styles.container]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.formContainer}
        keyboardShouldPersistTaps={'handled'}>
        <LocationSearchCard
          required={!pickupAddress ? true : false}
          locationIndex={0}
          title={t('pickup_address')}
          description={
            pickupAddress
              ? pickupAddress.FormattedAddress
              : t('pickup_address_description')
          }
          onAddressSelected={addr => dispatch(selectAddress(addr))}
        />
        {tripStops.map((currentStop, index) => (
          <>
            <LocationSearchCard
              disableClick={true}
              icon={'minus'}
              iconColor={GRAY_BLUE}
              showBorder={true}
              title={t('trip_stop') + (index + 1)}
              description={currentStop.FormattedAddress}
              onPress={() => dispatch(removeATripStop(index))}
            />
          </>
        ))}
        <LocationSearchCard
          required={!destinationAddress ? true : false}
          locationIndex={1}
          title={t('destination_address')}
          description={
            destinationAddress
              ? destinationAddress.FormattedAddress
              : t('destination_address_description')
          }
          onAddressSelected={addr => dispatch(destinationSelect(addr))}
        />
        <LocationSearchCard
          showBorder={true}
          dashedBorder={true}
          title={t('add_stop_title')}
          description={t('add_stop_description')}
          onAddressSelected={addr => dispatch(updateTripStop(addr))}
        />
        <Inset all={16}>
          <CheckboxCard
            cardIcon={'swap-horizontal'}
            title={t('round_trip')}
            checkedValue={isRoundTrip}
            onChecked={value => dispatch(roundTrip(value))}
          />
        </Inset>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          style={styles.forwardButton}
          disabled={isDisabled}
          onPress={nextStep}>
          <Text style={{ fontSize: moderateScale(16) }}>{t('continue')}</Text>
        </Button>
      </View>
    </View>
  );
};

export default Step1;
