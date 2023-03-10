import React from 'react';
import { View, Text } from 'react-native';
import ProgressCircle from 'react-native-progress-circle';
import { useTranslation } from 'react-i18next';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const ProgressBar = ({
  currentStep,
  stepCount,
  title,
  subtitle,
  color = '#3399FF',
  shadowColor = '#999',
  radius,
}) => {
  const { t } = useTranslation();
  const percentage = Math.floor((currentStep / stepCount) * 100);
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '5%',
        width: '90%',
      }}>
      <ProgressCircle
        percent={percentage}
        radius={scale(radius)}
        borderWidth={8}
        color={color}
        shadowColor={shadowColor}
        bgColor="#fff">
        <Text
          style={{
            fontSize: radius ? scale(12) : scale(18),
          }}>{`${currentStep} ${t('of_text')} ${stepCount} `}</Text>
      </ProgressCircle>
      <View
        style={{
          alignItems: 'flex-end',
        }}>
        <Text
          style={{
            color: 'black',
            fontSize: scale(20),
            margin: '1%',
          }}>
          {title}
        </Text>
        {subtitle && (
          <Text
            style={{
              color: 'grey',
              fontSize: scale(10),
              margin: '1%',
            }}>
            {subtitle}
          </Text>
        )}
      </View>
    </View>
  );
};

export default ProgressBar;
