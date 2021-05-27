import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Modal,
  Alert,
  Pressable,
} from 'react-native';
import { useTranslation } from 'react-i18next';

import { Input, Layout, Button } from '@ui-kitten/components';
import { Inset } from 'react-native-spacing-system';
import { APP_COLOR } from '_styles/colors';

import Spinner from 'react-native-spinkit';
import LocationItem from './LocationItem';

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
  }, []);

  useEffect(() => {
    if (locationName.length > 0 && locationAddress.length > 0) {
      setDisableSubmit(false);
    }
  }, [locationName, locationAddress]);

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

  const addSavedLocation = () => {
    let payload = {
      // id: Math.random(), how will ID be determined?
      name: locationName,
      address: locationAddress,
    };

    // api call to add new location to specific user
    MemberService.updateUser(payload)
      .then(data => {
        setLoading(false);
        // alert user of success
        // dispatch update to store
        setLocationName('');
        setLocationAddress('');
      })
      .catch(err => {
        alert(err);
        setLoading(false);
      });
  };

  const editSavedLocation = id => {
    let payload = {
      name: locationName,
      address: locationAddress,
    };
    setLoading(true);

    // make api call, selecting location with :id and passing a payload
    MemberService.updateUserLocation(id, payload)
      .then(data => {
        setLoading(false);
        // alert user of success
        // dispatch update to store
        setLocationName('');
        setLocationAddress('');
        setModalVisible(false);
      })
      .catch(err => {
        alert(err);
        setLoading(false);
      });
  };

  const deleteSavedLocation = id => {
    // api call to delete User's savedLocation using id
    MemberService.updateSavedLocations(id, {});
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

  const onSubmit = () => {
    // make api call and send payload
  };

  const displaySavedLocations = () => (
    <FlatList
      data={savedLocations}
      keyExtractor={(item, index) => `${index}`}
      renderItem={({ item, index }) => (
        <LocationItem
          location={item}
          handleEdit={startEditLocation}
          handleDelete={confirmDelete}
        />
      )}
    />
  );

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
        <View style={styles.modalContainer}>
          <Text style={styles.headerText}>Add a new saved location</Text>
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
            // onPress={() => onSubmit(name, address)}
            // loading={loading}
            style={styles.button}
            color="white"
            title="View Checklist"
            backgroundColor={APP_COLOR}
          />
          <View style={{ margin: 10 }} />
        </View>
      </Modal>

      <Pressable style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text>Add Location</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerText: {
    fontSize: 23,
    textAlign: 'center',
    paddingBottom: 50,
    color: APP_COLOR.primaryTitle,
  },
  addButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    alignSelf: 'flex-end',
  },
  modalContainer: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default SavedLocations;
