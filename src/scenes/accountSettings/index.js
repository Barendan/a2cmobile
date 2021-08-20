import React from 'react';
import { StyleSheet, SafeAreaView, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import DropdownAlert from 'react-native-dropdownalert';
import { Inset, Stack } from 'react-native-spacing-system';
import { Toggle } from '@ui-kitten/components';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

import { MemberService, AppInfoService } from '_services';
import { update } from '_store/user';

const AccountSettings = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);

  const [loading, setLoading] = React.useState(false);
  const [pageLoaded, setPageLoaded] = React.useState(false);

  const [selectedOption, setSelectedOption] = React.useState({
    pushNotificationsEnabled: false,
    smsNotificationsEnabled: false,
    emailNotificationsEnabled: false,
  });

  const updateSelectedOption = React.useCallback((key, value) => {
    setSelectedOption(selectedOption => {
      return {
        ...selectedOption,
        [key]: value,
      };
    });
  }, []);

  React.useEffect(() => {
    updateSelectedOption(
      'pushNotificationsEnabled',
      user.pushNotificationsEnabled,
    );
    updateSelectedOption(
      'smsNotificationsEnabled',
      user.smsNotificationsEnabled,
    );
    updateSelectedOption(
      'emailNotificationsEnabled',
      user.emailNotificationsEnabled,
    );
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
  }, [selectedOption.pushNotificationsEnabled]);

  React.useEffect(() => {
    if (pageLoaded) {
      var payload = {
        id: user.id,
        smsNotificationsEnabled: selectedOption.smsNotificationsEnabled,
      };
      updateAccountOption(payload);
    }
  }, [selectedOption.smsNotificationsEnabled]);

  React.useEffect(() => {
    if (pageLoaded) {
      var payload = {
        id: user.id,
        emailNotificationsEnabled: selectedOption.emailNotificationsEnabled,
      };
      updateAccountOption(payload);
    }
  }, [selectedOption.emailNotificationsEnabled]);

  const updateAccountOption = payload => {
    setLoading(true);
    MemberService.updateUser(payload)
      .then(data => {
        setLoading(false);
        //this.dropDownAlertRef.alertWithType('success', t('success_text'), t('account_settings_updated'));
        updateCurrentUserRecord();
      })
      .catch(err => {
        alert(err);
        setLoading(false);
      });
  };

  //update member record
  const updateCurrentUserRecord = () => {
    //setLoading(true);
    MemberService.getUserRecord(user.id)
      .then(data => {
        //setLoading(false);
        dispatch(update(data.user));
      })
      .catch(err => {
        alert(JSON.stringify(err));
        //setLoading(false);
      });
  };

  return (
    <SafeAreaView>
      <Inset vertical={verticalScale(16)}>
        <Inset horizontal={verticalScale(16)}>
          <Text style={{ fontSize: scale(16) }}>
            {t('account_questions_text')}
          </Text>
        </Inset>

        <Stack size={verticalScale(24)} />

        <View style={styles.toggleContainer}>
          <View style={styles.toggleOption}>
            <Toggle
              checked={selectedOption.pushNotificationsEnabled}
              onChange={v =>
                updateSelectedOption('pushNotificationsEnabled', v)
              }>
              <Text style={styles.toggleText}>
                {t('push_notifications_enabled')}
              </Text>
            </Toggle>
          </View>

          <Stack size={verticalScale(20)} />
          <View style={styles.toggleOption}>
            <Toggle
              checked={selectedOption.smsNotificationsEnabled}
              onChange={v =>
                updateSelectedOption('smsNotificationsEnabled', v)
              }>
              <Text style={styles.toggleText}>
                {t('sms_notifications_enabled')}
              </Text>
            </Toggle>
          </View>

          <Stack size={verticalScale(20)} />
          <View style={styles.toggleOption}>
            <Toggle
              checked={selectedOption.emailNotificationsEnabled}
              onChange={v =>
                updateSelectedOption('emailNotificationsEnabled', v)
              }>
              <Text style={styles.toggleText}>
                {t('email_notifications_enabled')}
              </Text>
            </Toggle>
          </View>
        </View>
      </Inset>
      <DropdownAlert ref={ref => (this.dropDownAlertRef = ref)} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  toggleContainer: {
    alignItems: 'flex-start',
    marginLeft: scale(36),
    // width: '75%',
  },
  toggleOption: {
    // backgroundColor: 'red',
    // width: '70%',
  },
  toggleText: {
    fontSize: moderateScale(16),
  },
});

export default AccountSettings;
