import React from 'react';
import { SafeAreaView, View, ScrollView, TouchableHighlight, StyleSheet } from 'react-native';
import { Inset, Stack } from "react-native-spacing-system";
import { Avatar, Card, IconButton, Divider, FAB, Portal } from 'react-native-paper';
import Spinner from 'react-native-spinkit';
import { useTranslation } from "react-i18next";
import { useSelector } from 'react-redux';

import { PlanSelector, TripDetails, FullTripDetails, RequestNewTrip } from '_organisms';
import { EmptyStateView } from '_molecules';
import { TripService } from '_services';

// styles
import { APP_COLOR } from '_styles/colors';
import user from '_store';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
  fab: {
    position: 'absolute',
    margin: 25,
    right: 0,
    bottom: 0,
    backgroundColor: APP_COLOR,
    zIndex: 1
  },
  callIcon: {
    backgroundColor: "white",
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 1,
  },
  loadingView: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const DashboardScreen = () => {
  const { t } = useTranslation();

  const { plan } = useSelector(state => state.plan);
  const [loading, setLoading] = React.useState(true);

  const [memberTrips, setMemberTrips] = React.useState([]);
  const [viewMemberPlans, setViewMemberPlans] = React.useState(false);
  const [currentTrip, setCurrentTrip] = React.useState(null);
  const [requestNewTrip, setRequestNewTrip] = React.useState(false);

  React.useEffect(() => {
    getLatestMemberTrips();
  }, [plan])

  const getLatestMemberTrips = () => {
    setLoading(true);

    var date = new Date();
    let currentDate = ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear();

    TripService.getMemberTrips(plan.NETMember_ID, currentDate)
      .then((data) => {

        setMemberTrips(data.trips);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }


  const viewFullTripDetails = (trip) => {
    setCurrentTrip(trip);
  }


  return (
    <SafeAreaView style={{flex: 1, justifyContent:'flex-start'}}>
      <Card.Title
        style={{ backgroundColor: 'white' }}
        title={plan.contractName}
        subtitle={plan.MemberID + ' (' + plan.contractCode + ')'}
        left={(props) => <TouchableHighlight onPress={() => getLatestMemberTrips()}>
          <Avatar.Icon {...props} icon="phone" color="black" style={styles.callIcon} />
        </TouchableHighlight>}
        right={(props) => <IconButton {...props} icon="equal" onPress={() => setViewMemberPlans(true)} />}
      />
      <Divider />


     

      {loading && <View style={styles.loadingView}>
        <Spinner
          isVisible={loading}
          size={50}
          type={'ThreeBounce'}
          color={APP_COLOR}
        />
      </View> }

      <EmptyStateView title={t('no_trips_scheduled')} />

      {memberTrips.length > 0 && <Inset all={16}>

        <ScrollView showsVerticalScrollIndicator={false}>

          {memberTrips.map(currentTrip => (
            <>
              <TripDetails
                currentTrip={currentTrip}
                viewFullTripDetails={() => viewFullTripDetails(currentTrip)}
              />
              <Stack size={12} />
            </>
          ))}

          <Stack size={100} />
        </ScrollView> 

      </Inset> }


      <FAB
        style={styles.fab}
        large
        icon="plus"
        onPress={() => setRequestNewTrip(true)}
      />

      <FullTripDetails
        displayPanel={currentTrip !== null}
        currentTrip={currentTrip}
        onPanelDismiss={() => setCurrentTrip(null)}
      />

      <RequestNewTrip
       displayPanel={requestNewTrip}
       onPanelDismiss={() => setRequestNewTrip(false)}
     />      

      <PlanSelector
        displayPanel={viewMemberPlans}
        onPanelDismiss={() => setViewMemberPlans(false)}
      />

    </SafeAreaView>
  );
};

export default DashboardScreen;

