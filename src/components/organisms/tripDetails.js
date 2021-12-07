import React from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import { Inset, Stack } from 'react-native-spacing-system';
import { Avatar, Card, Divider, List } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import Communications from 'react-native-communications';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

// styles
import {
  GRAY_DARK,
  START_LOCATION_COLOR,
  MID_LOCATION_COLOR,
  END_LOCATION_COLOR,
} from '_styles/colors';

const TripDetails = props => {
  const { t } = useTranslation();

  const [tripStops, setTripStops] = React.useState([]);

  const { currentTrip, viewFullTripDetails } = props;

  const [apptDate, apptTimeA, apptTimeB] = currentTrip.ApptDateTime.split(' ');
  const [fixedTimeA, fixedTimeB] = apptTimeA.split(':');

  React.useEffect(() => {
    if (currentTrip) {
      let currentStopsArray = currentTrip.Stops.split(',');
      let lastStop = currentStopsArray[currentStopsArray.length - 1];

      if (currentStopsArray[0] === lastStop) {
        currentStopsArray.splice(currentStopsArray.length - 1, 1);
      }

      setTripStops(currentStopsArray);
    }
  }, [props]);

  const stopStyle = index => {
    if (index === tripStops.length - 1) return styles.endLocationIcon;

    switch (index) {
      case 0:
        return styles.startLocationIcon;
        break;
      default:
        return styles.midLocationIcon;
    }
  };
  return (
    <Card style={styles.tripDetail} onPress={() => viewFullTripDetails()}>
      {currentTrip && (
        <Card.Content>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>
              <Text style={styles.providerNameText}>
                {currentTrip.TransportProviderName}
              </Text>
              {currentTrip.TripDate ? (
                <>
                  <Stack size={scale(6)} />
                  <Text>
                    {currentTrip.TripDate} {currentTrip.TripTime}
                  </Text>
                </>
              ) : (
                <>
                  <Text
                    style={[styles.providerNameText, { fontWeight: 'normal' }]}>
                    {apptDate} {fixedTimeA}:{fixedTimeB} {apptTimeB}
                  </Text>
                </>
              )}
            </View>

            {currentTrip.ProviderPhoneNumber && (
              <TouchableHighlight
                onPress={() =>
                  Communications.phonecall(
                    currentTrip.ProviderPhoneNumber,
                    true,
                  )
                }>
                <Avatar.Icon
                  {...props}
                  size={moderateScale(30)}
                  icon="phone"
                  color="black"
                  style={styles.callIcon}
                />
              </TouchableHighlight>
            )}
          </View>

          <Divider style={{ backgroundColor: GRAY_DARK }} />
          <Stack size={verticalScale(6)} />

          {tripStops.map((currentStop, index) => (
            <List.Item
              title={currentStop}
              titleStyle={styles.tripTitleStyle}
              style={styles.tripPathDetails}
              left={props => (
                <Avatar.Icon
                  {...props}
                  size={scale(12)}
                  color="black"
                  style={stopStyle(index)}
                />
              )}
            />
          ))}

          <Divider style={{ backgroundColor: GRAY_DARK }} />

          <Stack size={verticalScale(6)} />
          <View style={styles.appointmentReminderText}>
            <Text style={styles.blueText}>
              {t('please_be_Ready')}{' '}
              <Text style={styles.greenText}>{t('one_hour')}</Text>{' '}
              {t('before_appt_time')}
            </Text>
          </View>
        </Card.Content>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  callIcon: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 1,
  },
  tripDetail: {
    backgroundColor: 'white',
    borderRadius: 10,
  },
  tripPathDetails: {
    marginLeft: moderateScale(-6),
  },
  appointmentReminderText: {
    alignItems: 'center',
  },
  providerNameText: {
    color: '#276092',
    fontWeight: 'bold',
    fontSize: moderateScale(14),
  },
  blueText: {
    color: '#276092',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: moderateScale(10),
  },
  greenText: {
    color: 'green',
    fontWeight: 'bold',
  },
  tripTitleStyle: {
    fontSize: moderateScale(15),
    color: '#47494d',
    marginTop: moderateScale(-10),
  },
  startLocationIcon: {
    backgroundColor: START_LOCATION_COLOR,
  },
  midLocationIcon: {
    backgroundColor: MID_LOCATION_COLOR,
  },
  endLocationIcon: {
    backgroundColor: END_LOCATION_COLOR,
  },
});

export default TripDetails;
