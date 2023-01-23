import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Image,
} from 'react-native';

import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { sha256 } from 'react-native-sha256';
import Spinner from 'react-native-spinkit';
import { TextInput, HelperText } from 'react-native-paper';
import { Toggle, Button } from '@ui-kitten/components';
import { Inset, Stack } from 'react-native-spacing-system';
import { scale, moderateScale } from 'react-native-size-matters';
import { Linking } from 'react-native';
import VersionCheck from 'react-native-version-check';

import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ReactNativeBiometrics from 'react-native-biometrics';

import { login, saveLoggedInUser } from '_store/user';
import { updatePlan, setMemberPlans } from '_store/plan';
import { AppInfoService, MemberService } from '_services';
import { AppSettings } from '_utils';
import storage from '../../storage';

import {
  LanguageSelector,
  FullScreenPanel,
  CreateMemberAccount,
  ForgotPasswordReset,
} from '_organisms';
import { AppButton } from '_atoms';
import { APP_COLOR } from '_styles/colors';
import styles from './styles';

const LoginScreen = () => {
  const { plan } = useSelector(state => state.plan);

  const [inputValues, setInputValues] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  const { email, password } = inputValues;
  const [isEnabled, setIsEnabled] = React.useState(false);
  const [isVisible, setVisible] = React.useState(false);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [user, setUser] = useState({});
  const [
    displayCreateMemberAccount,
    setDisplayCreateMemberAccount,
  ] = React.useState(false);
  const [
    displayForgotPasswordReset,
    setDisplayForgotPasswordReset,
  ] = React.useState(false);

  const [supportedFaceId, setSupportedFaceId] = React.useState(false);
  const [supportedTouch, setSupportedTouch] = React.useState(false);
  const [supportedBiometry, setSupportedBiometry] = React.useState(false);

  const [panelDetails, setPanelDetails] = React.useState({
    panelVisible: false,
    panelDataLoading: false,
    header: '',
    body: '',
    isHTML: false,
  });
  
  React.useEffect(() => {
    
    const getUpdate = () => { 
      VersionCheck.getStoreUrl()
      .then( url => {
        
        Alert.alert(
          "New Update Available",
          "To ensure everything runs smoothly, an update to the app is required.",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            { text: "Update", onPress: () => Linking.openURL(url) }
          ]
        );

      })
      .catch( err => { console.log('Check update err:', err)})
    }
    
    let currentVersion = VersionCheck.getCurrentVersion();
    VersionCheck.getLatestVersion({
      provider: 'appStore'  // for iOS
    })
    .then(latestVersion => {
      currentVersion === latestVersion ? null : getUpdate();
    })

  }, [])

  React.useEffect(() => {
    async function validateSupport() {
      let storedUser = await storage
        .load({
          key: 'user',
          id: 'currentUser',
        })
        .catch(err => {
          // any exception including data not found
          // goes to catch()
          // console.warn(err.message);
          switch (err.name) {
            case 'NotFoundError':
              console.log('No user in local storage.');
              break;
            case 'ExpiredError':
              console.log('Stored user has expired.');
              break;
          }
        });

      let savedUser = await storage
        .load({
          key: 'savedUser',
          id: 'userSaved',
        })
        .catch(err => {
          // any exception including data not found
          // goes to catch()
          // console.warn(err.message);
          switch (err.name) {
            case 'NotFoundError':
              console.log('No saved user data.');
              break;
            case 'ExpiredError':
              console.log('Saved user data expired.');
              break;
          }
        });

      if (savedUser?.email && savedUser?.password) {
        onChangeTextInput('email', savedUser.email);
        onChangeTextInput('password', savedUser.password);
        setIsEnabled(true);
      }

      if (storedUser?.id) {
        setUser(storedUser);
      }
    }
    validateSupport();
  }, []);

  React.useEffect(() => {
    ReactNativeBiometrics.isSensorAvailable().then(resultObject => {
      const { available, biometryType } = resultObject;

      if (available && biometryType === ReactNativeBiometrics.TouchID) {
        console.log('TouchID is supported');
        setSupportedTouch(true);
      } else if (available && biometryType === ReactNativeBiometrics.FaceID) {
        console.log('FaceID is supported');
        setSupportedFaceId(true);
      } else if ( available && biometryType === ReactNativeBiometrics.Biometrics) {
        console.log('Biometrics is supported');

        ReactNativeBiometrics.biometricKeysExist().then(resultObject => {
          const { keysExist } = resultObject;

          if (keysExist) {
            console.log('Keys exist');

            // If a key exists, show the option
            setSupportedBiometry(true);
          } else {
            console.log('Keys do not exist or were deleted');

            // Create Keys
            // Save Keys to localstorage
            
            ReactNativeBiometrics.createKeys('Confirm fingerprint')
            .then(
              resultObject => {
                const { publicKey } = resultObject;
                console.log(publicKey);
                
                sendPublicKeyToServer(publicKey)
                .catch((err) => console.log('error when sending public key to server:',err));
              })
            .catch(err => console.log('create keys problem:', err))

          }
        });
        
      } else {
        console.log('Biometrics not supported');
      }
    });
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

  const biometricLogin = () => {

    ReactNativeBiometrics.simplePrompt({promptMessage: t('biometric_login')})
    .then((resultObject) => {
      const { success } = resultObject
  
      if (success) {
        console.log('successful biometrics provided')


        Alert.alert(t('authenticated_successfully'));
      } else {
        console.log('user cancelled biometric prompt')
      }
    })
    .catch((err) => {
      Alert.alert(t('authentication_failed'));
      console.log('biometrics failed', err)
    })

  }




  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);

  // const validateEmail = () => {
  //   const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  //   return re.test(String(email).toLocaleLowerCase());
  // };

  const onChangeTextInput = (field, value) => {
    setInputValues(inpValue => ({
      ...inpValue,
      [field]: value,
    }));
    setErrors({
      ...errors,
      [field]: '',
    });
  };

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
      appVersion: AppSettings.appVersion,
    };

    setLoading(true);
    MemberService.loginUser(payload)
      .then(data => {
        setLoading(false);
        if (
          data.user &&
          data.user.MemberPlans &&
          data.user.MemberPlans.length > 0
        ) {
          dispatch(setMemberPlans(data.user.MemberPlans));
          dispatch(updatePlan(data.user.MemberPlans[0])); //default to first plan
        }
        if (isEnabled) {
          dispatch(saveLoggedInUser({ email, password }));
        }
        dispatch(login(data.user));
      })
      .catch(err => {
        if (err?.message.split(' ').slice(-1).toString() === "passsword.") {
          alert('You have exceeded the allowed number of retries. Please request a new password.')
        } else {
          alert(err?.message || 'unable to sign in');
        }
        setLoading(false);
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoidViewing}>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View>
            {plan && plan.contractLogo ? (
              <Image
                style={styles.logoImage}
                source={{
                  uri: `data:image/jpg;base64,${plan.contractLogo}`,
                }}
              />
            ) : (
              <Image
                style={styles.logoImage}
                source={require('_assets/images/A2CFullLogo.png')}
              />
            )}

            <Text style={styles.title}>{plan && plan.contractName}</Text>
          </View>
        </View>

        <Inset all={scale(10)}>
          <View>
            <TextInput
              label={<Text style={{ fontSize: moderateScale(16) }}>Login</Text>}
              value={email}
              onChangeText={e => onChangeTextInput('email', e)}
              left={
                <TextInput.Icon
                  size={scale(18)}
                  style={{ marginLeft: moderateScale(8) }}
                  name={'account'}
                />
              }
              style={[
                errors.email.length
                  ? { borderColor: 'red', borderWidth: 1 }
                  : {},
                styles.input,
              ]}
            />
            {errors?.email?.length ? (
              <HelperText
                style={errors.email.length ? { color: 'red' } : {}}
                type="error"
                visible={true}>
                {errors.email}
              </HelperText>
            ) : null}
          </View>
          <Stack size={scale(6)} />
          <View>
            <TextInput
              style={styles.input}
              label={<Text style={{ fontSize: scale(16) }}>Password</Text>}
              value={password}
              secureTextEntry={!isVisible}
              onChangeText={e => onChangeTextInput('password', e)}
              left={
                <TextInput.Icon
                  size={scale(18)}
                  style={{ marginLeft: moderateScale(8) }}
                  name={'lock'}
                />
              }
              right={
                <TextInput.Icon
                  onPress={() => setVisible(previousState => !previousState)}
                  name={isVisible ? 'eye-off-outline' : 'eye'}
                  size={scale(12)}
                  style={{ marginRight: 20 }}
                />
              }
            />
          </View>

          <View style={styles.forgotPass}>
            <TouchableHighlight
              onPress={() => setDisplayForgotPasswordReset(true)}>
              <Text style={styles.pText}>{t('forgot_password')}</Text>
            </TouchableHighlight>

            <View style={styles.thumbContainer}>
              <Text style={[styles.pText, { marginRight: moderateScale(5) }]}>
                {t('save_login')}
              </Text>
              <Toggle checked={isEnabled} onChange={toggleSwitch} />
            </View>
          </View>





          {( supportedTouch || supportedFaceId || supportedBiometry) && (
            <TouchableHighlight onPress={biometricLogin}>
              <View style={styles.alternativeLogin}>
                <Text style={styles.pText}>{t('or_signin_using')}</Text>
                <View style={styles.altLoginBtn}>
                  <MatIcon
                    size={moderateScale(20)}
                    color={APP_COLOR}
                    name={'face-recognition'}
                  />
                </View>
              </View>
            </TouchableHighlight>
          )}





          <Stack size={scale(30)} />

          <View style={styles.authArea}>
            {loading && (
              <View style={styles.loadingView}>
                <Spinner
                  isVisible={loading}
                  size={scale(30)}
                  type={'ThreeBounce'}
                  color={APP_COLOR}
                />
              </View>
            )}
            <AppButton
              title={t('sign_in')}
              color={APP_COLOR}
              color={'#1976d2'}
              containerStyle={styles.btnContainer}
              textStyle={styles.btnText}
              onPress={onLogin}
            />

            <Stack size={scale(4)} />

            <AppButton
              title={t('go_to_registration')}
              color={APP_COLOR}
              color={'#1976d2'}
              containerStyle={styles.btnContainer}
              textStyle={styles.btnText}
              onPress={() => setDisplayCreateMemberAccount(true)}
            />
            <Stack size={scale(50)} />
          </View>

          <View style={styles.authArea}>
            <View style={styles.footer}>
              <Stack size={scale(6)} />

              <TouchableHighlight
                onPress={() => getLatestAppInfo(t('faq'), 'faqs')}>
                <Text style={styles.bText}>{t('faq')}</Text>
              </TouchableHighlight>
              <LanguageSelector />
              <Stack size={scale(6)} />
            </View>

            <ForgotPasswordReset
              displayPanel={displayForgotPasswordReset}
              onPanelDismiss={() => setDisplayForgotPasswordReset(false)}
            />

            <CreateMemberAccount
              displayPanel={displayCreateMemberAccount}
              onPanelDismiss={() => setDisplayCreateMemberAccount(false)}
              onForgotPassword={() => setDisplayForgotPasswordReset(true)}
              // onPanelDismiss={() => console.log('test working')}
            />

            { panelDetails.panelVisible && 
              <FullScreenPanel
                isHTML={panelDetails.isHTML}
                displayPanel={panelDetails.panelVisible}
                panelHeader={panelDetails.header}
                panelBody={panelDetails.body}
                onPanelDismiss={onPanelDismiss}
                staticKeyboard
              />
            }
            
          </View>
        </Inset>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
