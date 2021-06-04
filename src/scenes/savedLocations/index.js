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

import { LocationItem } from '_molecules';
import { MemberService } from '_services';
import { useSelector } from 'react-redux';

import Spinner from 'react-native-spinkit';
import { FAB } from 'react-native-paper';
import { Inset } from 'react-native-spacing-system';
import { APP_COLOR } from '_styles/colors';

import AnimatedMultistep from 'react-native-animated-multistep';
import Step1 from './steps/step1';
import Step2 from './steps/step2';

const SavedLocations = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [savedLocations, setSavedLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState({
    id: '',
    name: '',
    address: '',
  });

  const allSteps = [
    { name: t('add_saved_location'), component: Step1 },
    { name: t('edit_saved_location'), component: Step2 },
  ];
  const [currentStep, setCurrentStep] = useState(1);

  const onNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const onBack = () => {
    currentStep > 1 ? setCurrentSetup(currentStep - 1) : setModalVisible(false);
  };

  const onFinish = payload => {
    console.log(payload);

    // let payload = {
    //   // id: Math.random(), how will ID be determined?
    //   name: locationName,
    //   address: locationAddress,
    // };

    isEditing
      ? editSavedLocation(payload.id, payload)
      : addSavedLocation(payload);
  };

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

  const addSavedLocation = payload => {
    // Payload passed in as argument instead
    // let payload = {
    //   // id: Math.random(), how will ID be determined?
    //   name: locationName,
    //   address: locationAddress,
    // };

    // api call to add new location to specific user
    MemberService.updateUser(payload)
      .then(data => {
        setLoading(false);
        setModalVisible(false);
        // alert user of success
        // dispatch update to store
      })
      .catch(err => {
        alert(err);
        setLoading(false);
      });
  };

  const editSavedLocation = (id, payload) => {
    // Payload passed in as argument instead
    // let payload = {
    //   name: locationName,
    //   address: locationAddress,
    // };
    setLoading(true);

    // make api call, selecting location with :id and passing a payload
    MemberService.updateUserLocation(id, payload)
      .then(data => {
        setLoading(false);
        setModalVisible(false);
        setIsEditing(false);
        // alert user of success
        // dispatch update to store
      })
      .catch(err => {
        alert(err);
        setLoading(false);
      });
  };

  const handleEdit = id => {
    setIsEditing(true);
    setCurrentStep(2);
    setModalVisible(true);
    const locationToEdit = savedLocations.find(location => location.id === id);
    setSelectedLocation(locationToEdit);
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

      {/* {modalVisible ? <View style={styles.modalBackdrop}></View> : null} */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View style={styles.modalContainer}>
          <AnimatedMultistep
            steps={allSteps}
            onNext={onNext}
            onBack={onBack}
            onFinish={onFinish}
            comeInOnNext="bounceInUp"
            OutOnNext="bounceOutDown"
            comeInOnBack="bounceInDown"
            OutOnBack="bounceOutUp"
          />
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
  // modalBackdrop: {
  //   flex: 1,
  //   position: 'absolute',
  //   top: 0,
  //   bottom: 0,
  //   left: 0,
  //   right: 0,
  //   backgroundColor: '#aaa',
  // },
  modalContainer: {
    flex: 1,
    backgroundColor: '#dbdbdb',
  },
  fab: {
    position: 'absolute',
    margin: 25,
    right: 0,
    bottom: 0,
    backgroundColor: APP_COLOR,
    zIndex: 1,
  },
});

export default SavedLocations;
