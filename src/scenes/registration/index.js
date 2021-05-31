import React, { useState } from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import AnimatedMultistep from 'react-native-animated-multistep';
import { useTranslation } from "react-i18next";
import { AvatarButton } from '_atoms'
import { Stack } from "react-native-spacing-system";

import ProgressBar from '_atoms/ProgressBar';
import Step1 from './steps/step1';
import Step2 from './steps/step2';
import Step3 from './steps/step3';

const RegistrationScreen = ({ navigation }) => {

  const { t } = useTranslation();

  const allSteps = [
    { name: t('member_information'), component: Step1 },
    { name: t('account_login'), component: Step2 },
    { name: t('complete_registration'), component: Step3 },
  ];

  const [currentStep, setCurrentStep] = useState(1);

  const onNext = () => {
    setCurrentStep(currentStep + 1);
    console.log('Next');
  };

  const onBack = () => {
  setCurrentStep(currentStep - 1);

  };

  const finish = finalState => {
    alert(JSON.stringify(finalState));
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
        <Stack size={12} />
       <AvatarButton icon={"arrow-left"} iconColor="black" buttonText={t('back_button')} onPress={() => navigation.goBack()} />
      <ProgressBar currentStep={currentStep} stepCount={allSteps.length} title={allSteps[currentStep - 1].name} subtitle={currentStep !== allSteps.length && t('go_to_next') + ': ' + allSteps[currentStep].name} />
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
