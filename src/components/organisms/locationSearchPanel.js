import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import { Avatar, Card, Divider } from 'react-native-paper';
import { Inset, Stack } from 'react-native-spacing-system';
import DraggablePanel from 'react-native-draggable-panel';
import { useTranslation } from 'react-i18next';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

import { LocationService } from '_helpers';
import { CloseButton } from '_atoms';
import { CANCEL, GRAY_LIGHT, GRAY_DARK, BLUE } from '_styles/colors';
import storage from '_storage';

const styles = StyleSheet.create({
  titleWrapper: {
    borderBottomColor: '#6f99bf',
    borderBottomWidth: 2,
  },
  title: {
    fontWeight: 'bold',
    color: '#366999',
    fontSize: moderateScale(20),
    marginBottom: moderateScale(10),
  },
  body: {
    fontSize: moderateScale(12),
    fontWeight: 'bold',
    backgroundColor: 'green',
  },
  content: {
    zIndex: 1,
    flexDirection: 'row',
  },
  bodyWrapper: {
    marginBottom: 0,
    height: '65%',
  },
  locationIcon: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 1,
  },
});

const LocationSearchPanel = props => {
  const { t } = useTranslation();
  const [savedLocations, setSavedLocations] = useState([]);

  const { panelHeader, displayPanel, onPanelDismiss, onPlaceSelected } = props;

  useEffect(() => {
    // load
    storage
      .load({
        key: 'savedLocations',
        autoSync: true,
        syncInBackground: true,
      })
      .then(ret => {
        setSavedLocations(ret);
      })
      .catch(err => {
        console.warn(err.message);
        switch (err.name) {
          case 'NotFoundError':
            // TODO;
            break;
          case 'ExpiredError':
            // TODO
            break;
        }
      });
  }, []);

  const getCurrentDeviceLocation = async () => {
    LocationService.getCurrentLocation().then(res => {
      onPlaceSelected(res);
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
        <Inset all={moderateScale(16)}>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>{panelHeader}</Text>
          </View>
          <Stack size={scale(12)} />

          <View style={styles.content} keyboardShouldPersistTaps={'handled'}>
            <LocationService.googlePlacesAutoInput
              placeholder={t('search_location')}
              lang={'en'}
              onPlaceSelected={v => onPlaceSelected(v)}
            />
          </View>

          <TouchableHighlight onPress={() => getCurrentDeviceLocation()}>
            <View>
              <Card.Title
                style={{
                  backgroundColor: 'white',
                  marginTop: moderateScale(-10),
                }}
                title={t('current_location')}
                titleStyle={{
                  color: BLUE,
                  fontSize: moderateScale(12),
                  marginLeft: moderateScale(-10),
                }}
                left={props => (
                  <Avatar.Icon
                    {...props}
                    size={scale(12)}
                    icon="crosshairs-gps"
                    color="black"
                    style={styles.locationIcon}
                  />
                )}
              />
              <Divider />
              <Stack size={scale(12)} />
            </View>
          </TouchableHighlight>

          {savedLocations && savedLocations.length > 0 && (
            <ScrollView
              style={styles.bodyWrapper}
              showsVerticalScrollIndicator={false}>
              {savedLocations.map(currentLocation => (
                <TouchableHighlight
                  onPress={() => onPlaceSelected(currentLocation.address)}>
                  <View>
                    <Card.Title
                      style={{ backgroundColor: 'white' }}
                      title={currentLocation.name}
                      subtitle={currentLocation.address.FormattedAddress}
                      left={props => (
                        <Avatar.Icon
                          {...props}
                          icon="map-marker"
                          color="black"
                          style={styles.locationIcon}
                        />
                      )}
                    />
                    <Divider />
                    <Stack size={scale(12)} />
                  </View>
                </TouchableHighlight>
              ))}
            </ScrollView>
          )}
        </Inset>
      </DraggablePanel>
    </View>
  );
};

export default LocationSearchPanel;
