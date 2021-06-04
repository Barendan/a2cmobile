import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Input, Button } from '@ui-kitten/components';
import { Inset } from 'react-native-spacing-system';

import { APP_COLOR } from '_styles/colors';

const Step2 = ({ back, next, getState, saveState }) => {
  const { t } = useTranslation();
  const [selectedLocation, setSelectedLocation] = useState({
    id: '',
    name: '',
    address: '',
  });

  useEffect(() => {
    const { address } = getState();
    setSelectedLocation({ ...selectedLocation, address });
  }, []);

  const goBack = () => {
    back();
  };

  const nextStep = () => {
    saveState(selectedLocation);
    next();
  };

  return (
    <View style={{ flex: 1 }}>
      <Inset vertical={16}>
        <Text style={styles.headerText}>
          {/* {isEditing ? t('edit_saved_location') : t('add_saved_location')} */}
          {t('add_saved_location')}
        </Text>
      </Inset>

      <Inset horizontal={16}>
        <Input
          value={selectedLocation.name}
          label={t('enter_name_label')}
          placeholder={t('enter_name_placeholder')}
          size="large"
          onChangeText={text =>
            setSelectedLocation({ ...selectedLocation, name: text })
          }
          style={styles.textInput}
        />
      </Inset>

      <Inset horizontal={16}>
        <Input
          value={selectedLocation.address}
          label={t('enter_location_label')}
          placeholder={t('enter_location_placeholder')}
          size="large"
          // onChangeText={text => setSelectedLocation({...selectedLocation, address: text})}
          style={styles.textInput}
        />
      </Inset>

      <Inset vertical={8} />

      <Inset horizontal={16}>
        <Button
          disabled={!selectedLocation.name}
          title="Save Location"
          onPress={nextStep}
          size="large">
          {t('save_location')}
        </Button>
      </Inset>
    </View>
  );
};

const styles = StyleSheet.create({
  headerText: {
    fontSize: 30,
    textAlign: 'center',
    paddingBottom: 20,
    color: APP_COLOR.primaryTitle,
  },
  textInput: {
    paddingBottom: 15,
  },
});

export default Step2;
