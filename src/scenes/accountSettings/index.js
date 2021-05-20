import React from 'react';
import { StyleSheet, SafeAreaView, Text, View } from 'react-native';
import { Inset, Stack } from "react-native-spacing-system";
import { useTranslation } from "react-i18next";
import { Toggle } from '@ui-kitten/components';
import Spinner from 'react-native-spinkit';
import { useDispatch, useSelector } from 'react-redux';

import DropdownAlert from 'react-native-dropdownalert';

import { MemberService, AppInfoService } from '_services';
import { update } from '_store/user';

// styles
import { APP_COLOR } from '_styles/colors';

const AccountSettings = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);

  const [loading, setLoading] = React.useState(false);
  const [pageLoaded, setPageLoaded] = React.useState(false);

  const [selectedOption, setSelectedOption] = React.useState({
    pushNotificationsEnabled: false,
    smsNotificationsEnabled: false,
    emailNotificationsEnabled: false
  });

  const updateSelectedOption = React.useCallback((key, value) => {
    setSelectedOption((selectedOption) => {
      return ({
        ...selectedOption,
        [key]: value
      });
    });
  }, []);

  React.useEffect(() => {
    updateSelectedOption("pushNotificationsEnabled", user.pushNotificationsEnabled);
    updateSelectedOption("smsNotificationsEnabled", user.smsNotificationsEnabled);
    updateSelectedOption("emailNotificationsEnabled", user.emailNotificationsEnabled);
    setPageLoaded(true);
  }, []);

  React.useEffect(() => {
    if (pageLoaded) {
      var payload = {
        id: user.id,
        pushNotificationsEnabled: selectedOption.pushNotificationsEnabled,
      };
      updateAccountOption(payload);
    }
  }, [selectedOption.pushNotificationsEnabled])

  React.useEffect(() => {
    if (pageLoaded) {
      var payload = {
        id: user.id,
        smsNotificationsEnabled: selectedOption.smsNotificationsEnabled,
      };
      updateAccountOption(payload);
    }
  }, [selectedOption.smsNotificationsEnabled])


  React.useEffect(() => {
    if (pageLoaded) {
      var payload = {
        id: user.id,
        emailNotificationsEnabled: selectedOption.emailNotificationsEnabled
      };
      updateAccountOption(payload);
    }
  }, [selectedOption.emailNotificationsEnabled])


  const updateAccountOption = (payload) => {
    setLoading(true);
    MemberService.updateUser(payload)
      .then((data) => {
        setLoading(false);
        //this.dropDownAlertRef.alertWithType('success', t('success_text'), t('account_settings_updated'));
        updateCurrentUserRecord()
      })
      .catch((err) => {
        alert(err)
        setLoading(false);
      });
  }

  //update member record
  const updateCurrentUserRecord = () => {
    //setLoading(true);
    MemberService.getUserRecord(user.id)
      .then((data) => {
        //setLoading(false);
        dispatch(update(data.user));
      })
      .catch((err) => {
        alert(JSON.stringify(err))
        //setLoading(false);
      });
  }

  return (
    <SafeAreaView>
      <Inset vertical={16}>
        <Inset horizontal={16}>
          <Text>{t('account_questions_text')}</Text>
        </Inset>
{/* 
        <Spinner
          isVisible={loading}
          size={50}
          type={'ThreeBounce'}
          color={APP_COLOR}
        /> */}

        <Stack size={16} />
        <View>
          <Toggle checked={selectedOption.pushNotificationsEnabled} onChange={(v) => updateSelectedOption("pushNotificationsEnabled", v)}>
            {t('push_notifications_enabled')}
          </Toggle>
        </View>

        <Stack size={16} />
        <View>
          <Toggle checked={selectedOption.smsNotificationsEnabled} onChange={(v) => updateSelectedOption("smsNotificationsEnabled", v)}>
            {t('sms_notifications_enabled')}
          </Toggle>
        </View>

        <Stack size={16} />
        <View>
          <Toggle checked={selectedOption.emailNotificationsEnabled} onChange={(v) => updateSelectedOption("emailNotificationsEnabled", v)}>
            {t('email_notifications_enabled')}
          </Toggle>
        </View>

      </Inset>
      <DropdownAlert ref={ref => this.dropDownAlertRef = ref} />
    </SafeAreaView>
  )
};

export default AccountSettings;