import React from 'react';
import { View, StyleSheet, TouchableHighlight, Image } from 'react-native';
import {
  DrawerItem,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
  Card,
} from 'react-native-paper';

import { useTranslation } from "react-i18next";

import { PreferencesContext } from '_context';
import { LanguageSelector } from '_organisms';

import { useDispatch, useSelector } from 'react-redux';

import { logout } from './../../store/user';

export function DrawerContent({navigation}) {
  const { t } = useTranslation();

  const paperTheme = useTheme();
  const { rtl, theme, toggleRTL, toggleTheme } = React.useContext(
    PreferencesContext
  );

  const { user } = useSelector(state => state.user);


  const dispatch = useDispatch();
  const logOutCurrentUser = () => {
    dispatch(logout());
  }

  return (
    <View
      style={
        styles.drawerContent
      }
    >
      <DrawerContentScrollView>
        <View
          style={
            styles.drawerContent
          }
        >
          <View style={styles.userInfoSection}>
            <Title style={styles.title}>{user.name}</Title>
            <View>

              <Image
                style={{
                  resizeMode: "cover",
                  height: 100,
                  width: 230
                }}
                source={{ uri: 'https://www.bmcanada.ca/wp-content/uploads/2014/05/placeholder-blue.png' }}
              />

            </View>

            {/* <View style={styles.row}>
            <View style={styles.section}>
              <Paragraph style={[styles.paragraph, styles.caption]}>
                202
              </Paragraph>
              <Caption style={styles.caption}>Following</Caption>
            </View>
            <View style={styles.section}>
              <Paragraph style={[styles.paragraph, styles.caption]}>
                159
              </Paragraph>
              <Caption style={styles.caption}>Followers</Caption>
            </View>
          </View> */}
          </View>
          <Drawer.Section>
            <DrawerItem
              label={t('dashboard')}
              onPress={() => navigation.navigate('Home')}
            />
            <DrawerItem
              label={t('saved_locations')}
              onPress={() => navigation.navigate('Locations')}
            />
            <DrawerItem
              label={t('account_settings')}
              onPress={() => navigation.navigate('Account')}
            />
            <DrawerItem
              label={t('security_settings')}
              onPress={() => navigation.navigate('Security')}
            />
          </Drawer.Section>
          <Drawer.Section title={t('app_info')}>
            <DrawerItem
              label={t('privacy')}
              onPress={() => { }}
            />
            <DrawerItem
              label={t('terms')}
              onPress={() => { }}
            />
            <DrawerItem
              label={t('faqs')}
              onPress={() => { }}
            />

          </Drawer.Section>
          <Drawer.Section title={t('preferences')}>
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
            <LanguageSelector headerStyle={styles.preference} />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <View style={[styles.signOutContainer]}>
        <TouchableHighlight key={'go_to_registration'} onPress={logOutCurrentUser}>

          <View style={styles.row}>
            <View style={styles.section}>
              <Text style={styles.signOutTitle}>Log Out</Text>
            </View>
            <View style={styles.section}>
              <Caption style={styles.caption}>v1.0</Caption>
            </View>
          </View>

        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    marginTop: 20,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    margin: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
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
    height: 60,
    justifyContent: 'space-between',
    color: 'black',
    backgroundColor: '#dfe5eb',
  },
  signOutContainerDark: {
    backgroundColor: '#dfe5eb',
  },
  signOutTitle: {
    fontWeight: 'bold',
    color: '#ab263e'
  },
  image: {
    flex: 1,
    aspectRatio: 2,
    resizeMode: 'contain',
  },
  drawerSectionText: {
    color: 'red'
  },
});