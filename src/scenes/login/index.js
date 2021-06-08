import React, { useState } from 'react';
import { View, Text, Switch, TouchableHighlight, KeyboardAvoidingView, Platform, Alert, Image } from 'react-native';
import { Stack } from 'react-native-spacing-system';
import { LanguageSelector, FullScreenPanel, CreateMemberAccount, ForgotPasswordReset } from '_organisms';
import TouchID from 'react-native-touch-id';
import MatIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { TextInput, Button, HelperText } from 'react-native-paper';
import { Button as LoginBtn } from '@ui-kitten/components';
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles';
import { APP_COLOR, GREEN } from '_styles/colors';
import Spinner from 'react-native-spinkit';
import { sha256 } from 'react-native-sha256';


import { login, saveLoggedInUser } from '_store/user';
import { updatePlan, setMemberPlans } from '_store/plan';

// styles
import { scaleFont } from '_styles/mixins';
import { AppInfoService, MemberService } from '_services';
import { AppSettings } from '_utils';
import storage from '../../storage';

const LoginScreen = ({ navigation, route }) => {
  const { plan } = useSelector(state => state.plan);

  const [inputValues, setInputValues] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  })
  const { email, password } = inputValues;
  const [isEnabled, setIsEnabled] = React.useState(false);
  const [isVisible, setVisible] = React.useState(false);
  const [supportedFaceId, setSupportedFaceId] = React.useState(false);
  const [supportTouch, setSupportTouch] = React.useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [user, setUser] = useState({});
  const [displayCreateMemberAccount, setDisplayCreateMemberAccount] = React.useState(false);
  const [displayForgotPasswordReset, setDisplayForgotPasswordReset] = React.useState(false);


  const [panelDetails, setPanelDetails] = React.useState({
    panelVisible: false,
    panelDataLoading: false,
    header: '',
    body: '',
    isHTML: false,
  });

  React.useEffect(() => {
    async function validateSupport() {
      let storedUser = await storage.load({
        key: 'user',
        id: 'currentUser',
      });

      let savedUser = await storage.load({
        key: 'savedUser',
        id: 'userSaved',
      });

      if (savedUser?.email && savedUser?.password) {
        onChangeTextInput('email', savedUser.email)
        onChangeTextInput('password', savedUser.password)
        setIsEnabled(true);
      }

      if (storedUser?.id) {
        setUser(storedUser);
        const optionalConfigObject = {
          unifiedErrors: false,
          passcodeFallback: false
        }
        TouchID.isSupported(optionalConfigObject)
          .then(biometryType => {
            if (biometryType === 'FaceID') {
              setSupportedFaceId(true);
            } else {
              setSupportTouch(true);
            }
          })
          .catch(error => {
          });
      }
    }
    validateSupport();
  }, []);

  const updatePanelDetails = React.useCallback((key, value) => {
    setPanelDetails(panelDetails => {
      return {
        ...panelDetails,
        [key]: value,
      };
    });
  }, []);

  const onPanelDismiss = () => {
    updatePanelDetails('panelVisible', false);
  };

  const getLatestAppInfo = (header, type) => {
    updatePanelDetails('panelDataLoading', true);
    updatePanelDetails('panelVisible', true);

    AppInfoService.getAppInformation(type)
      .then(data => {
        var response = null;

        switch (type) {
          case 'terms':
            response = data.terms;
            break;
          case 'privacy':
            response = data.privacy;
            break;
          case 'faqs':
            response = data.faqs;
            break;
        }

        updatePanelDetails('panelDataLoading', false);
        updatePanelDetails('panelVisible', true);
        updatePanelDetails('header', header);
        updatePanelDetails('body', response.caption);
        updatePanelDetails('isHTML', true);
      })
      .catch(err => {
        alert(err);
        updatePanelDetails('panelDataLoading', false);
      });
  };

  const optionalConfigObject = {
    title: 'Authentication Required', // Android
    imageColor: '#e00606', // Android
    imageErrorColor: '#ff0000', // Android
    sensorDescription: 'Touch sensor', // Android
    sensorErrorDescription: 'Failed', // Android
    cancelText: 'Cancel', // Android
    fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
    unifiedErrors: false, // use unified error messages (default false)
    passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
  };

  function biometricLogin() {
    TouchID.authenticate(t('biometric_login'), optionalConfigObject)
      .then(success => {
        if (user && user.MemberPlans && user.MemberPlans.length > 0) {
          dispatch(setMemberPlans(user.MemberPlans));
          dispatch(updatePlan(user.MemberPlans[0])); //default to first plan
        }
        Alert.alert(t('authenticated_successfully'));

        dispatch(login(user));
      })
      .catch(error => {
        Alert.alert(t('authentication_failed'));
      });
  }

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);

  const validateEmail = () => {
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return re.test(String(email).toLocaleLowerCase());
  }

  const onChangeTextInput = (field, value) => {
    setInputValues((inpValue) => ({
      ...inpValue,
      [field]: value
    }));
    setErrors({
      ...errors,
      [field]: ''
    })
  }

  const onLogin = async () => {
    // if (!validateEmail()) {
    //   setErrors({
    //     ...errors,
    //     email: t('email_address_invalid'),
    //   })
    //   return;
    // }
    const hashedPassword = await sha256(password);

    let payload = {
      login: email,
      password: hashedPassword,
      appOS: Platform.OS,
      appVersion: AppSettings.appVersion
    };

    // var payload = {
    //   login: email,
    //   password: password,
    //   appOS: Platform.OS,
    //   appVersion: AppSettings.appVersion
    // };

    setLoading(true);
    MemberService.loginUser(payload)
      .then((data) => {
        setLoading(false);
        if (data.user && data.user.MemberPlans && data.user.MemberPlans.length > 0) {
          dispatch(setMemberPlans(data.user.MemberPlans));
          dispatch(updatePlan(data.user.MemberPlans[0])); //default to first plan
        }
        if (isEnabled) {
          dispatch(saveLoggedInUser({ email, password }));
        }
        dispatch(login(data.user));
      })
      .catch((err) => {
        alert(err?.message || 'unable to sign in')
        setLoading(false);
      });
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardAvoidViewing}
    >
      <View style={styles.container}>
        <View style={styles.topContainer}>

          <View>
              {plan && plan.contractLogo ? <Image
                style={{
                  resizeMode: 'contain',
                  height: 100,
                  width: 230,
                  alignSelf: 'center'
                }}
                source={{
                  uri: `data:image/jpg;base64,${plan.contractLogo}`
                }}
              /> : 
              <Image
                style={{
                  resizeMode: 'contain',
                  height: 100,
                  width: 230,
                  alignSelf: 'center'
                }}
                source={require('_assets/images/A2CFullLogo.png')}
              />}

            <Text style={styles.title}>{plan && plan.contractName}</Text>
          </View>


        </View>
        <View style={styles.spacing}>
          <TextInput
            label='login'
            value={email}
            onChangeText={(e) => onChangeTextInput('email', e)}
            left={<TextInput.Icon name={'account'} />}
            style={[errors.email.length ? { borderColor: 'red', borderWidth: 1 } : {}, styles.input]}
          />
          {
            errors?.email?.length ? (
              <HelperText
                style={errors.email.length ? { color: 'red' } : {}}
                type="error" visible={true}>
                {errors.email}
              </HelperText>
            ) : null
          }

        </View>
        <View style={[styles.spacing, { marginBottom: 20 }]}>
          <TextInput
            label='password'
            style={styles.input}
            value={password}
            secureTextEntry={!isVisible}
            onChangeText={(e) => onChangeTextInput('password', e)}
            left={<TextInput.Icon name={'lock'} />}
            right={<TextInput.Icon onPress={() => setVisible(previousState => !previousState)} name={isVisible ? 'eye-off-outline' : 'eye'} />}
          />
        </View>
        <LoginBtn
         color={APP_COLOR}
         size="large"
         style={styles.loginBtn}
         onPress={onLogin} 
         disabled={loading}>
          {t('sign_in')}
        </LoginBtn>

        {loading && <View style={styles.loadingView}>
          <Spinner
            isVisible={loading}
            size={50}
            type={'ThreeBounce'}
            color={APP_COLOR}
          />
        </View>}

        <View style={styles.authArea}>

          <View style={styles.authArea}>

            <View style={styles.forgotPass}>
              <TouchableHighlight
                onPress={() => setDisplayForgotPasswordReset(true)}
              >
                <Text
                  style={styles.pText}
                >
                  {t('forgot_password')}
                </Text>
              </TouchableHighlight>

              <View style={styles.thumbContainer}>

                <Text
                  style={[styles.pText, { marginRight: 5 }]}
                >
                  {t('save_login')}
                </Text>
                <Switch
                  trackColor={{ false: GREEN, true: "#81b0ff" }}
                  thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                  ios_backgroundColor={GREEN}
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                />
              </View>
            </View>
            {
              (supportTouch || supportedFaceId) && (
                <View style={styles.alternativeLogin}>
                  <Text style={{ color: APP_COLOR }}>{t('or_signin_using')}</Text>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={styles.altLoginBtn}>
                      <Button onPress={biometricLogin} contentStyle={styles.btnContent} mode='outlined'>
                        <MatIcon size={25} name={'face-recognition'} />
                      </Button>
                    </View>
                  </View>
                </View>
              )
            }

          </View>

          <View style={styles.footer}>

            {/* <TouchableHighlight
            onPress={() => navigation.navigate('Registration')}
          >
            <Text style={styles.bText}>{t('go_to_registration')}</Text>
          </TouchableHighlight> */}

            <TouchableHighlight
              onPress={() => setDisplayCreateMemberAccount(true)}
            >
              <Text style={styles.bText}>{t('go_to_registration')}</Text>
            </TouchableHighlight>

            <Stack size={12} />

            <TouchableHighlight
              onPress={() => getLatestAppInfo(t('faqs'), 'faqs')}
            >
              <Text style={styles.bText}>{t('faqs')}</Text>
            </TouchableHighlight>

            <Stack size={12} />

            <LanguageSelector />
          </View>


          <ForgotPasswordReset
            displayPanel={displayForgotPasswordReset}
            onPanelDismiss={() => setDisplayForgotPasswordReset(false)}
          />


          <CreateMemberAccount
            displayPanel={displayCreateMemberAccount}
            onPanelDismiss={() => setDisplayCreateMemberAccount(false)}
          />


          <FullScreenPanel
            isHTML={panelDetails.isHTML}
            displayPanel={panelDetails.panelVisible}
            panelHeader={panelDetails.header}
            panelBody={panelDetails.body}
            onPanelDismiss={onPanelDismiss}
          />

        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen;