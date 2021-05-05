import React from 'react';
import { View, Text } from 'react-native';
import ProgressCircle from 'react-native-progress-circle';

const ProgressBar = ({
  currentStep,
  stepCount,
  title,
  subtitle,
  color = '#3399FF',
  shadowColor = '#999',
}) => {
  const perecentage = Math.floor((currentStep / stepCount) * 100);
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '5%',
        marginLeft: '5%',
        width: '90%'
      }}>
      <ProgressCircle
        percent={perecentage}
        radius={40}
        borderWidth={8}
        color={color}
        shadowColor={shadowColor}
        bgColor="#fff">
        <Text style={{ fontSize: 18 }}>{`${currentStep} of ${stepCount} `}</Text>
      </ProgressCircle>
      <View 
      style={{
        alignItems: 'flex-end'
      }}>
        <Text
          style={{
            color: 'black',
            fontSize: 22,
            margin: '1%',
          }}>
          {title}
        </Text>
        {subtitle && <Text
          style={{
            color: 'grey',
            fontSize: 15,
            margin: '1%',
          }}>
          {subtitle}
        </Text>}
      </View>

    </View>
  );
};

export default ProgressBar;
