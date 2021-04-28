import React from 'react';
import {View, Text} from 'react-native';
import ProgressCircle from 'react-native-progress-circle';

const ProgressBar = ({
  currentStep,
  stepCount,
  title,
  color = '#3399FF',
  shadowColor = '#999',
}) => {
  const perecentage = Math.floor((currentStep / stepCount) * 100);
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '5%',
      }}>
      <ProgressCircle
        percent={perecentage}
        radius={40}
        borderWidth={8}
        color={color}
        shadowColor={shadowColor}
        bgColor="#fff">
        <Text style={{fontSize: 18}}>{`${currentStep} of ${stepCount} `}</Text>
      </ProgressCircle>
      <Text
        style={{
          color: 'black',
          fontSize: 22,
          margin: '10%',
        }}>
        {title}
      </Text>
    </View>
  );
};

export default ProgressBar;
