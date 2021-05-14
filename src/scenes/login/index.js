import React from 'react';
import { SafeAreaView, View, TouchableHighlight, StyleSheet, Platform } from 'react-native';
import { Input, Button, Text, Divider } from '@ui-kitten/components';
import { LanguageSelector } from '_organisms';
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'react-native-spinkit';
import { AppInfoService } from '_services';
import { AppSettings } from '_utils';

import { login } from './../../store/user';

// styles
import { WHITE, APP_COLOR } from '_styles/colors';
import { scaleFont } from '_styles/mixins';
import { MemberService } from '_services';



const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: WHITE
  },
  mainContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
    alignItems: 'center',
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
  },
  btn: {
    height: 40,
    width: '85%',
    borderColor: '#F5F5F5',
    backgroundColor: 'red'
  },
});

const LoginScreen = ({ navigation }) => {

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);

  const loginCurrentUser = (header, type) => {
    var payload = {
      login: 'eware4190@gmail.com',
      password: 'NovoTech1!',
      appOS: Platform.OS,
      appVersion: AppSettings.appVersion
    };

    setLoading(true);
    MemberService.loginUser(payload)
      .then((data) => {
        setLoading(false);
        dispatch(login(data.user));
      })
      .catch((err) => {
        alert(err)
        setLoading(false);
      });
  }

  return (
    <SafeAreaView style={styles.mainContainer}>



      {/* <Input
          style={styles.input}
          label={t('login') + "*"}
          placeholder={t('login')}
        />
        <Input
          style={styles.input}
          secureTextEntry={true}
          label={t('password') + "*"}
          placeholder={t('password')}
        /> */}
      <View style={[styles.touchableContainer]}>

        <Button
          title="Validate"
          size="large"
          onPress={loginCurrentUser}>
          {t('login')}
        </Button>

      </View>

      <Spinner
        isVisible={loading}
        size={50}
        type={'ThreeBounce'}
        color={APP_COLOR}
      />




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