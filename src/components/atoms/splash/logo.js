import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { scaleSize } from '../../../styles/mixins';

const styles = StyleSheet.create({
  imageSize: {
    width: scaleSize(200),
    height: scaleSize(200),
  },
});

const SplashLogo = () =>
  <Image
    style={styles.imageSize}
    source={require('../../../assets/images/A2CLogo.png')}
  />

export default SplashLogo;
