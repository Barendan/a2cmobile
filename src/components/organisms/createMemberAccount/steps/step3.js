import React from 'react';
import {
  View,
  Text,
  ScrollView,
  useWindowDimensions,
  TextInput,
} from 'react-native';
import { Input, Button } from '@ui-kitten/components';
import { useTranslation } from 'react-i18next';
import Spinner from 'react-native-spinkit';
import { APP_COLOR } from '_styles/colors';
import { Stack } from 'react-native-spacing-system';
import styles from './styles';
import { useAccountMethods } from '_hooks';
import HTML from 'react-native-render-html';
import { Avatar, List } from 'react-native-paper';
import { SUCCESS, GRAY_LIGHT } from '_styles/colors';
import { AppInfoService } from '_services';
import { FullScreenPanel } from '_organisms';

const Step3 = ({ next, getState }) => {
  const { t } = useTranslation();
  const [panelDetails, setPanelDetails] = React.useState({
    panelVisible: false,
    panelDataLoading: false,
    header: '',
    body: '',
    isHTML: false,
  });

  const {
    loading,
    errorMessage,
    disableNextButton,
    passwordInformation,
    passwordRequirements,
    updatePasswordInformation,
    registerUser,
  } = useAccountMethods();

  const { memberRecord, memberLogin } = getState();

  const contentWidth = useWindowDimensions().width;

  const onPanelDismiss = () => {
    updatePanelDetails('panelVisible', false);
  };

  const updatePanelDetails = React.useCallback((key, value) => {
    setPanelDetails(panelDetails => {
      return {
        ...panelDetails,
        [key]: value,
      };
    });
  }, []);

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

  return (
    <View style={[styles.container]}>
      <ScrollView
        showsVerticalScrollIndicator={true}
        style={styles.formContainer}>
        <View style={[{ alignItems: 'flex-start', width: '85%' }]}>
          <Text category="s1" style={[{ marginBottom: '5%' }]}>
            {t('account_password_text')}
          </Text>
        </View>
        <Input
          style={styles.input}
          secureTextEntry={true}
          onChangeText={text => updatePasswordInformation('password', text)}
          value={passwordInformation.password}
          label={t('password') + '*'}
          placeholder={t('password')}
        />
        <Input
          style={styles.input}
          secureTextEntry={true}
          onChangeText={text =>
            updatePasswordInformation('confirmPassword', text)
          }
          value={passwordInformation.confirmPassword}
          label={t('confirm_password') + '*'}
          placeholder={t('confirm_password')}
        />

        <HTML
          source={{ html: t('password_requirements') }}
          contentWidth={contentWidth}
        />

        <List.Item
          title={t('eight_characters_minimum')}
          titleStyle={styles.listItemTitle}
          style={styles.listItem}
          left={props => (
            <Avatar.Icon
              {...props}
              size={30}
              color={
                passwordRequirements.eightCharactersMinimum
                  ? SUCCESS
                  : GRAY_LIGHT
              }
              icon={'check-circle'}
              style={styles.optionsIcon}
            />
          )}
        />

        <List.Item
          title={t('password_one_uppercase')}
          titleStyle={styles.listItemTitle}
          style={styles.listItem}
          left={props => (
            <Avatar.Icon
              {...props}
              size={30}
              color={
                passwordRequirements.oneUppercaseLetter ? SUCCESS : GRAY_LIGHT
              }
              icon={'check-circle'}
              style={styles.optionsIcon}
            />
          )}
        />

        <List.Item
          title={t('password_one_lowercase')}
          titleStyle={styles.listItemTitle}
          style={styles.listItem}
          left={props => (
            <Avatar.Icon
              {...props}
              size={30}
              color={
                passwordRequirements.oneLowercaseLetter ? SUCCESS : GRAY_LIGHT
              }
              icon={'check-circle'}
              style={styles.optionsIcon}
            />
          )}
        />

        <List.Item
          title={t('password_one_number')}
          titleStyle={styles.listItemTitle}
          style={styles.listItem}
          left={props => (
            <Avatar.Icon
              {...props}
              size={30}
              color={passwordRequirements.oneNumber ? SUCCESS : GRAY_LIGHT}
              icon={'check-circle'}
              style={styles.optionsIcon}
            />
          )}
        />

        <List.Item
          title={t('password_one_special_symbol')}
          titleStyle={styles.listItemTitle}
          style={styles.listItem}
          left={props => (
            <Avatar.Icon
              {...props}
              size={30}
              color={
                passwordRequirements.oneSpecialSymbol ? SUCCESS : GRAY_LIGHT
              }
              icon={'check-circle'}
              style={styles.optionsIcon}
            />
          )}
        />
      </ScrollView>

      <Text style={styles.errorMessage}>{errorMessage}</Text>

      {loading && (
        <View style={styles.loadingView}>
          <Spinner
            isVisible={loading}
            size={50}
            type={'ThreeBounce'}
            color={APP_COLOR}
          />
        </View>
      )}

      <Stack size={6} />
      <View style={styles.footer}>
        <Button
          title={t('validate')}
          size="large"
          style={styles.forwardButton}
          disabled={disableNextButton || loading}
          onPress={() => registerUser(memberRecord, memberLogin)}>
          {t('complete_registration')}
        </Button>
      </View>

      <Text
        fontWeight={'400'}
        textAlign="center"
        style={[{ marginRight: 5, marginTop: 5 }]}>
        {t('by_registering_you_agree')}
      </Text>

      <View style={styles.toRow}>
        <Text
          style={[styles.bText, { marginRight: 5 }]}
          onPress={() => getLatestAppInfo(t('terms'), 'terms')}>
          {t('terms_of_service')}
        </Text>
        <Text style={{ marginRight: 5 }}>{t('and')}</Text>
        <Text
          style={styles.bText}
          onPress={() => getLatestAppInfo(t('privacy'), 'privacy')}>
          {t('privacy_policy')}
        </Text>
      </View>

      <FullScreenPanel
        isHTML={panelDetails.isHTML}
        displayPanel={panelDetails.panelVisible}
        panelHeader={panelDetails.header}
        panelBody={panelDetails.body}
        onPanelDismiss={onPanelDismiss}
      />
    </View>
  );
};

export default Step3;
