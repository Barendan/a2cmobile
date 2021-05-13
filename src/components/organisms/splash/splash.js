import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolateColor,
} from 'react-native-reanimated';

// molecules
import { AnimatedLogo } from '_molecules/splash/A2CLogo/index';
import { AnimatedFullLogo } from '_molecules/splash/A2CFullLogo/index';

// styles
import { WHITE } from '_styles/colors';
import { scaleFont } from '_styles/mixins';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  splashContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#276092',
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchableContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 2,
  },
  touchableText: {
    color: WHITE,
    fontSize: scaleFont(24),
    fontWeight: 'bold',
  },
});

const colors = ['rgba(255, 255, 255, 1)', 'rgba(39,96,146,255)'];

const Splash = () => {
  const [toggled, setToggled] = useState(false);

  const color = useSharedValue(0);

  const toggleColor = () => {
    if (color.value === 0) {
      color.value = withTiming(1, { duration: 800 });
    } else {
      color.value = withTiming(0, { duration: 800 })
    }
  }

  const style = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      color.value,
      [0, 1],
      colors,
    ),
  }))

  useEffect(() => {
    toggleColor();
  }, [toggled]);

  React.useEffect(() => {
    setTimeout(() => {
      setToggled(true);
    }, 500);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.splashContainer, style]}>
        <AnimatedFullLogo
          toggled={toggled}
          color={color}
        />
        <AnimatedLogo
          toggled={toggled}
          color={color}
        />
      </Animated.View>

        {
          !toggled ?
            <View style={styles.touchableContainer}>
              {/* <TouchableOpacity onPress={() => setToggled(true)}>
                <Text style={styles.touchableText}>Go to Login</Text>
              </TouchableOpacity> */}
            </View>
          : null
        }

    </SafeAreaView>
  );
};

export default Splash;

