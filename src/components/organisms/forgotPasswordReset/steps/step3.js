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

const Step3 = ({ getState }) => {
  const { t } = useTranslation();

  const {
    loading,
    errorMessage,
    disableNextButton,
    passwordInformation,
    passwordRequirements,
    updatePasswordInformation,
    updatePassword,
  } = useAccountMethods();

  const { memberLogin } = getState();

  const contentWidth = useWindowDimensions().width;

  return (
    <View style={[styles.container]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
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

      <Stack size={12} />
      <View style={styles.footer}>
        <Button
          title={t('validate')}
          size="large"
          style={styles.forwardButton}
          disabled={disableNextButton || loading}
          onPress={() => updatePassword(memberLogin)}>
          {t('update_password')}
        </Button>
      </View>
    </View>
  );
};

export default Step3;
