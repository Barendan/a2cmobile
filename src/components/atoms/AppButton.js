import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

export default function AppButton({
  title,
  color,
  containerStyle,
  textStyle,
  onPress,
}) {
  return (
    <TouchableOpacity
      style={[containerStyle, { backgroundColor: color }]}
      onPress={onPress}>
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
}
