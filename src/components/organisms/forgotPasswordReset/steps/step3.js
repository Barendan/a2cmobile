import React from 'react';
import { View, Text, ScrollView, useWindowDimensions } from 'react-native';
import { Input, Button } from '@ui-kitten/components';
import { useTranslation } from 'react-i18next';
import Spinner from 'react-native-spinkit';
import { APP_COLOR } from '_styles/colors';
import { Stack } from 'react-native-spacing-system';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

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
          <Text style={styles.nameGreeting}>{t('account_password_text')}</Text>
        </View>

        <Input
          style={styles.input}
          secureTextEntry={true}
          onChangeText={text => updatePasswordInformation('password', text)}
          value={passwordInformation.password}
          label={() => (
            <Text style={styles.inputLabel}>{t('password') + '*'}</Text>
          )}
          placeholder={t('password')}
          textStyle={styles.inputText}
        />

        <Input
          style={[styles.input, { marginBottom: 0 }]}
          secureTextEntry={true}
          onChangeText={text =>
            updatePasswordInformation('confirmPassword', text)
          }
          value={passwordInformation.confirmPassword}
          label={() => (
            <Text style={styles.inputLabel}>{t('confirm_password') + '*'}</Text>
          )}
          placeholder={t('confirm_password')}
          textStyle={styles.inputText}
        />

        <Text style={styles.errorMessage}>{errorMessage}</Text>
        {/* <HTML
          source={{ html: t('password_requirements') }}
          contentWidth={contentWidth}
        /> */}
        {/* <Stack size={scale(12)} /> */}

        <Text
          style={{
            fontSize: moderateScale(12),
          }}>
          {t('password_requirements')}
        </Text>

        <List.Item
          style={{ paddingBottom: 0, marginBottom: moderateScale(-4) }}
          title={t('eight_characters_minimum')}
          titleStyle={styles.listItemTitle}
          left={props => (
            <Avatar.Icon
              {...props}
              size={scale(20)}
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
          style={{ paddingBottom: 0, marginBottom: moderateScale(-4) }}
          title={t('password_one_uppercase')}
          titleStyle={styles.listItemTitle}
          left={props => (
            <Avatar.Icon
              {...props}
              size={scale(20)}
              color={
                passwordRequirements.oneUppercaseLetter ? SUCCESS : GRAY_LIGHT
              }
              icon={'check-circle'}
              style={styles.optionsIcon}
            />
          )}
        />

        <List.Item
          style={{ paddingBottom: 0, marginBottom: moderateScale(-4) }}
          title={t('password_one_lowercase')}
          titleStyle={styles.listItemTitle}
          left={props => (
            <Avatar.Icon
              {...props}
              size={scale(20)}
              color={
                passwordRequirements.oneLowercaseLetter ? SUCCESS : GRAY_LIGHT
              }
              icon={'check-circle'}
              style={styles.optionsIcon}
            />
          )}
        />

        <List.Item
          style={{ paddingBottom: 0, marginBottom: moderateScale(-4) }}
          title={t('password_one_number')}
          titleStyle={styles.listItemTitle}
          left={props => (
            <Avatar.Icon
              {...props}
              size={scale(20)}
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
              size={scale(20)}
              color={
                passwordRequirements.oneSpecialSymbol ? SUCCESS : GRAY_LIGHT
              }
              icon={'check-circle'}
              style={styles.optionsIcon}
            />
          )}
        />
      </ScrollView>

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

      <View style={styles.footer}>
        <Button
          style={styles.forwardButton}
          disabled={disableNextButton || loading}
          onPress={() => updatePassword(memberLogin)}>
          <Text style={{ fontSize: moderateScale(16) }}>
            {t('update_password')}
          </Text>
        </Button>
      </View>
    </View>
  );
};

export default Step3;
