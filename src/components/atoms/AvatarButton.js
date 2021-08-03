import React from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-paper';
import { scale } from 'react-native-size-matters';

const styles = StyleSheet.create({
  viewHolder: {
    flexDirection: 'row',
  },
  icon: {
    marginTop: scale(-5),
    backgroundColor: 'white',
  },
  defaultButtonTextStyle: {
    height: 20,
    marginLeft: 5,
  },
});

const AvatarButton = props => {
  const {
    icon,
    iconColor,
    iconStyle,
    buttonText,
    buttonTextStyle,
    onPress,
  } = props;

  return (
    <TouchableHighlight onPress={onPress}>
      <View style={styles.viewHolder}>
        <Avatar.Icon
          size={scale(24)}
          icon={icon}
          color={iconColor}
          style={iconStyle || styles.icon}
        />
        <Text style={buttonTextStyle || styles.defaultButtonTextStyle}>
          {buttonText}
        </Text>
      </View>
    </TouchableHighlight>
  );
};
export default AvatarButton;
