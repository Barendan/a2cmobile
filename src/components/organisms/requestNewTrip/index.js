import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import AnimatedMultistep from 'react-native-animated-multistep';
import DraggablePanel from 'react-native-draggable-panel';
import { Inset, Stack } from 'react-native-spacing-system';
import { Divider } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { CloseButton, ProgressBar } from '_atoms';
import Spinner from 'react-native-spinkit';
import { useSelector } from 'react-redux';
import step1 from './steps/step1';
import step2 from './steps/step2';
import step3 from './steps/step3';
import styles from './steps/styles';

// styles
import { APP_COLOR } from '_styles/colors';

const RequestNewTrip = props => {
  const { t } = useTranslation();
  const { user } = useSelector(state => state.user);

  //
  const steps = [
    { name: 'Where are you going?', component: step1 },
    { name: 'Appointment Details', component: step2 },
    { name: 'Review', component: step3 },
  ];

  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = React.useState(false);

  const onNext = () => {
    setCurrentStep(currentStep + 1);
    console.log('Next');
  };

  const onBack = () => {
    setCurrentStep(currentStep - 1);
    console.log('Back');
  };

  const finish = finalState => {
    console.log(finalState);
  };

  const [tripReasons, setTripReasons] = useState([
    { label: 'Routine Checkup', value: 'Routine Checkup' },
    { label: 'Monthly Appointment', value: 'Monthly Appointment' },
    { label: 'Yearly Physical', value: 'Yearly Physical' },
  ]);

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
              <ScrollView showsVerticalScrollIndicator={false}>
                <AnimatedMultistep
                  steps={steps}
                  onFinish={finish}
                  onBack={onBack}
                  onNext={onNext}
                />
                <Stack size={120} />
              </ScrollView>
            </Inset>
          </>
        )}
      </DraggablePanel>
    </View>
  );
};

export default RequestNewTrip;
