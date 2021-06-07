import React from 'react';
import { View, StyleSheet } from 'react-native';
import { GooglePlacesInput } from '_helpers/LocationService';
import { IconButton } from 'react-native-paper';

const Step1 = ({ back, next, saveState }) => {
  const nextStep = data => {
    const addressMainText = data.structured_formatting.main_text;
    saveState({ address: addressMainText });
    next();
  };

  return (
    <View style={styles.searchBarContainer}>
      <IconButton
        icon="arrow-left"
        color="#000"
        size={26}
        onPress={back}
        style={{ marginTop: 10, marginRight: 2 }}
      />
      <GooglePlacesInput handleSubmit={nextStep} />
    </View>
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingBottom: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
  },
});

export default Step1;
