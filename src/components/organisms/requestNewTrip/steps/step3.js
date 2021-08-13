import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@ui-kitten/components';
import { useTranslation } from 'react-i18next';
import { Stack } from 'react-native-spacing-system';
import Spinner from 'react-native-spinkit';
import moment from 'moment';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

import { setSpecialNeeds } from '_store/steps';
import { MemberService } from '_services';
import { TextInputCard } from '_molecules';
import { APP_COLOR } from '_styles/colors';
import styles from './styles';

const Step3 = ({ back, next }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { steps } = useSelector(state => state.steps);
  const { user } = useSelector(state => state.user);

  const {
    specialNeeds,
    pickupAddress,
    tripStops,
    destinationAddress,
    isRoundTrip,
    additionalPassengers,
    wheelchairRequired,
    appointmentDateTime,
    appointmentDate,
    appointmentTime,
    tripReason,
  } = steps;

  const onRequestTrip = async () => {
    let formattedAppointmentDateTime = moment(
      `${appointmentDate} + ${appointmentTime}`,
      'MM/DD/YYYY HH:mm:ss',
    ).format();

    // alert(JSON.stringify(appointmentDateTime + '-' + formattedAppointmentDateTime));
    // return;

    try {
      const payload = {
        memberID: user.memberID,
        NETMember_ID: user.NETMember_ID,
        pickupAddress: pickupAddress?.FormattedAddress,
        pickupAddressLat: pickupAddress?.Latitude,
        pickupAddressLng: pickupAddress?.Longitude,
        pickupAddress1: pickupAddress?.AddressLine1,
        pickupAddress2: pickupAddress?.AddressLine2,
        pickupAddressCity: pickupAddress?.City,
        pickupAddressState: pickupAddress?.State,
        pickupAddressCounty: pickupAddress?.County,
        pickupAddressZip: pickupAddress?.ZipCode,
        pickupAddressCountry: pickupAddress?.Country,
        destinationAddress: destinationAddress?.FormattedAddress,
        destinationAddressLat: destinationAddress?.Latitude,
        destinationAddressLng: destinationAddress?.Longitude,
        destinationAddress1: destinationAddress?.AddressLine1,
        destinationAddress2: destinationAddress?.AddressLine2,
        destinationAddressCity: destinationAddress?.City,
        destinationAddressState: destinationAddress?.State,
        destinationAddressCounty: destinationAddress?.County,
        destinationAddressZip: destinationAddress?.ZipCode,
        destinationAddressCountry: destinationAddress?.Country,
        tripStops: tripStops,
        isRoundTrip: isRoundTrip,
        additionalPassengers: additionalPassengers,
        wheelchair: wheelchairRequired ? 'yes' : 'no',
        appointmentDateTime: formattedAppointmentDateTime,
        appointmentDate: appointmentDate,
        appointmentTime: appointmentTime,
        tripReason: tripReason,
        specialNeeds: specialNeeds,
      };

      setErrorMessage('');

      setIsLoading(true);
      MemberService.requestTrip(payload)
        .then(data => {
          setIsLoading(false);
          nextStep();
        })
        .catch(err => {
          setIsLoading(false);
          setErrorMessage(err.message);
        });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

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
          required={specialNeeds.length === 0 ? true : false}
          cardIcon={'handshake'}
          title={t('special_needs')}
          placeholder={t('special_needs_required')}
          textValue={specialNeeds}
          onChangeText={value => dispatch(setSpecialNeeds(value))}
        />
      </ScrollView>

      <Text style={styles.errorMessage}>{errorMessage}</Text>
      {isLoading && (
        <View style={styles.loadingView}>
          <Text style={styles.loadingMessage}>{t('requesting_trip')}</Text>
          <Spinner
            isVisible={isLoading}
            size={50}
            type={'ThreeBounce'}
            color={APP_COLOR}
          />
        </View>
      )}

      <Stack size={12} />

      <View style={styles.footer}>
        <Button appearance="outline" style={styles.backButton} onPress={goBack}>
          <Text style={{ fontSize: moderateScale(16) }}>{t('back')}</Text>
        </Button>
        <Button
          disabled={isLoading}
          style={styles.forwardButton}
          onPress={nextStep}>
          <Text style={{ fontSize: moderateScale(16) }}>{t('continue')}</Text>
        </Button>
      </View>
    </View>
  );
};

export default Step3;
