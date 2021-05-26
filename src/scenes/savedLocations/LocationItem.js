import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
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
        <Icon
          style={styles.icon}
          fill="#000000"
          name="more-horizontal-outline"
        />
        {/* Edit option with modal open onClick */}
        {/* onClick={id => handleEdit(id)} */}
        {/* Delete option with alert onClick */}
        {/* onClick={id => handleDelete(id)} */}
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
    flex: 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 5,
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

export default LocationItem;
