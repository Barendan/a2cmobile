import React, { useState } from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import AnimatedMultistep from 'react-native-animated-multistep';
import DraggablePanel from 'react-native-draggable-panel';
import { Inset, Stack } from 'react-native-spacing-system';
import { Divider } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { CloseButton, ProgressBar } from '_atoms';
import Spinner from 'react-native-spinkit';
import Step1 from './steps/step1';
import Step2 from './steps/step2';
import Step3 from './steps/step3';
import StepsCompleted from './steps/stepsCompleted';
import styles from './steps/styles';

// styles
import { APP_COLOR } from '_styles/colors';

const RequestNewTrip = props => {
  const { t } = useTranslation();
  //
  const steps = [
    { name: t('where_are_you_going'), component: Step1 },
    { name: t('appointment_details'), component: Step2 },
    { name: t('special_needs'), component: Step3 },
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
    setStepsCompleted(true)
    console.log(finalState);
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
        initialHeight={800}
        expandable>
        {isLoading && (
          <View style={styles.loadingView}>
            <Spinner
              isVisible={isLoading}
              size={50}
              type={'ThreeBounce'}
              color={APP_COLOR}
            />
            <Text>Requesting Trip...</Text>
          </View>
        )}


        {!isLoading && !stepsCompleted && (
          <>
            <CloseButton onPress={onPanelDismiss} />

            <Inset all={16}>
              <View style={styles.titleWrapper}>
                <Text style={styles.title}>{t('request_new_trip')}</Text>
              </View>
              <Stack size={12} />

              <ProgressBar
                small={true}
                currentStep={currentStep}
                stepCount={steps.length}
                title={steps[currentStep - 1].name}
                subtitle={
                  currentStep !== steps.length &&
                  t('go_to_next') + ': ' + steps[currentStep].name
                }
              />
              <Stack size={12} />

              <Divider />
              <Stack size={12} />
              {/* <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor:'green'}}> */}
              <View style={styles.mainContainer}>
                <AnimatedMultistep
                  steps={steps}
                  onFinish={finish}
                  onBack={onBack}
                  onNext={onNext}
                />
              </View>

              {/* </ScrollView> */}
            </Inset>
          </>
        )}

        {stepsCompleted && <View style={styles.completedStepContainer}>

          <Inset all={16}>

            <Stack size={12} />
            <StepsCompleted onPress={onPanelDismiss} buttonText={t('close')} title={t('congratulations')} subtitle={t('trip_requested_succesfully')} />
            <Stack size={12} />

          </Inset>

        </View>}

      </DraggablePanel>
    </View>
  );
};

export default RequestNewTrip;
