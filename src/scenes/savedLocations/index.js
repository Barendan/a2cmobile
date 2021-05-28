import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Modal,
  Alert,
  Button,
} from 'react-native';
import { useTranslation } from 'react-i18next';

import { FAB } from 'react-native-paper';
import { Input } from '@ui-kitten/components';
import { Inset } from 'react-native-spacing-system';
import { APP_COLOR } from '_styles/colors';

import Spinner from 'react-native-spinkit';
import { LocationItem } from '_molecules';
import { CloseButton } from '_atoms';

import { MemberService } from '_services';
import { useSelector } from 'react-redux';
import { GooglePlacesInput } from '../../helpers/LocationService';

const SavedLocations = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [savedLocations, setSavedLocations] = useState([]);
  const [locationId, setLocationId] = useState('');
  const [locationName, setLocationName] = useState('');
  const [locationAddress, setLocationAddress] = useState('');

  const { user } = useSelector(state => state.user);

  useEffect(() => {
    // getSavedLocations();
  }, []);

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
        setModalVisible(false);
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
        setModalVisible(false);
        setIsEditing(false);
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

  const handleEdit = id => {
    setIsEditing(true);
    setModalVisible(true);

    const selectedLocation = savedLocations.find(
      location => location.id === id,
    );

    setLocationId(selectedLocation.id);
    setLocationName(selectedLocation.name);
    setLocationAddress(selectedLocation.address);
  };

  const deleteSavedLocation = id => {
    // api call to delete User's savedLocation using id
    MemberService.updateSavedLocations(id, {});
    // delete location with id in local state
    setSavedLocations(savedLocations.filter(item => item.id !== id));
  };

  const handleDelete = id => {
    return Alert.alert(t('confirm_delete_title'), t('confirm_delete_text'), [
      {
        text: t('cancel'),
        style: 'cancel',
      },
      { text: t('confirm'), onPress: id => deleteSavedLocation(id) },
    ]);
  };

  const displaySavedLocations = () => (
    <FlatList
      data={savedLocations}
      keyExtractor={(item, index) => `${index}`}
      renderItem={({ item, index }) => (
        <LocationItem
          location={item}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      )}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
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
          <Text>{t('no_saved_locations')}</Text>
        </Inset>
      )}

      {modalVisible ? <View style={styles.modalBackdrop}></View> : null}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View style={styles.modalContainer}>
          <CloseButton onPress={() => setModalVisible(false)} />
          <Text style={styles.headerText}>
            {isEditing ? t('edit_saved_location') : t('add_saved_location')}
          </Text>
          <Input
            value={locationName}
            label={t('enter_name_label')}
            placeholder={t(enter_name_placeholder)}
            onChangeText={text => setLocationName(text)}
            style={styles.textInput}
          />
          {/* <Input
            value={locationAddress}
            label={t("enter_location_label")}
            placeholder={t("enter_location_placeholder")}
            onChangeText={text => setLocationAddress(text)}
            style={styles.textInput}
          /> */}
          <GooglePlacesInput />
          <View style={styles.submitContainer}>
            <Button
              loading={loading}
              disabled={!locationName || !locationAddress}
              title={t('save_location')}
              onPress={
                isEditing ? editSavedLocation(locationId) : addSavedLocation
              }
              // color={APP_COLOR}
            />
          </View>

          <View style={{ margin: 10 }} />
        </View>
      </Modal>

      <FAB
        style={styles.fab}
        large
        icon="plus"
        onPress={() => setModalVisible(true)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalBackdrop: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#aaa',
  },
  headerText: {
    fontSize: 23,
    textAlign: 'center',
    paddingBottom: 30,
    color: APP_COLOR.primaryTitle,
  },
  modalContainer: {
    backgroundColor: '#ddd',
    flex: 1,
    margin: 25,
    // marginTop: 70,
    padding: 35,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  fab: {
    position: 'absolute',
    margin: 25,
    right: 0,
    bottom: 0,
    backgroundColor: APP_COLOR,
    zIndex: 1,
  },
  inputPadding: {
    paddingBottom: 10,
    marginBottom: 20,
  },
  submitContainer: {
    flex: 1,
    margin: 20,
    marginBottom: 0,
  },
});

export default SavedLocations;
