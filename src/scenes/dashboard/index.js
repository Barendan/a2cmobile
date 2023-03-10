import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TouchableHighlight,
  StyleSheet,
  RefreshControl,
  StatusBar,
  Platform
} from 'react-native';
import { Inset, Stack } from 'react-native-spacing-system';
import { Avatar, Card, IconButton, Divider } from 'react-native-paper';
import Spinner from 'react-native-spinkit';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import Communications from 'react-native-communications';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import moment from 'moment';

import { AppButton } from '_atoms';
import { EmptyStateView } from '_molecules';
import {
  // PlanSelector,
  TripDetails,
  FullTripDetails,
  RequestNewTrip,
} from '_organisms';
import { TripService } from '_services';

import { APP_COLOR } from '_styles/colors';
// import user from '_store';

const DashboardScreen = () => {
  const { t } = useTranslation();

  const { plan, memberPlans } = useSelector(state => state.plan);
  const [loading, setLoading] = React.useState(true);
  const [descDate, setDescDate] = React.useState(true);

  const [memberTrips, setMemberTrips] = React.useState([]);
  // const [viewMemberPlans, setViewMemberPlans] = React.useState(false);
  const [currentTrip, setCurrentTrip] = React.useState(null);
  const [requestNewTrip, setRequestNewTrip] = React.useState(false);

  React.useEffect(() => {
    getLatestMemberTrips();
  }, [plan]);
  
  React.useEffect(() => {
    filterTrips();
  }, [descDate])

  const getLatestMemberTrips = () => {
    setLoading(true);

    var date = new Date();
    let currentDate =
      (date.getMonth() > 8
        ? date.getMonth() + 1
        : '0' + (date.getMonth() + 1)) +
      '/' +
      (date.getDate() > 9 ? date.getDate() : '0' + date.getDate()) +
      '/' +
      date.getFullYear();

    TripService.getMemberTrips(plan.NETMember_ID, currentDate)
      .then(data => {
        setMemberTrips(data.trips);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
      });
  };

  const formatDateTime = (datetime) => {
    const tripDateTime = datetime.split(' ');

    let tripDate = tripDateTime[0];
    let tripTime = tripDateTime[1] + tripDateTime[2];

    return moment(
      `${tripDate} + ${tripTime}`,
      'MM/DD/YYYY hh:mm:ss A',
    ).format('YYYY-MM-DD HH:mm:ss');
  }

  const filterTrips = () => {
    let sortedTrips = [...memberTrips].sort( (a,b) => {
      const fDateTimeA = formatDateTime(a.ApptDateTime);
      const fDateTimeB = formatDateTime(b.ApptDateTime);
      
      return descDate ? 
        Date.parse(fDateTimeB) - Date.parse(fDateTimeA):
        Date.parse(fDateTimeA) - Date.parse(fDateTimeB);
    })
    setMemberTrips(sortedTrips);
  }

  const viewFullTripDetails = trip => {
    setCurrentTrip(trip);
  };

  const onFullTripDetailsDismiss = () => {
    setCurrentTrip(null);
    getLatestMemberTrips();
  };
  
  const onRequestNewTrip = () => {
    setRequestNewTrip(false);
    getLatestMemberTrips();
  };

  const callPlanNumber = () => {
    alert('callingPlan');
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'flex-start' }}>
      <StatusBar barStyle="light-content" />

      <Card.Title
        style={{ backgroundColor: 'white' }}
        titleStyle={{
          marginLeft: moderateScale(-10),
          marginBottom: moderateScale(-6),
        }}
        subtitleStyle={{ marginLeft: moderateScale(-10) }}
        title={
          <Text
            style={{
              color: 'black',
              fontSize: moderateScale(16),
            }}>
            {plan.contractName}
          </Text>
        }
        subtitle={
          <Text style={{ color: 'gray', fontSize: moderateScale(10) }}>
            {plan.MemberID + ' (' + plan.contractCode + ')'}
          </Text>
        }
        left={props => (
          <>
            {plan.contractPhoneNumber ? (
              <TouchableHighlight
                onPress={() =>
                  Communications.phonecall(plan.contractPhoneNumber, true)
                }>
                <Avatar.Icon
                  {...props}
                  icon="phone"
                  color="black"
                  size={moderateScale(26)}
                  style={styles.callIcon}
                />
              </TouchableHighlight>
            ) : (
              <Avatar.Icon
                {...props}
                icon="home"
                color="black"
                size={moderateScale(26)}
                style={styles.callIcon}
              />
            )}
          </>
        )}
        right={props => (
          <>
            {memberPlans.length > 0 && (
              <IconButton
                {...props}
                // icon="swap-vertical"
                icon="sort"
                size={moderateScale(30)}
                onPress={() => setDescDate(current => !current)}
              />
            )}
          </>
        )}
      />

      <Divider />

      {loading && (
        <View style={styles.loadingView}>
          <Spinner
            isVisible={loading}
            size={scale(30)}
            type={'ThreeBounce'}
            color={APP_COLOR}
          />
        </View>
      )}

      {memberTrips.length === 0 && (
        <Inset all={scale(16)}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={getLatestMemberTrips}
              />
            }>
            <EmptyStateView title={t('no_trips_scheduled')} />
          </ScrollView>
        </Inset>
      )}

      {memberTrips.length > 0 && (
        <Inset all={scale(16)}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={getLatestMemberTrips}
              />
            }>
            {memberTrips.map((currentTrip, i) => (
              <View key={i}>
                <TripDetails
                  // key={i}
                  currentTrip={currentTrip}
                  viewFullTripDetails={() => viewFullTripDetails(currentTrip)}
                />
                <Stack size={scale(12)} />
              </View>
            ))}

            <Stack size={scale(100)} />
          </ScrollView>
        </Inset>
      )}

      <AppButton
        title={'+'}
        color={'#1976d2'}
        containerStyle={styles.fab}
        textStyle={{
          color: 'white',
          fontSize: Platform.OS === 'android' ? moderateScale(36) : moderateScale(38),
          alignSelf: 'center',
        }}
        onPress={() => setRequestNewTrip(true)}
      />

      <FullTripDetails
        displayPanel={currentTrip !== null}
        currentTrip={currentTrip}
        onPanelDismiss={onFullTripDetailsDismiss}
      />

      <RequestNewTrip
        displayPanel={requestNewTrip}
        onPanelDismiss={onRequestNewTrip}
      />

      {/* <PlanSelector
        displayPanel={viewMemberPlans}
        onPanelDismiss={() => setViewMemberPlans(false)}
      /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
  fab: {
    position: 'absolute',
    margin: moderateScale(25),
    right: 0,
    bottom: 0,
    width: moderateScale(54),
    height: moderateScale(54),
    borderRadius: 50,
    zIndex: 1,
    elevation: 12,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: APP_COLOR,
  },
  callIcon: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 1,
    marginLeft: moderateScale(-4),
  },
  loadingView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DashboardScreen;
