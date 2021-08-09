import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Appbar, Avatar, useTheme } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

// import { Feed } from './feed';
// import { Details } from './details';

// screens
import DashboardScreen from '_scenes/dashboard';
import AboutScreen from '_scenes/about';
import AccountSettings from '_scenes/accountSettings';
import SavedLocations from '_scenes/savedLocations';
import FavoriteLocations from '_scenes/favoriteLocations';
import SecuritySettings from '_scenes/securitySettings';

// styles
import { WHITE, APP_COLOR } from '_styles/colors';

const Stack = createStackNavigator();

const styles = StyleSheet.create({
  header: {
    backgroundColor: APP_COLOR,
    color: WHITE,
    fontSize: 50,
    height: verticalScale(40),
  },
});

const Header = ({ scene, previous, navigation }) => {
  const { options } = scene.descriptor;
  const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
      ? options.title
      : scene.route.name;

  const theme = useTheme();

  return (
    <Appbar.Header style={styles.header}>
      <TouchableOpacity
        onPress={() => {
          navigation.openDrawer();
        }}>
        <Ionicons name={'menu'} size={moderateScale(40)} color={WHITE} />
      </TouchableOpacity>
      <Appbar.Content
        title={<Text style={{ fontSize: scale(14) }}>{title}</Text>}
      />
    </Appbar.Header>
  );
};

export const DashboardStack = () => {
  const { t } = useTranslation();

  return (
    <Stack.Navigator
      initialRouteName="Dashboard"
      headerMode="screen"
      screenOptions={{
        header: ({ scene, previous, navigation }) => (
          <Header scene={scene} previous={previous} navigation={navigation} />
        ),
      }}>
      <Stack.Screen
        name="Home"
        component={DashboardScreen}
        options={{ headerTitle: 'Access2Care' }}
      />
      <Stack.Screen
        name="Account"
        component={AccountSettings}
        options={{ headerTitle: t('account_settings') }}
      />
      <Stack.Screen
        name="Locations"
        component={SavedLocations}
        options={{ headerTitle: t('saved_locations') }}
      />
      <Stack.Screen
        name="FavoriteLocations"
        component={FavoriteLocations}
        options={{ headerTitle: t('saved_locations') }}
      />
      <Stack.Screen
        name="Security"
        component={SecuritySettings}
        options={{ headerTitle: t('security_settings') }}
      />
      <Stack.Screen
        name="Details"
        component={AboutScreen}
        options={{ headerTitle: 'Access2Care' }}
      />
    </Stack.Navigator>
  );
};
