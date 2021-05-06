import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

// atoms
import SplashOverlay from '_atoms/splash/overlay';
import SplashFullLogo from '_atoms/splash/fullLogo';

const styles = StyleSheet.create({
  overlay: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
});

const colors = ['rgba(255, 255, 255, 0)', 'rgba(39,96,146,255)'];

const AnimatedFullLogo = ({ toggled, color }) => {
  const navigation = useNavigation();

  const navigateToLogin = () => {
    navigation.navigate("Login");
  }

  const style = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: withTiming(toggled ? 1 : 0, { duration: 1000 }, (finished) => {
          if (finished && toggled) {
            runOnJS(navigateToLogin)();
          }
        })
        },
      ],
    };
  });

  return (
    <>
      <Animated.View style={[styles.overlay, style]}>
        <SplashFullLogo />
        <SplashOverlay
          color={color}
          colors={colors}
        />
      </Animated.View>
    </>
  )
};

export default AnimatedFullLogo;
