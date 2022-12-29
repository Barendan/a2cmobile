import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native';
import { Input, Button } from '@ui-kitten/components';
import { useTranslation } from 'react-i18next';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

import { CloseButton } from '_atoms';
import { DraggablePanel } from '_molecules';
import { LocationSearchCard } from '_molecules';
import storage from '_storage';

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
  bodyWrapper: {
    paddingHorizontal: moderateScale(10),
    marginTop: moderateScale(24),
  },
  input: {
    width: '100%',
    borderWidth: 2,
    borderRadius: 2,
    alignSelf: 'center',
  },
  requiredInput: {
    borderColor: 'red',
    borderWidth: 1,
  },
  forwardButton: {
    flex: 1,
    height: moderateScale(40),
    marginHorizontal: moderateScale(6),
    borderColor: '#F5F5F5',
    borderRadius: 30,
  },
  inputText: {
    paddingVertical: moderateScale(2),
    fontSize: moderateScale(14),
  },
  inputLabel: {
    color: '#8F9BB3',
    fontSize: moderateScale(10),
    paddingBottom: '0.5%',
  },
  footer: {
    marginBottom: 10,
    flexDirection: 'row',
  },
});

const SaveLocationPanel = props => {
  const { t } = useTranslation();
  const { panelHeader, displayPanel, onPanelDismiss } = props;
  const [savedLocations, setSavedLocations] = useState([]);
  const [newLocation, setNewLocation] = React.useState({
    address: null,
    name: '',
  });

  const updateNewLocation = React.useCallback((key, value) => {
    setNewLocation(newLocation => {
      return {
        ...newLocation,
        [key]: value,
      };
    });
  }, []);

  React.useEffect(() => {
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
  }, [props]);

  const onSaveLocation = () => {
    let updatedLocations = [...savedLocations, newLocation];
    setSavedLocations([...savedLocations, newLocation]);

    storage
      .save({
        key: 'savedLocations', // Note: Do not use underscore("_") in key!
        data: updatedLocations,
        expires: null,
      })
      .then(ret => {
        onPanelDismiss();
      });
  };

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

          <Text style={styles.title}>{t('add_new_location')}</Text>
        </View>
        
        <ScrollView
          contentContainerStyle={styles.bodyWrapper}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={'handled'}
        >

          <Input
            style={[
              styles.input,
              newLocation.name.length === 0 && styles.requiredInput,
            ]}
            onChangeText={text => updateNewLocation('name', text)}
            value={newLocation.name}
            maxLength={15}
            label={() => (
              <Text style={styles.inputLabel}>
                {t('enter_name_label') + '*' + ' (maximum of 15 characters)'}
              </Text>
            )}
            placeholder={t('enter_name_label')}
            textStyle={styles.inputText}
          />

          <LocationSearchCard
            required={newLocation.address === null ? true : false}
            title={
              newLocation.name.length === 0
                ? t('address')
                : newLocation.name
            }
            description={
              newLocation.address === null
                ? t('address_description')
                : newLocation.address.FormattedAddress
            }
            onAddressSelected={addr => updateNewLocation('address', addr)}
          />
          
        </ScrollView>

        <View style={styles.footer}>
          <Button
            style={styles.forwardButton}
            disabled={
              newLocation.address === null ||
              newLocation.name.length === 0
            }
            onPress={onSaveLocation}
          >
            <Text style={{ fontSize: moderateScale(16) }}>
              {t('save_location')}
            </Text>
          </Button>
        </View>

      </View>
    </DraggablePanel>
  );
};

export default SaveLocationPanel;
