import React, { useState } from 'react';
import { View, Text } from 'react-native';
import AnimatedMultistep from 'react-native-animated-multistep';
import { Inset, Stack } from 'react-native-spacing-system';
import { Divider } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

import { CloseButton, ProgressBar } from '_atoms';
import { DraggablePanel } from '_molecules';
import Spinner from 'react-native-spinkit';
import Step1 from './steps/step1';
import Step2 from './steps/step2';
import Step3 from './steps/step3';
import Step4 from './steps/step4';
import StepsCompleted from './steps/stepsCompleted';

import { APP_COLOR } from '_styles/colors';
import styles from './steps/styles';

const RequestNewTrip = props => {
  const { t } = useTranslation();

  const steps = [
    { name: t('where_are_you_going'), component: Step1 },
    { name: t('appointment_details'), component: Step2 },
    { name: t('special_needs'), component: Step3 },
    { name: t('summary'), component: Step4 },
  ];

  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setisLoading] = React.useState(false);
  const [stepsCompleted, setStepsCompleted] = React.useState(false);

  const onNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const onBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const finish = finalState => {
    setStepsCompleted(true);
    console.log(finalState);
  };

  const onClose = () => {
    setStepsCompleted(false);
    onPanelDismiss();
  };

  const { panelHeader, displayPanel, onPanelDismiss } = props;

  return (
    <View>
      <DraggablePanel
        visible={displayPanel}
        onDismiss={() => {
          onPanelDismiss();
          setCurrentStep(1);
        }}
        initialHeight={verticalScale(1000)}
        expandable
        fixPanel
      >
        
        {isLoading && (
          <View style={styles.loadingView}>
            <Spinner
              isVisible={isLoading}
              size={scale}
              type={'ThreeBounce'}
              color={APP_COLOR}
            />
            <Text>Requesting Trip...</Text>
          </View>
        )}

        {!isLoading && !stepsCompleted && (
          <View style={styles.mainContainer}>

            <View style={styles.titleWrapper}>
              <CloseButton onPress={onPanelDismiss} />
              
              <Text style={styles.title}>{t('request_new_trip')}</Text>
            </View>

            <ProgressBar
              radius={30}
              currentStep={currentStep}
              stepCount={steps.length}
              title={steps[currentStep - 1].name}
              subtitle={
                currentStep !== steps.length &&
                t('go_to_next') + ': ' + steps[currentStep].name
              }
            />
            <Divider /> 

            <AnimatedMultistep
              steps={steps}
              onFinish={finish}
              onBack={onBack}
              onNext={onNext}
            />
          </View>
        )}

        {stepsCompleted && (
          <View style={styles.completedStepContainer}>
            <Inset all={16}>
              <Stack size={12} />
              <StepsCompleted
                onPress={onClose}
                buttonText={t('close')}
                title={t('congratulations')}
                subtitle={t('trip_requested_succesfully')}
              />
              <Stack size={12} />
            </Inset>
          </View>
        )}
      </DraggablePanel>
    </View>
  );
};

export default RequestNewTrip;
