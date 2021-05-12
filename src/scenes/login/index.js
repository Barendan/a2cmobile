import React from 'react';
import { SafeAreaView, View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import { LanguageSelector } from '_organisms';
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux';

import {login} from './../../store/user';

// styles
import { WHITE, APP_COLOR } from '_styles/colors';
import { scaleFont } from '_styles/mixins';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: WHITE
  },
  mainContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: APP_COLOR,
    justifyContent: 'space-between',
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
  const dispatch = useDispatch();

  const loginCurrentUser = () => {

    var userA = {
      name: 'Tom Brady',
      age: 20,
      tags: ['geek', 'nerd', 'otaku']
    };
    dispatch(login(userA));
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Text style={styles.text}>{t('screen')}: Login</Text>


      <TouchableHighlight key={'go_to_registration'} onPress={() => navigation.navigate('Registration')}>
        <Text style={styles.text}>{t('go_to_registration')}</Text>
      </TouchableHighlight>


      <TouchableHighlight key={'login_button'} onPress={loginCurrentUser}>
        <Text style={styles.text}>Click Here to Login</Text>
      </TouchableHighlight>

      <View style={[styles.touchableContainer]}>
        <LanguageSelector headerStyle={styles.text} />
      </View>

    </SafeAreaView>
  );
}

export default LoginScreen;