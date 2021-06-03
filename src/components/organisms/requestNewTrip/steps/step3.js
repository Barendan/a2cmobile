import React from 'react';
import { View, ScrollView } from 'react-native';
import { Button } from '@ui-kitten/components';
import { useTranslation } from 'react-i18next';
import { TextInputCard } from '_molecules';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles';
import { MemberService } from '_services';
import { setSpecialNeeds } from '_store/steps'

const Step3 = ({ back }) => {
  const [isLoading, setLoading] = React.useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { steps } = useSelector(state => state.steps);
  const { user } = useSelector(state => state.user);

  const { specialNeeds, pickupAddress, tripStops, destinationAddress,
    isRoundTrip, additionalPassengers, wheelchairRequired, appointmentDateTime,
    appointmentDate, appointmentTime, tripReason } = steps;

  const onRequestTrip = async () => {
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
        appointmentDateTime: appointmentDateTime,
        appointmentDate: appointmentDate,
        appointmentTime: appointmentTime,
        tripReason: tripReason,
        specialNeeds: specialNeeds,
      };
  
  
      setLoading(true);
      MemberService.requestTrip(payload)
        .then(data => {
          setLoading(false);
          alert(JSON.stringify(data));
        })
        .catch(err => {
          alert(JSON.stringify(err));
          setLoading(false);
        });
    } catch (error) {
      console.log(error)
      setLoading(false);
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
          required={true}
          cardIcon={'handshake'}
          title={t('special_needs')}
          placeholder={t('special_needs_required')}
          textValue={specialNeeds}
          onChangeText={value => dispatch(setSpecialNeeds(value))}
        />

      </ScrollView>
      <View style={styles.footer}>

        <Button
          title={t('back')}
          size="large"
          appearance="outline"
          style={styles.backButton}
          disabled={isLoading}
          onPress={goBack}>
          {t('back')}
        </Button>
        <Button
          title={t('request_trip')}
          size="large"
          disabled={isLoading}
          style={styles.forwardButton}
          onPress={() => onRequestTrip()}>
          {t('request_trip')}
        </Button>
      </View>

    </View>
  );
};

export default Step3;
