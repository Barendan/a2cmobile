import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, interpolateColor } from 'react-native-reanimated';

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#276092',
  }
});

const SplashOverlay = ({ color, colors }) => {
  const style = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      color.value,
      [0, 1],
      colors,
    ),
  }));

  return (
    <Animated.View style={[styles.overlay, style]} />
  )
};

export default SplashOverlay;
