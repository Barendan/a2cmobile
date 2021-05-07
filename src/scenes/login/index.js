import React from 'react';
import { SafeAreaView, View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import { LanguageSelector } from '_organisms';
import { useTranslation } from "react-i18next";

// styles
import { WHITE } from '_styles/colors';
import { scaleFont } from '_styles/mixins';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: WHITE
  },
  mainContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#276092',
    justifyContent: 'center',
    alignItems: 'center',
    color: WHITE,
    flex: 1
  },
  touchableContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 2,
  },
  text: {
    fontSize: scaleFont(24),
    fontWeight: 'bold',
    color: WHITE,
  },
});

const LoginScreen = ({ navigation }) => {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.mainContainer}>
          <Text style={styles.text}>{t('screen')}: Login</Text>
          <TouchableHighlight key={'go_to_home'} onPress={() => navigation.navigate('Home')}>
            <Text style={styles.text}>{t('go_to_home')}</Text>
          </TouchableHighlight>
          <TouchableHighlight key={'go_to_registration'} onPress={() => navigation.navigate('Registration')}>
            <Text style={styles.text}>{t('go_to_registration')}</Text>
          </TouchableHighlight>

        <View style={[styles.touchableContainer]}>
          <LanguageSelector headerStyle={styles.text} />
        </View>

    </SafeAreaView>
  );
}

export default LoginScreen;