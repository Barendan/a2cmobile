import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Modal,
  Alert,
} from 'react-native';
import { useTranslation } from 'react-i18next';

import { Input, Layout, Button } from '@ui-kitten/components';
import { Inset } from 'react-native-spacing-system';
import { APP_COLOR } from '_styles/colors';

import Spinner from 'react-native-spinkit';

import { MemberService } from '_services';
import { useSelector } from 'react-redux';

const SavedLocations = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [errorMessage, setErrorMessage] = useState(false);
  const [savedLocations, setSavedLocations] = useState([]);
  const [locationName, setLocationName] = useState('');
  const [locationAddress, setlocationAddress] = useState('');

  const { user } = useSelector(state => state.user);

  useEffect(() => {
    // getSavedLocations();
  });

  useEffect(() => {
    if (locationName.length > 0 && locationAddress.length > 0) {
      setDisableSubmit(false);
    }
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
        setLoading(false);
      });
  };

  const addSavedLocation = payload => {
    console.log('added location:', payload);
    // Passed down to Modal component
    // onSubmit function that takes in payload (user typed data)
    // api call to add new location (payload) to specific user
  };

  const editSavedLocation = (id, payload) => {
    console.log('edited location', id);

    // Pass down to modal component as handleSubmit for edit option
    // make api call, selecting location with :id and passing a payload
  };

  const deleteSavedLocation = id => {
    // api call to delete User's savedLocation using id
    // MemberService.updateSavedLocations(id, {} )
    // delete location with id in local state
    setSavedLocations(savedLocations.filter(item => item.id !== id));
  };

  const confirmDelete = id => {
    return Alert.alert(
      'Delete Confirmation',
      'Are you sure you want to delete this saved location?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'Yes', onPress: id => deleteSavedLocation(id) },
      ],
    );
  };

  const startAddLocation = () => {
    // open modal with empty fields
    // onSubmit send call to api
    setModalVisible(true);
  };

  const startEditLocation = id => {
    // passed down to listItem component for edit option onPress
    // takes id of location item that it's triggered on
    // open modal and pre populate fields with id.data
    setModalVisible(true);
  };

  const submitLocation = () => {
    // make api call and send payload
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

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View style={styles.formContainer}>
          <Text style={styles.headerText}>Create a new Saved Location</Text>
          <View style={styles.inputPadding}>
            <Input
              value={locationName}
              placeholder="Name this location"
              label="Nickname"
              onTextChange={text => setLocationName(text)}
            />
            <Input
              value={locationAddress}
              placeholder="Enter Here"
              label="Location Address"
              onTextChange={text => setlocationAddress(text)}
            />
          </View>
          <Button
            // disabled={!email || !id}
            // onPress={() => submitLocation()}
            loading={loading}
            style={styles.button}
            color="white"
            title="Confirm Saved Location"
            backgroundColor={APP_COLOR}
          />
          <View style={{ margin: 10 }} />
        </View>
      </Modal>
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
