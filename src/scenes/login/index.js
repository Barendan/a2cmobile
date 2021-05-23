import React from 'react';
import { View, Text, Switch, TouchableHighlight, KeyboardAvoidingView, Platform } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import MatIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { TextInput, Button } from 'react-native-paper';
import { LanguageSelector } from '_organisms';
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles';
import { APP_COLOR, GREEN } from '_styles/colors';


import { login } from '_store/user';
import { updatePlan, setMemberPlans } from '_store/plan';

// styles
import { scaleFont } from '_styles/mixins';
import { MemberService } from '_services';
import { AppSettings } from '_utils';

const LoginScreen = ({ navigation, route }) => {

  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [isEnabled, setIsEnabled] = React.useState(false);
  const [isVisible, setVisible] = React.useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);

  const onLogin = () => {
    var payload = {
      login: 'eware4190@gmail.com',
      password: 'NovoTech1!',
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
        dispatch(login(data.user));
      })
      .catch((err) => {
        alert(err)
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
          onChangeText={setEmail}
          left={<TextInput.Icon  name={'account'}/>}
        />
      </View>
      <View style={[styles.spacing, { marginBottom: 20 }]}>
        <TextInput 
          label='password'
          value={password}
          secureTextEntry={!isVisible}
          onChangeText={setPassword}
          left={<TextInput.Icon  name={'lock'}/>}
          right={<TextInput.Icon onPress={() => setVisible(previousState => !previousState) } name={isVisible ? 'eye-off-outline' : 'eye' }/>}
        />
      </View>
      <Button color={APP_COLOR} mode='contained' onPress={onLogin}>
        {t('sign_in')}
      </Button>
      
      <View style={styles.authArea}>

      <View style={styles.forgotPass}>
        <Text
            style={styles.pText}
          >
            {t('forgot_password')}
          </Text>
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
        <View style={styles.alternativeLogin}>
          <Text style={{ color: APP_COLOR}}>{t('or_signin_using')}</Text>
          <View style={{ flexDirection: 'row'}}>
            <View style={styles.altLoginBtn}>
              <Button contentStyle={styles.btnContent}  mode='outlined'>
                <Icon size={24} name='finger-print' />
              </Button>
            </View>
            <View style={styles.altLoginBtn}>
              <Button contentStyle={styles.btnContent} mode='outlined'>
                <MatIcon size={25} name={'face-recognition'}/>
              </Button>
            </View>
          </View>
        </View>

      </View>

        <View style={styles.footer}>
          <Text
            fontWeight={'400'}
            textAlign="center"
            style={[{ marginRight: 5 }]}
          >
            {t('by_registering_you_agree')}
              </Text>
              <View style={styles.toRow}>
                <Text
                  style={[styles.bText,{ marginRight: 5 }]}
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
                >
                  {t('privacy_policy')}
                </Text>
              </View>
              <TouchableHighlight
                onPress={() => navigation.navigate('FAQs')}
              >
                <Text style={styles.bText}>{t('faq')}</Text>
              </TouchableHighlight>
          </View>
          

        </View>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen;