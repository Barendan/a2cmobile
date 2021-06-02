import React, { useState } from 'react';
import { View, Text, Switch, TouchableHighlight, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Stack } from 'react-native-spacing-system';
import { LanguageSelector, FullScreenPanel, CreateMemberAccount, LanguageSelector } from '_organisms';
import TouchID from 'react-native-touch-id';
import MatIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { TextInput, Button, HelperText } from 'react-native-paper';
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


  const [panelDetails, setPanelDetails] = React.useState({
    panelVisible: false,
    panelDataLoading: false,
    header: '',
    body: '',
    isHTML: false,
  });

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

  React.useEffect(() => {
    async function validateSupport() {
      let storedUser = await storage.load({ key: 'user',
      id: 'currentUser', 
     });

     let savedUser = await storage.load({ key: 'savedUser',
      id: 'userSaved',
     });

     if(savedUser?.email && savedUser?.password) {
      onChangeTextInput('email', savedUser.email)
      onChangeTextInput('password', savedUser.password)
       setIsEnabled(true);
     }

     console.error(savedUser)

     if(storedUser?.id) {
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
    TouchID.authenticate('to demo this react-native component', optionalConfigObject)
      .then(success => {
        if (user && user.MemberPlans && user.MemberPlans.length > 0) {
          dispatch(setMemberPlans(user.MemberPlans));
          dispatch(updatePlan(user.MemberPlans[0])); //default to first plan
        }
        Alert.alert('Authenticated Successfully');

        dispatch(login(user));
      })
      .catch(error => {
        Alert.alert('Authentication Failed');
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
    setInputValues({
      ...inputValues,
      [field]: value
    });
    setErrors({
      ...errors,
      [field]: ''
    })
  }

  const onLogin = () => {
    if (!validateEmail()) {
      console.error('no valiod')
      setErrors({
        ...errors,
        email: 'input correct email'
      })
      return;
    }
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
          dispatch(saveLoggedInUser({email, password}));
        }
        dispatch(login(data.user));
      })
      .catch((err) => {
        alert(err?.data?.error?.message || 'unable to sign in')
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
          <Text
            style={styles.title}
          >
            {t('mercy_care')}
        </Text>
      </View>
      <View style={styles.spacing}>
        <TextInput 
          label='email'
          value={email}
          onChangeText={(e) => onChangeTextInput('email', e)}
          error={errors.email.length}
          left={<TextInput.Icon  name={'account'}/>}
          style={errors.email.length ? { borderColor: 'red', borderWidth: 1 } : {}}
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
          value={password}
          secureTextEntry={!isVisible}
          onChangeText={(e) => onChangeTextInput('password', e)}
          left={<TextInput.Icon  name={'lock'}/>}
          right={<TextInput.Icon onPress={() => setVisible(previousState => !previousState) } name={isVisible ? 'eye-off-outline' : 'eye' }/>}
        />
      </View>
      <Button color={APP_COLOR} mode='contained' onPress={onLogin} disabled={loading}>
        {t('sign_in')}
      </Button>

      {loading && <View style={styles.loadingView}>
                    <Spinner
                        isVisible={loading}
                        size={50}
                        type={'ThreeBounce'}
                        color={APP_COLOR}
                    />
                </View> }
      
      <View style={styles.authArea}>

      <View style={styles.forgotPass}>
        <Text
            style={styles.pText}
          >
            {t('forgot_password')}
          </Text>
        </View>
        <View style={styles.spacing}>
          <TextInput
            label='email'
            value={email}
            onChangeText={setEmail}
            left={<TextInput.Icon name={'account'} />}
          />
        </View>
        <View style={[styles.spacing, { marginBottom: 20 }]}>
          <TextInput
            label='password'
            value={password}
            secureTextEntry={!isVisible}
            onChangeText={setPassword}
            left={<TextInput.Icon name={'lock'} />}
            right={<TextInput.Icon onPress={() => setVisible(previousState => !previousState)} name={isVisible ? 'eye-off-outline' : 'eye'} />}
          />
        </View>
        <Button color={APP_COLOR} mode='contained' onPress={onLogin} disabled={loading}>
          {t('sign_in')}
        </Button>

        {loading && <View style={styles.loadingView}>
          <Spinner
            isVisible={loading}
            size={50}
            type={'ThreeBounce'}
            color={APP_COLOR}
          />
        </View>}

        <View style={styles.authArea}>

          <View style={styles.forgotPass}>
            <Text
              style={styles.pText}
            >
              {t('forgot_password')}
            </Text>
            <Switch
              trackColor={{ false: GREEN, true: "#81b0ff" }}
              thumbColor={isEnabled ? "#f4f3f4" : "#f5dd4b"}
              ios_backgroundColor={GREEN}
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
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

          <Text
            fontWeight={'400'}
            textAlign="center"
            style={[{ marginRight: 5 }]}
          >
            {t('by_registering_you_agree')}
          </Text>
          <View style={styles.toRow}>
            <Text
              style={[styles.bText, { marginRight: 5 }]}
              onPress={() => getLatestAppInfo(t('terms'), 'terms')}
            >
              {t('terms_of_service')}
            </Text>
            <Text
              style={{ marginRight: 5 }}
            >
              {t('and')}
            </Text>
            <Text
              style={styles.bText}
              onPress={() => getLatestAppInfo(t('privacy'), 'privacy')}
            >
              {t('privacy_policy')}
            </Text>
          </View>
          <TouchableHighlight
            onPress={() => getLatestAppInfo(t('faqs'), 'faqs')}
          >
            <Text style={styles.bText}>{t('faqs')}</Text>
          </TouchableHighlight>

          <Stack size={12} />

          <LanguageSelector />
        </View>

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