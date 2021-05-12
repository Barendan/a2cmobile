import React from 'react';
import { SafeAreaView, Text, TouchableHighlight } from 'react-native';
import { Inset } from "react-native-spacing-system";

import { useTranslation } from "react-i18next";


const DashboardScreen = () => {
  const { t } = useTranslation();
  return (
    <SafeAreaView>
      <Inset all={16}>
        <Text>Screen: Dashboard</Text>
        <Text>{t('greeting-text')}</Text>
      </Inset>
    </SafeAreaView>
  );
};

export default DashboardScreen;

