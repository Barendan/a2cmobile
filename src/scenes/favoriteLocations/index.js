import React, { useState, useEffect } from 'react';
import { Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import { Avatar, Card, IconButton, Divider } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { Inset, Stack } from 'react-native-spacing-system';
import { useDispatch, useSelector } from 'react-redux';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

import { AppButton } from '_atoms';
import { SaveLocationPanel } from '_organisms';
import { EmptyStateView } from '_molecules';
import { APP_COLOR } from '_styles/colors';

import storage from '_storage';

const FavoriteLocations = () => {
  const { t } = useTranslation();

  const [savedLocations, setSavedLocations] = useState([]);

  useEffect(() => {
    loadLocations();
  }, []);

  const [displayPanel, setDisplayPanel] = useState(false);

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
            // TODO;
            break;
          case 'ExpiredError':
            // TODO
            break;
        }
      });
  };

  const onPanelDismiss = () => {
    loadLocations();
    setDisplayPanel(false);
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
            {savedLocations.map(currentLocation => (
              <>
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
                    <Avatar.Icon
                      {...props}
                      size={moderateScale(26)}
                      icon="map-marker"
                      color="black"
                      style={styles.locationIcon}
                    />
                  )}
                  right={props => (
                    <IconButton
                      {...props}
                      size={moderateScale(26)}
                      icon="minus"
                      onPress={() => removeLocation(currentLocation)}
                    />
                  )}
                />

                <Divider />
              </>
            ))}

            <Stack size={100} />
          </ScrollView>
        </Inset>
      )}

      {/* <AppButton
        title={'+ ' + ' ' + t('add_saved_location')}
        color={APP_COLOR}
        containerStyle={styles.newFab}
        textStyle={{
          color: 'white',
          fontSize: moderateScale(16),
          paddingHorizontal: scale(16),
          textTransform: 'uppercase',
        }}
        onPress={() => setDisplayPanel(true)}
      /> */}

      <AppButton
        title={'+'}
        color={'#1976d2'}
        containerStyle={styles.fab}
        textStyle={{
          color: 'white',
          fontSize: moderateScale(36),
          alignSelf: 'center',
        }}
        onPress={() => setDisplayPanel(true)}
      />

      <SaveLocationPanel
        displayPanel={displayPanel}
        onPanelDismiss={onPanelDismiss}
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
