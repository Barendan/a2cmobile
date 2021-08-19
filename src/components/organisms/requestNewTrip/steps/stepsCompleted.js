import React from 'react';
import { View, Animated, Text } from 'react-native';
import { Button } from '@ui-kitten/components';
import { Stack } from 'react-native-spacing-system';
import LottieView from 'lottie-react-native';
import { scale, moderateScale } from 'react-native-size-matters';

import styles from './styles';

const StepsCompleted = props => {
  const { title, subtitle, onPress, buttonText } = props;

  const transition = new Animated.Value(0);

  React.useEffect(() => {
    Animated.timing(transition, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.completedformContainer}>
        <LottieView
          style={styles.checkmark}
          source={require('_assets/animations/check.json')}
          autoPlay
          loop={true}
        />
        <Stack size={scale(12)} />

        <Text style={styles.title}>{title}</Text>
        <Text style={styles.body}>{subtitle}</Text>
      </View>

      <Stack size={scale(12)} />

      <View style={styles.footer}>
        <Button style={styles.forwardButton} onPress={onPress}>
          <Text style={{ fontSize: moderateScale(16) }}>{buttonText}</Text>
        </Button>
      </View>
    </View>
  );
};

export default StepsCompleted;
