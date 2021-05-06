import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { scaleSize } from '_styles/mixins';

const styles = StyleSheet.create({
  imageSize: {
    width: scaleSize(300),
    height: scaleSize(90),
  },
});

const SplashFullLogo = () =>
  <Image
    style={styles.imageSize}
    source={require('_assets/images/A2CFullLogo.png')}
  />

export default SplashFullLogo;
