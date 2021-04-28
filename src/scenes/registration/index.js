import React from 'react';
import {SafeAreaView, View, Text} from 'react-native';
import AnimatedMultistep from 'react-native-animated-multistep';
import ProgressBar from '../../components/atoms/ProgressBar';
import Step1 from './steps/step1';
import Step2 from './steps/step2';
import Step3 from './steps/step3';

const allSteps = [
  {name: 'step 1', component: Step1},
  {name: 'step 2', component: Step2},
  {name: 'step 3', component: Step3},
];

const RegistrationScreen = ({navigation}) => {
  const onNext = () => {
    console.log('Next');
  };

  const onBack = () => {
    console.log('Back');
  };

  const finish = finalState => {
    console.log(finalState);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <ProgressBar currentStep={1} stepCount={4} title="Register Account" />
      <AnimatedMultistep
        steps={allSteps}
        onFinish={finish}
        onBack={onBack}
        onNext={onNext}
      />
    </SafeAreaView>
  );
};

export default RegistrationScreen;
