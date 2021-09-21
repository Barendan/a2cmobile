import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import DraggablePanel from 'react-native-draggable-panel';
import { Inset, Stack } from 'react-native-spacing-system';
import { Divider } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

import { CloseButton } from '_atoms';
import { TripDetails } from '_organisms';
import { MemberService } from '_services';
import { CANCEL, GRAY_LIGHT, GRAY_DARK } from '_styles/colors';
import user from '_store';

const styles = StyleSheet.create({
  titleWrapper: {
    borderBottomColor: '#6f99bf',
    borderBottomWidth: 2,
  },
  title: {
    fontWeight: 'bold',
    color: '#366999',
    fontSize: scale(18),
    marginBottom: moderateScale(10),
  },
  body: {
    fontSize: moderateScale(12),
    fontWeight: 'bold',
  },
  bodyWrapper: {
    marginBottom: 50,
  },
  levelOfService: {
    fontSize: moderateScale(13),
    fontWeight: 'bold',
    color: '#47494d',
  },
  tripNumber: {
    fontSize: moderateScale(13),
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#366999',
  },
  specialNeedsLabel: {
    fontSize: moderateScale(14),
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#276092',
  },
  tripDetailsHolder: {
    backgroundColor: GRAY_LIGHT,
  },
  content: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  customBtnText: {
    fontSize: moderateScale(18),
    fontWeight: '400',
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  customBtnBG: {
    backgroundColor: CANCEL,
    paddingVertical: moderateScale(10),
    borderRadius: 30,
    width: '100%',
  },
});

const FullTripDetails = props => {
  const { t } = useTranslation();
  const { user } = useSelector(state => state.user);

  const [loading, setLoading] = React.useState(false);

  const { panelHeader, displayPanel, onPanelDismiss, currentTrip } = props;

  const onCancelTrip = () => {
    setLoading(true);

    let payload = {
      memberID: user.memberID,
      tripNumber: currentTrip.TripNumber,
    };

    MemberService.cancelTrip(payload)
      .then(data => {
        setLoading(false);
        onPanelDismiss();
      })
      .catch(err => {
        alert(JSON.stringify(err));
        setLoading(false);
      });
  };

  const onCancelOnlineTrip = () => {
    setLoading(true);

    let payload = {
      onlineTripID: currentTrip.OnlineTripID,
    };

    MemberService.cancelOnlineTrip(payload)
      .then(data => {
        setLoading(false);
        onPanelDismiss();
      })
      .catch(err => {
        alert(JSON.stringify(err));
        setLoading(false);
      });
  };

  return (
    <View>
      <DraggablePanel
        visible={displayPanel}
        onDismiss={onPanelDismiss}
        initialHeight={verticalScale(1000)}
        expandable>
        <CloseButton onPress={onPanelDismiss} />
        {currentTrip && (
          <Inset all={scale(16)}>
            <View style={styles.content}>
              <View>
                <View style={styles.titleWrapper}>
                  <Text style={styles.title}>{panelHeader}</Text>
                </View>
                <Stack size={scale(12)} />

                <ScrollView
                  style={styles.bodyWrapper}
                  showsVerticalScrollIndicator={false}>
                  <View style={styles.tripDetailsHolder}>
                    <Inset all={8}>
                      <TripDetails
                        currentTrip={currentTrip}
                        viewFullTripDetails={() => {}}
                      />
                    </Inset>
                  </View>

                  <Divider style={{ backgroundColor: GRAY_DARK }} />
                  <Stack size={moderateScale(12)} />

                  <Inset all={scale(10)}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={styles.levelOfService}>
                        {currentTrip.LevelOfService}
                      </Text>

                      <Text style={styles.tripNumber}>
                        {t('trip_no')} {currentTrip.TripNumber}
                      </Text>
                    </View>
                  </Inset>

                  <Divider style={{ backgroundColor: GRAY_DARK }} />

                  <Inset all={scale(10)}>
                    <View
                      style={{
                        flexDirection: 'column',
                        fontSize: moderateScale(16),
                      }}>
                      <Text style={styles.specialNeedsLabel}>
                        {t('special_needs')}{' '}
                      </Text>
                      {currentTrip.SpecialNeeds ? (
                        <Text style={{ fontSize: moderateScale(16) }}>
                          {currentTrip.SpecialNeeds}
                        </Text>
                      ) : (
                        <Text style={{ fontSize: moderateScale(16) }}>
                          {t('none')}
                        </Text>
                      )}
                    </View>
                  </Inset>

                  <Divider style={{ backgroundColor: GRAY_DARK }} />
                </ScrollView>

                <View>
                  <Inset all={moderateScale(16)}>
                    <TouchableOpacity
                      style={styles.customBtnBG}
                      onPress={
                        currentTrip.TransportProviderName !== null &&
                        currentTrip.TransportProviderName.toLowerCase() ===
                          'pending'
                          ? onCancelOnlineTrip
                          : onCancelTrip
                      }>
                      <Text style={styles.customBtnText}>
                        {t('cancel_trip')}
                      </Text>
                    </TouchableOpacity>
                  </Inset>
                </View>
              </View>
            </View>
          </Inset>
        )}
      </DraggablePanel>
    </View>
  );
};

export default FullTripDetails;
