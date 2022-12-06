import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { useTranslation } from 'react-i18next';
import { verticalScale, moderateScale } from 'react-native-size-matters';
import MapView, { Marker } from 'react-native-maps';

import { CloseButton } from '_atoms';
import { DraggablePanel } from '_molecules';

const styles = StyleSheet.create({
  titleWrapper: {
    borderBottomColor: '#6f99bf',
    borderBottomWidth: moderateScale(2),
  },
  title: {
    fontWeight: 'bold',
    color: '#366999',
    fontSize: moderateScale(24),
    marginBottom: moderateScale(4),
  },
  mainContainer: {
    display: 'flex',
    height: '100%',
    padding: '5%',
    paddingTop: Platform.OS === 'ios' ? '7%' : null,
  },
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
    height: 420,
    // width: 400,
    marginTop: 85,
    marginHorizontal: 50,
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderColor: '#000000',
    borderStyle: 'solid',
    borderWidth: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bodyWrapper: {
    paddingHorizontal: moderateScale(10),
    marginTop: moderateScale(24),
  },
  footer: {
    marginBottom: 10,
    flexDirection: 'row',
  },
});

const ShowMapLocation = props => {
  const { t } = useTranslation();
  const { panelHeader, displayPanel, onPanelDismiss } = props;
//   const [savedLocations, setSavedLocations] = useState([]);
//   const [newLocation, setNewLocation] = React.useState({
//     address: null,
//     name: '',
//   });

//   const updateNewLocation = React.useCallback((key, value) => {
//     setNewLocation(newLocation => {
//       return {
//         ...newLocation,
//         [key]: value,
//       };
//     });
//   }, []);

  return (
    <DraggablePanel
      visible={displayPanel}
      onDismiss={onPanelDismiss}
      initialHeight={verticalScale(1000)}
      expandable
      fixPanel
    >
      <View style={styles.mainContainer}>

        <View style={styles.titleWrapper}>
          <CloseButton onPress={onPanelDismiss} />

          {/* <Text style={styles.title}>{t('add_new_location')}</Text> */}
          <Text style={styles.title}>Saved Location id313</Text>
        </View>
        
        <View style={styles.mapContainer}>
            <MapView
                // provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
            {/* <Marker
                key={index}
                coordinate={marker.latlng}
                title={marker.title}
                description={marker.description}
            /> */}
            <Marker
                draggable
                coordinate={{
                latitude: 37.78825,
                longitude: -122.4324,
                }}
                onDragEnd={
                (e) => alert(JSON.stringify(e.nativeEvent.coordinate))
                }
                title={'Test Marker'}
                description={'This is a description of the marker'}
            />
            </MapView>
        </View>

      </View>
    </DraggablePanel>
  );
};

export default ShowMapLocation;
