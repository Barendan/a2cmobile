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
  }
});

const ShowMapLocation = props => {
  const { t } = useTranslation();
  const { panelHeader, displayPanel, onPanelDismiss, fullAddress } = props;


  // console.log('so full', fullAddress.address.Latitude, fullAddress.address.Longitude )
  // console.log('--------------------------')

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
          <Text style={styles.title}>Location: {panelHeader}</Text>
        </View>

        <View style={styles.mapContainer}>
            <MapView
                // provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={{
                    latitude: fullAddress.address ? fullAddress.address.Latitude : 37.78825,
                    longitude: fullAddress.address ? fullAddress.address.Longitude : -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                mapType={"standard"}
                showsScale={true}
                zoomEnabled={true}
            >
            <Marker
                draggable
                coordinate={{
                  latitude: fullAddress.address ? fullAddress.address.Latitude : 37.78825,
                  longitude: fullAddress.address ? fullAddress.address.Longitude : -122.4324,
                }}
                onDragEnd={
                  (e) => alert(JSON.stringify(e.nativeEvent.coordinate))
                }
                title={`Saved Location: ${panelHeader}`}
                // description={fullAddress}
            />
            </MapView>
        </View>

      </View>
    </DraggablePanel>
  );
};

export default ShowMapLocation;
