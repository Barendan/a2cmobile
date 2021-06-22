import React from 'react';
import { Platform, PermissionsAndroid } from 'react-native';
import Geocoder from 'react-native-geocoding';
import Geolocation from 'react-native-geolocation-service';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import parseGooglePlace from 'parse-google-place';
import Permissions from 'react-native-permissions';
import { Alert } from "react-native";
import { useTranslation } from "react-i18next";

import { GRAY_LIGHT } from '_styles/colors';

// test key; replace with prod key
// const google_api_key = 'AIzaSyCfcwQaq4K4yXuP_yI-p5sl1Q1rw7Wo5vw';

// const google_api_key = 'AIzaSyDmMOPXT95AEIFvCEoAzzWq1lPfJl8SES4';


const google_api_key = 'AIzaSyDgB54DCNDgL2ogOLAFhE-1OgETBR4IGh0';

Geocoder.init(google_api_key);
// Geocoder.init("xxxxxx", {language : "en"}); // can set the language

const requestLocationPermission = async () => {
  if (Platform.OS === 'ios') {
    const auth = await Geolocation.requestAuthorization('whenInUse');
    if (auth === 'granted') {
      console.log('Location service activated on iOS.');
    } else {
      console.log('Location permission denied.');
      alert('Location permission denied.');
    }
  }

  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'A2C App',
        message: 'Allow A2C to access your location',
      },
    );
    // console.log('whats perm return', granted);
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Location service activated on android.');
    } else {
      console.log('Location permission denied.');
      alert('Location permission denied.');
    }
  }
};

const getLocation = async () => {
  let hasLocationPermission = '';

  await PermissionsAndroid.check(
    'android.permission.ACCESS_FINE_LOCATION',
  ).then(data => (hasLocationPermission = data));


  if (hasLocationPermission) {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        data => resolve(data.coords),
        err => reject(() => console.log('There was an error:', err)),
        { enableHighAccuracy: true, timeout: 15000 },
      );
    });
  } else {
    requestLocationPermission();
  }
};

const geocodeLocationByName = locationName =>
  new Promise((resolve, reject) => {
    Geocoder.from(locationName)
      .then(json => {
        const addressComponent = json.results[0].address_components[0];
        resolve(addressComponent);
      })
      .catch(error => reject(error));
  });

const geocodeLocationByCoords = (lat, long) =>
  new Promise((resolve, reject) => {
    Geocoder.from(lat, long)
      .then(json => {
        const addressComponent = json.results[0].address_components[0];
        resolve(addressComponent);
      })
      .catch(error => reject(error));
  });


//check if user granted location, resolve true or false  
const checkLocationPermissions = async () => {
  return new Promise((resolve, reject) => {
    (async () => {
      if (Platform.OS === 'ios') {
        const auth = await Geolocation.requestAuthorization('whenInUse');
        auth === 'granted' ? resolve(true) : reject(false);
      }

      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'A2C',
            message: 'Allow A2C to access your location',
          },
        );
        granted === PermissionsAndroid.RESULTS.GRANTED ? resolve(true) : reject(false);
      }
    })();
  });
}


const getCurrentLocation = async () => {
 let locationEnabled = await checkLocationPermissions().then(() => {
   return true;
 }).catch(err => {
    //launch settings page if permission disabled

    Alert.alert(
      "Enable Location Services",
      "Location services are currently disabled. Please enable them to use the Current Location feature",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Launch Settings", onPress: () => Permissions.openSettings() }
      ]
    );

  });

  if(locationEnabled) {
    let promise = new Promise(function(resolve, reject) {
      Geolocation.getCurrentPosition(
       data => {
          Geocoder.from(data.coords.latitude, data.coords.longitude)
           .then(details => {

             let topAddress = details.results[0];

             // 'details' are provided when fetchDetails = true
             let parsedAddress = parseGooglePlace(topAddress);

             let formattedAddress = {
               FormattedAddress: topAddress.formatted_address,
               AddressLine1: parsedAddress.address,
               AddressLine2: null,
               City: parsedAddress.city,
               State: parsedAddress.stateShort,
               County: parsedAddress.county,
               ZipCode: parsedAddress.zipCode,
               Country: parsedAddress.countryLong,
               Latitude: topAddress.geometry.location.lat || null,
               Longitude: topAddress.geometry.location.lng || null
             };
             resolve(formattedAddress);
           })
           .catch(error => alert(JSON.stringify(error)));
       },
       err => alert(JSON.stringify(err)),
       { enableHighAccuracy: true, timeout: 15000 },
     );
   });

   return promise;
  }

}



const googlePlacesAutoInput = ({ placeholder, lang, onPlaceSelected }) => (
  <GooglePlacesAutocomplete
    placeholder={placeholder}
    minLength={2}
    autoFocus={false}
    returnKeyType={'default'}
    fetchDetails={true}
    textInputProps={{ onBlur: () => { } }}
    onPress={(data, details = null) => {

      // 'details' are provided when fetchDetails = true
      let parsedAddress = parseGooglePlace(details);

      let formattedAddress = {
        FormattedAddress: details.formatted_address,
        AddressLine1: parsedAddress.address,
        AddressLine2: null,
        City: parsedAddress.city,
        State: parsedAddress.stateShort,
        County: parsedAddress.county,
        ZipCode: parsedAddress.zipCode,
        Country: parsedAddress.countryLong,
        Latitude: details.geometry.location.lat || null,
        Longitude: details.geometry.location.lng || null
      }

      onPlaceSelected(formattedAddress);
    }}
    onFail={error => console.log(error)}
    query={{
      key: google_api_key,
      language: lang,
    }}
    styles={{
      textInputContainer: {
        padding: 5
      },
      textInput: {
        height: 38,
        color: '#5d5d5d',
        fontSize: 16,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: GRAY_LIGHT
      },
      predefinedPlacesDescription: {
        color: '#1faadb',
      },
    }}
  />
);

export default {
  getLocation,
  geocodeLocationByName,
  geocodeLocationByCoords,
  getCurrentLocation,
  googlePlacesAutoInput,
};