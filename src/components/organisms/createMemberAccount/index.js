import React, { useState } from 'react';
import { View, Text } from 'react-native';
import AnimatedMultistep from 'react-native-animated-multistep';
import DraggablePanel from 'react-native-draggable-panel';
import { Inset, Stack } from 'react-native-spacing-system';
import { Divider } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { CloseButton, ProgressBar } from '_atoms';
import Step1 from './steps/step1';
import Step2 from './steps/step2';
import Step3 from './steps/step3';
import styles from './steps/styles';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

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
        <>
          <CloseButton onPress={onPanelDismiss} />

          <Inset all={16}>
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
            {/* <Stack size={12} /> */}

            <Divider />
            {/* <Stack size={12} /> */}

            <View style={styles.mainContainer}>
              <AnimatedMultistep
                steps={steps}
                onFinish={finish}
                onBack={onBack}
                onNext={onNext}
              />
            </View>
          </Inset>
        </>
      </DraggablePanel>
    </View>
  );
};

export default CreateMemberAccount;
