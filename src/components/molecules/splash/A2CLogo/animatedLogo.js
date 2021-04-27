import React, { useEffect } from 'react';
import { Dimensions, SafeAreaView, StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import { mix } from 'react-native-redash';

// atoms
import SplashLogo from '../../../atoms/splash/logo';
import SplashOverlay from '../../../atoms/splash/overlay';

const styles = StyleSheet.create({
  overlay: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const useSpringTransition = (state: boolean | number) => {
  const value = useSharedValue(0);
  useEffect(() => {
    value.value = typeof state === "boolean" ? (state ? 1 : 0) : state;
  }, [state, value]);
  const transition = useDerivedValue(() => {
    return withTiming(value.value, { duration: 800 });
  });
  return transition;
};

const colors = ['rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 0)'];

const AnimatedLogo = ({ toggled, color }) => {
  const transition = useSpringTransition(toggled);

  const style = useAnimatedStyle(() => {
    const rotate = mix(transition.value, 0, Math.PI / 2);
    return {
      transform: [
        { rotateZ: `${rotate}rad`},
        { scale: withTiming(toggled ? 0 : 1, { duration: 800 }) },
      ],
    };
  });

  return (
    <>
      <Animated.View style={[styles.overlay, style]}>
        <SplashLogo />
        <SplashOverlay
          color={color}
          colors={colors}
        />
      </Animated.View>
    </>
  );
};

export default AnimatedLogo;
