import React from 'react';
import {
  View,
  StyleSheet,
  TouchableHighlight,
  Image,
  Platform,
} from 'react-native';
import { DrawerItem, DrawerContentScrollView } from '@react-navigation/drawer';
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Drawer,
  Text,
} from 'react-native-paper';
import { Inset, Stack } from 'react-native-spacing-system';

import { useTranslation } from 'react-i18next';

import { PreferencesContext } from '_context';
import { LanguageSelector, FullScreenPanel } from '_organisms';
import { AppInfoService } from '_services';

import { useDispatch, useSelector } from 'react-redux';

import { logout } from '_store/user';

import { AppSettings } from '_utils';

export function DrawerContent({ navigation }) {
  const { t } = useTranslation();

  const paperTheme = useTheme();
  const { rtl, theme, toggleRTL, toggleTheme } = React.useContext(
    PreferencesContext,
  );

  const { user } = useSelector(state => state.user);
  const { plan } = useSelector(state => state.plan);

  const dispatch = useDispatch();
  const logOutCurrentUser = () => {
    dispatch(logout());
  };

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
        updatePanelDetails('panelDataLoading', false);
      });
  };

  return (
    <View style={styles.drawerContent}>
      <DrawerContentScrollView>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <Drawer.Section>
              <Title style={styles.title}>
                {t('greeting-text')} {user.firstName} {user.lastName}
              </Title>
            </Drawer.Section>

            <Drawer.Section>
              {Platform.OS === 'ios' ? <Stack size={12} /> : null}
              <View>
                {plan.contractLogo && (
                  <Image
                    style={{
                      resizeMode: 'contain',
                      height: 100,
                      width: 230,
                    }}
                    source={{
                      uri: `data:image/jpg;base64,${plan.contractLogo}`,
                    }}
                  />
                )}

                <Title style={styles.subTitle}>{plan.contractName}</Title>
              </View>
            </Drawer.Section>
          </View>
          <Drawer.Section>
            <DrawerItem
              label={t('dashboard')}
              onPress={() => navigation.navigate('Home')}
              icon={() => (
                <Avatar.Icon
                  size={30}
                  icon="home"
                  color="black"
                  style={styles.drawerIcon}
                />
              )}
            />
            <DrawerItem
              label={t('saved_locations')}
              onPress={() => navigation.navigate('FavoriteLocations')}
              icon={() => (
                <Avatar.Icon
                  size={30}
                  icon="map"
                  color="black"
                  style={styles.drawerIcon}
                />
              )}
            />
            <DrawerItem
              label={t('account_settings')}
              onPress={() => navigation.navigate('Account')}
              icon={() => (
                <Avatar.Icon
                  size={30}
                  icon="account"
                  color="black"
                  style={styles.drawerIcon}
                />
              )}
            />
            <DrawerItem
              label={t('security_settings')}
              onPress={() => navigation.navigate('Security')}
              icon={() => (
                <Avatar.Icon
                  size={30}
                  icon="security"
                  color="black"
                  style={styles.drawerIcon}
                />
              )}
            />
          </Drawer.Section>
          <Drawer.Section
            title={<Text style={styles.sectionHeader}>{t('app_info')}</Text>}>
            <DrawerItem
              label={t('privacy')}
              onPress={() => getLatestAppInfo(t('privacy'), 'privacy')}
              icon={() => (
                <Avatar.Icon
                  size={30}
                  icon="arrow-right"
                  color="black"
                  style={styles.drawerIcon}
                />
              )}
            />
            <DrawerItem
              label={t('terms')}
              onPress={() => getLatestAppInfo(t('terms'), 'terms')}
              icon={() => (
                <Avatar.Icon
                  size={30}
                  icon="arrow-right"
                  color="black"
                  style={styles.drawerIcon}
                />
              )}
            />
            <DrawerItem
              label={t('faqs')}
              onPress={() => getLatestAppInfo(t('FAQ_title'), 'faqs')}
              icon={() => (
                <Avatar.Icon
                  size={30}
                  icon="arrow-right"
                  color="black"
                  style={styles.drawerIcon}
                />
              )}
            />
          </Drawer.Section>
          <Drawer.Section
            title={
              <Text style={styles.sectionHeader}>{t('preferences')}</Text>
            }>
            {/* <TouchableRipple onPress={toggleTheme}>
              <View style={styles.preference}>
                <Text>Dark Theme</Text>
                <View pointerEvents="none">
                  <Switch value={paperTheme.dark} />
                </View>
              </View>
            </TouchableRipple> */}
            {/* <TouchableRipple onPress={toggleRTL}>
            <View style={styles.preference}>
              <Text>RTL</Text>
              <View pointerEvents="none">
                <Switch value={rtl === 'right'} />
              </View>
            </View>
          </TouchableRipple> */}
            <LanguageSelector
              headerStyle={styles.preference}
              iconStyle={{
                marginLeft: 10,
                backgroundColor: 'white',
                marginTop: -5,
              }}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <View style={[styles.signOutContainer]}>
        <TouchableHighlight
          key={'go_to_registration'}
          onPress={logOutCurrentUser}>
          <View style={styles.row}>
            <View style={styles.section}>
              <Text style={styles.signOutTitle}>{t('log_out')}</Text>
            </View>
            <View style={styles.section}>
              <Caption style={styles.caption}>
                {AppSettings.appVersion} ({AppSettings.buildVersion})
              </Caption>
            </View>
          </View>
        </TouchableHighlight>
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
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    marginTop: Platform.OS === 'ios' ? 20 : 10,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 14,
    marginTop: 5,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    margin: 20,
    marginVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionHeader: {
    // color: '#636363',
    fontWeight: 'bold',
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    flex: 1,
    marginTop: 15,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  signOutContainer: {
    fontWeight: 'bold',
    // height: 54,
    justifyContent: 'space-between',
    color: 'black',
    backgroundColor: '#dfe5eb',
  },
  signOutTitle: {
    fontWeight: 'bold',
    color: '#ab263e',
  },
  image: {
    flex: 1,
    aspectRatio: 2,
    resizeMode: 'contain',
  },
  drawerSectionText: {
    color: 'red',
  },
  drawerIcon: {
    backgroundColor: 'white',
    marginRight: -30,
  },
});
