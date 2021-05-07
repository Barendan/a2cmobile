import React from 'react';
import { SafeAreaView, Text, TouchableHighlight } from 'react-native';
import { useTranslation } from "react-i18next";


const HomeScreen = ({navigation}) => {
  const { t } = useTranslation();
  return (
    <SafeAreaView>
      <Text>Screen: Home</Text>
      <Text>{t('greeting-text')}</Text>
      <TouchableHighlight onPress={() => navigation.navigate('Registration')}>
          <Text>{t('registration')}</Text>
        </TouchableHighlight>
    </SafeAreaView>
  );
};

export default HomeScreen;