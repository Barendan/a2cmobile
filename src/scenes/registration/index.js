import React, { useState } from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import AnimatedMultistep from 'react-native-animated-multistep';
import ProgressBar from '_atoms/ProgressBar';
import Step1 from './steps/step1';
import Step2 from './steps/step2';
import Step3 from './steps/step3';

const allSteps = [
  { name: 'Member Information', component: Step1 },
  { name: 'Account Login', component: Step2 },
  { name: 'Complete Registration', component: Step3 },
];

const RegistrationScreen = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState(1);

  const onNext = () => {
    setCurrentStep(currentStep + 1);
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
      <ProgressBar currentStep={currentStep} stepCount={allSteps.length} title={allSteps[currentStep - 1].name} subtitle={currentStep !== allSteps.length && 'Next: ' + allSteps[currentStep].name} />
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
