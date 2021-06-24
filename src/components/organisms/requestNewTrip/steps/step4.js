import React from 'react';
import { View, ScrollView } from 'react-native';
import {
  Button,
  Card,
  Divider,
  Text,
  List,
  ListItem,
} from '@ui-kitten/components';
import { useTranslation } from 'react-i18next';
import { TextInputCard } from '_molecules';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles';
import { MemberService } from '_services';
import Spinner from 'react-native-spinkit';
import { APP_COLOR } from '_styles/colors';
import { Stack } from 'react-native-spacing-system';
import moment from 'moment';

const Step4 = ({ back, next }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const { t } = useTranslation();

  const { steps } = useSelector((state) => state.steps);
  const { user } = useSelector((state) => state.user);

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
      'MM/DD/YYYY HH:mm:ss'
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
        .then((data) => {
          setIsLoading(false);
          nextStep();
        })
        .catch((err) => {
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
        <Card>
          <ListItem
            title={`${t('pickup_address')}:`}
            description={`${pickupAddress.AddressLine1} ${pickupAddress.City},${pickupAddress.State} ${pickupAddress.ZipCode}`}
          />
          <Divider />
          <ListItem
            title={`${t('destination_address')}:`}
            description={`${destinationAddress.AddressLine1} ${destinationAddress.City},${destinationAddress.State} ${destinationAddress.ZipCode}`}
          />
          {tripStops.map((item, index) => (
            <React.Fragment key={index}>
              <Divider />
              <ListItem
                title={`Stop ${index + 1}`}
                description={`${item.AddressLine1} ${item.City},${item.State} ${item.ZipCode}`}
              />
            </React.Fragment>
          ))}
          <Divider />
          <ListItem
            title={`${t('round_trip_label')}:`}
            description={`${isRoundTrip ? t('confirm') : 'No'}`}
          />
          <Divider />
          <ListItem
            title={`${t('additional_passengers')}:`}
            description={`${additionalPassengers}`}
          />
          <Divider />
          <ListItem
            title={`${t('wheelchair')}:`}
            description={`${wheelchairRequired ? t('confirm') : 'No'}`}
          />
          <Divider />
          <ListItem
            title={`${t('date_time')}:`}
            description={`${
              appointmentDate !== null ? appointmentDate : ''
            } ${appointmentTime}`}
          />
          <Divider />
          <ListItem
            title={`${t('trip_reason')}:`}
            description={`${tripReason}`}
          />
          <Divider />
          {
            <ListItem
              title={`${t('special_needs')}:`}
              description={`${
                specialNeeds.length > 1 ? specialNeeds : t('none')
              }`}
            />
          }
        </Card>
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
        <Button
          title={t('back')}
          size='large'
          appearance='outline'
          style={styles.backButton}
          disabled={isLoading}
          onPress={goBack}
        >
          {t('back')}
        </Button>
        <Button
          title={t('request_trip')}
          size='large'
          disabled={isLoading}
          style={styles.forwardButton}
          onPress={() => onRequestTrip()}
        >
          {t('request_trip')}
        </Button>
      </View>
    </View>
  );
};

export default Step4;
