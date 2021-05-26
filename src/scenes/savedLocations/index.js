import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Modal,
  Alert,
} from 'react-native';

import { Input, Layout, Button } from '@ui-kitten/components';
import { Inset } from 'react-native-spacing-system';
import { APP_COLOR } from '_styles/colors';

import Spinner from 'react-native-spinkit';

const SavedLocations = () => {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [errorMessage, setErrorMessage] = useState(false);
  const [savedLocations, setSavedLocations] = useState([]);

  useEffect(() => {
    // getSavedLocations();
  });

  const getSavedLocations = () => {
    setLoading(true);
    // Make call to api to get user's saved locations
    MemberService.getUserRecord(user.id)
      .then(data => {
        setLoading(false);
        setSavedLocations(data.savedLocations);
      })
      .catch(err => {
        // alert(err);
        console.log('an error occurred while fetching locations:', err);
        setLoading(false);
      });
  };

  const displaySavedLocations = () => {
    // .map each location to listItem component
    return <Text>Here are your saved locations.</Text>;
  };

  return (
    <SafeAreaView>
      <Spinner
        isVisible={loading}
        size={50}
        type={'ThreeBounce'}
        color={APP_COLOR}
      />

      {savedLocations.length > 0 ? (
        displaySavedLocations()
      ) : (
        <Inset all={16}>
          <Text>You do not have any saved locations.</Text>
        </Inset>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
  },
});

export default SavedLocations;
