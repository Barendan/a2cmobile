import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import { useTranslation } from "react-i18next";

export default function CloseButton(props) {
  const { t } = useTranslation();

  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <Text style={styles.content}>{t('close')}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    margin: 20,
    right: 0,
    zIndex: 2,
  },
  content: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 10,
    textAlign: 'right',
  },
});