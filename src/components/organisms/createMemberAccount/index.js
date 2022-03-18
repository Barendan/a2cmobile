import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import AnimatedMultistep from 'react-native-animated-multistep';
import { Divider } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

import { CloseButton, ProgressBar } from '_atoms';
import { DraggablePanel } from '_molecules';
import Step1 from './steps/step1';
import Step2 from './steps/step2';
import Step3 from './steps/step3';

import styles from './steps/styles';

const CreateMemberAccount = props => {
  const { t } = useTranslation();

  const steps = [
    { name: t('member_information'), component: Step1 },
    { name: t('account_login'), component: Step2 },
    { name: t('complete_registration'), component: Step3 },
  ];

  const [currentStep, setCurrentStep] = useState(1);

  const onNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const onBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const finish = finalState => {
    onPanelDismiss()
    // console.log(finalState);
    // console.log('done');
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
      >

        <View style={{ height: '100%', padding: '5%'}}>

          <View style={{ height: '25%'}}>
            <CloseButton onPress={onPanelDismiss} />

              <View style={styles.titleWrapper}>
                <Text style={styles.title}>{t('go_to_registration')}</Text>
              </View>

              <ProgressBar
                radius={35}
                currentStep={currentStep}
                stepCount={steps.length}
                title={steps[currentStep - 1].name}
                subtitle={
                  currentStep !== steps.length &&
                  t('go_to_next') + ': ' + steps[currentStep].name
                }
              />
              <Divider />
            </View>

            <View style={styles.mainContainer}>
              <AnimatedMultistep
                steps={steps}
                onFinish={finish}
                onBack={onBack}
                onNext={onNext}
              />
            </View>

        </View>
      </DraggablePanel>
    </View>
  );
};

export default CreateMemberAccount;
