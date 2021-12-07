import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { verticalScale, moderateScale } from 'react-native-size-matters';
import AnimatedMultistep from 'react-native-animated-multistep';
import { Inset, Stack } from 'react-native-spacing-system';
import { Divider } from 'react-native-paper';
import Spinner from 'react-native-spinkit';
import { useTranslation } from 'react-i18next';

import { CloseButton, ProgressBar } from '_atoms';
import { DraggablePanel } from '_molecules';
import Step1 from './steps/step1';
import Step2 from './steps/step2';
import Step3 from './steps/step3';

import { APP_COLOR } from '_styles/colors';
import styles from './steps/styles';

const ForgotPasswordReset = props => {
  const { t } = useTranslation();
  
  const steps = [
    { name: t('account_login'), component: Step1 },
    { name: t('security_settings'), component: Step2 },
    { name: t('update_password'), component: Step3 },
  ];

  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = React.useState(false);

  const onNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const onBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const finish = finalState => {
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
        initialHeight={verticalScale(1000)}
        expandable>
        {loading && (
          <View style={styles.loadingView}>
            <Spinner
              isVisible={loading}
              size={50}
              type={'ThreeBounce'}
              color={APP_COLOR}
            />
            <Text>Requesting Trip...</Text>
          </View>
        )}

        {!loading && (
          <>
            <CloseButton onPress={onPanelDismiss} />

            <Inset all={moderateScale(16)}>
              <View style={styles.titleWrapper}>
                <Text style={styles.title}>{t('forgot_password')}</Text>
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

              <Inset all={moderateScale(16)}>
                <View style={styles.mainContainer}>
                  <AnimatedMultistep
                    steps={steps}
                    onFinish={finish}
                    onBack={onBack}
                    onNext={onNext}
                  />
                </View>
              </Inset>
            </Inset>
          </>
        )}
      </DraggablePanel>
    </View>
  );
};

export default ForgotPasswordReset;
