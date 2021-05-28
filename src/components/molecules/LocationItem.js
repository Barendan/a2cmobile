import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { Icon } from '@ui-kitten/components';
import { APP_COLOR } from '_styles/colors';

const LocationItem = ({ location, handleEdit, handleDelete }) => {
  const { id, name, address } = location;

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon style={styles.icon} fill="#8F9BB3" name="star" />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.address}>{address}</Text>
      </View>

      <View style={styles.iconContainer}>
        <Menu>
          <MenuTrigger>
            <Icon
              style={styles.icon}
              fill="#000000"
              name="more-horizontal-outline"
            />
          </MenuTrigger>
          <MenuOptions customStyles={menuOptions}>
            <MenuOption onSelect={() => handleEdit(id)} text="Edit" />
            <MenuOption onSelect={() => handleDelete(id)} text="Delete" />
          </MenuOptions>
        </Menu>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 70,
    backgroundColor: APP_COLOR.main,
    borderBottomWidth: 0.8,
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 15,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 10,
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 32,
    height: 32,
  },
  title: {
    fontSize: 18,
    height: 26,
    // color: colors.primaryTitle,
  },
  address: {
    fontSize: 14,
    color: '#555',
  },
});

const menuOptions = {
  optionsContainer: {
    width: 120,
    padding: 5,
  },
};

export default LocationItem;
