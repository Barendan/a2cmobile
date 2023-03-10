import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView, Alert } from 'react-native';
import { Card, IconButton, Divider } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { Inset, Stack } from 'react-native-spacing-system';
import { scale, moderateScale } from 'react-native-size-matters';

import { AppButton } from '_atoms';
import { SaveLocationPanel } from '_organisms';
import { ShowMapLocation } from '_organisms';
import { EmptyStateView } from '_molecules';
import { APP_COLOR } from '_styles/colors';

import storage from '_storage';

const FavoriteLocations = () => {
  const { t } = useTranslation();

  const [savedLocations, setSavedLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState({});

  useEffect(() => {
    loadLocations();
  }, []);

  const [displayPanel, setDisplayPanel] = useState(false);
  const [displayMapPanel, setDisplayMapPanel] = useState(false);

  const loadLocations = () => {
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
            console.log('No user found.');
            break;
          case 'ExpiredError':
            console.log('User expired.');
            break;
        }
      });
  };

  const updateSelectedLocation = (location) => {
    setSelectedLocation(location);

    setDisplayMapPanel(true)
  }

  const onPanelDismiss = () => {
    loadLocations();
    setDisplayPanel(false);
  };

  const onMapPanelDismiss = () => {
    setDisplayMapPanel(false);
  };

  const removeLocation = location => {
    const index = savedLocations.indexOf(location);
    if (index > -1) {
      let updatedLocations = [
        ...savedLocations.slice(0, index),
        ...savedLocations.slice(index + 1),
      ];

      storage
        .save({
          key: 'savedLocations', // Note: Do not use underscore("_") in key!
          data: updatedLocations,
          expires: null,
        })
        .then(ret => {
          setSavedLocations(updatedLocations);
        });
    }
  };

  return (
    <SafeAreaView style={styles.container}>

      {savedLocations.length === 0 && (
        <Inset all={scale(16)}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <EmptyStateView title={t('no_saved_locations')} />
          </ScrollView>
        </Inset>
      )}

      {savedLocations.length > 0 && (
        <Inset all={scale(1)}>

          <ScrollView showsVerticalScrollIndicator={false}>
            {savedLocations.map((currentLocation, i) => (
              <View key={i}>

                <Card.Title
                  style={{ backgroundColor: 'white' }}
                  title={
                    <Text
                      style={{ color: 'black', fontSize: moderateScale(16) }}>
                      {currentLocation.name}
                    </Text>
                  }
                  titleStyle={{
                    marginLeft: moderateScale(-10),
                    marginBottom: moderateScale(-6),
                  }}
                  subtitle={
                    <Text
                      style={{ color: 'gray', fontSize: moderateScale(10) }}>
                      {currentLocation.address.FormattedAddress}
                    </Text>
                  }
                  subtitleStyle={{ marginLeft: moderateScale(-10) }}
                  left={props => (
                    <IconButton
                      {...props}
                      size={moderateScale(26)}
                      icon="map-marker"
                      color="black"
                      style={styles.locationIcon}
                      onPress={() => updateSelectedLocation(currentLocation)}
                    />
                  )}
                  right={props => (
                    <IconButton
                      {...props}
                      size={moderateScale(26)}
                      icon="minus"
                      onPress={() => Alert.alert(
                        t('confirm_delete_title'),
                        t('confirm_delete_location'),
                        [
                          {
                            text: t('cancel'),
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                          },
                          { text: t('confirm'), onPress: () => removeLocation(currentLocation) }
                        ]
                      )}
                    />
                  )}
                />

                <Divider />
              </View>
            ))}
            <Stack size={100} />

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
        onPress={() => setDisplayPanel(true)}
      />

      <SaveLocationPanel
        displayPanel={displayPanel}
        onPanelDismiss={onPanelDismiss}
      />

      <ShowMapLocation
        panelHeader={selectedLocation.name}
        displayPanel={displayMapPanel}
        onPanelDismiss={onMapPanelDismiss}
        fullAddress={selectedLocation}
      />
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  locationIcon: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 1,
    marginLeft: moderateScale(-4),
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#dbdbdb',
  },
  // newFab: {
  //   backgroundColor: APP_COLOR,
  //   position: 'absolute',
  //   margin: moderateScale(25),
  //   paddingHorizontal: moderateScale(4),
  //   paddingVertical: moderateScale(8),
  //   right: 0,
  //   bottom: 0,
  //   zIndex: 1,
  //   elevation: 12,
  //   width: moderateScale(185),
  //   height: moderateScale(38),
  //   borderRadius: 50,
  // },
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
});

export default FavoriteLocations;
