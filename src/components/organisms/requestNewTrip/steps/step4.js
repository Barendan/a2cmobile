import React from 'react';
import { View, ScrollView } from 'react-native';
import { Button, Card, Divider, Text, ListItem } from '@ui-kitten/components';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Spinner from 'react-native-spinkit';
import moment from 'moment';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

import { MemberService } from '_services';
// import { TextInputCard } from '_molecules';
import { APP_COLOR } from '_styles/colors';
import styles from './styles';

const Step4 = ({ back, next }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const { t } = useTranslation();

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
        <ListItem
          title={() => (
            <Text style={styles.summaryTitle}>{`${t('pickup_address')}:`}</Text>
          )}
          description={() => (
            <Text style={styles.summarySubtitle}>
              {`${pickupAddress.AddressLine1} ${pickupAddress.City},${pickupAddress.State} ${pickupAddress.ZipCode}`}
            </Text>
          )}
        />
        <Divider />
        <ListItem
          title={() => (
            <Text style={styles.summaryTitle}>
              {`${t('destination_address')}:`}
            </Text>
          )}
          description={() => (
            <Text style={styles.summarySubtitle}>
              {`${destinationAddress.AddressLine1} ${destinationAddress.City},${destinationAddress.State} ${destinationAddress.ZipCode}`}
            </Text>
          )}
        />
        {tripStops.map((item, index) => (
          <React.Fragment key={index}>
            <Divider />
            <ListItem
              title={() => (
                <Text style={styles.summaryTitle}>{`Stop ${index + 1}`}</Text>
              )}
              description={() => (
                <Text style={styles.summarySubtitle}>
                  {`${item.AddressLine1} ${item.City},${item.State} ${item.ZipCode}`}
                </Text>
              )}
            />
          </React.Fragment>
        ))}
        <Divider />
        <ListItem
          title={() => (
            <Text style={styles.summaryTitle}>
              {`${t('round_trip_label')}:`}
            </Text>
          )}
          description={() => (
            <Text style={styles.summarySubtitle}>
              {`${isRoundTrip ? t('confirm') : 'No'}`}
            </Text>
          )}
        />
        <Divider />
        <ListItem
          title={() => (
            <Text style={styles.summaryTitle}>
              {`${t('additional_passengers')}:`}
            </Text>
          )}
          description={() => (
            <Text style={styles.summarySubtitle}>
              {`${additionalPassengers}`}
            </Text>
          )}
        />
        <Divider />
        <ListItem
          title={() => (
            <Text style={styles.summaryTitle}>{`${t('wheelchair')}:`}</Text>
          )}
          description={() => (
            <Text style={styles.summarySubtitle}>
              {`${wheelchairRequired ? t('confirm') : 'No'}`}
            </Text>
          )}
        />
        <Divider />
        <ListItem
          title={() => (
            <Text style={styles.summaryTitle}>{`${t('date_time')}:`}</Text>
          )}
          description={() => (
            <Text style={styles.summarySubtitle}>
              {`${
                appointmentDate !== null ? appointmentDate : ''
              } ${appointmentTime}`}
            </Text>
          )}
        />
        <Divider />
        <ListItem
          title={() => (
            <Text style={styles.summaryTitle}>{`${t('trip_reason')}:`}</Text>
          )}
          description={() => (
            <Text style={styles.summarySubtitle}>{`${tripReason}`}</Text>
          )}
        />
        <Divider />
        {
          <ListItem
            title={() => (
              <Text style={styles.summaryTitle}>
                {`${t('special_needs')}:`}
              </Text>
            )}
            description={`${
              specialNeeds.length > 1 ? specialNeeds : t('none')
            }`}
            description={() => (
              <Text style={styles.summarySubtitle}>
                {`${specialNeeds.length > 1 ? specialNeeds : t('none')}`}
              </Text>
            )}
          />
        }
      </ScrollView>

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

      <View style={styles.footer}>
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      </View>
      <View style={styles.footer}>
        <Button appearance="outline" style={styles.backButton} onPress={goBack}>
          <Text
            style={{
              fontSize: moderateScale(16),
              color: '#006FD6',
              fontWeight: 'bold',
            }}>
            {t('back')}
          </Text>
        </Button>
        <Button
          disabled={isLoading}
          style={styles.forwardButton}
          onPress={() => onRequestTrip()}>
          <Text
            style={{
              fontSize: moderateScale(16),
              color: 'white',
              fontWeight: 'bold',
            }}>
            {t('request_trip')}
          </Text>
        </Button>
      </View>
    </View>
  );
};

export default Step4;
