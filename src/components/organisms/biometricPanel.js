import React from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  Platform,
} from 'react-native';

import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { Inset, Stack } from 'react-native-spacing-system';
// import RenderHTML from 'react-native-render-html';
import { useTranslation } from 'react-i18next';

import { AppButton, CloseButton } from '_atoms';
import { DraggablePanel } from '_molecules';
import { APP_COLOR } from '_styles/colors';

const styles = StyleSheet.create({
  titleWrapper: {
    borderBottomColor: '#6f99bf',
    borderBottomWidth: 2,
  },
  title: {
    fontWeight: 'bold',
    color: '#366999',
    fontSize: moderateScale(24),
    marginBottom: moderateScale(4),
  },
  body: {
    fontWeight: 'bold',
  },
  bodyWrapper: {
    marginBottom: verticalScale(50),
  },
  primaryText: {
    fontSize: moderateScale(16),
    letterSpacing: 1,
  },
  subText: {
    fontSize: moderateScale(16),
    letterSpacing: 1,
  },
  btnContainer: {
    backgroundColor: APP_COLOR,
    padding: moderateScale(8),
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderStyle: 'solid',
  },
  btnText: {
    fontSize: moderateScale(16),
    letterSpacing: 1,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});

const BiometricPanel = props => {
  const {
    // isHTML,
    panelHeader,
    panelBody,
    displayPanel,
    onPanelDismiss,
    biometricOnClick,
    staticKeyboard
  } = props;

  const { t, i18n } = useTranslation();

  return (
    <DraggablePanel
      visible={displayPanel}
      onDismiss={onPanelDismiss}
      initialHeight={verticalScale(1000)}
      expandable
      fixPanel={staticKeyboard}
    >
      <Inset all={verticalScale(16)}>
        { Platform.OS === 'ios' ? <Stack size={verticalScale(12)} /> : null }
        <View style={styles.titleWrapper}>
          <CloseButton onPress={onPanelDismiss}/>

          <Text style={styles.title}>{panelHeader}</Text>
        </View>

        <Stack size={verticalScale(12)} />

        { panelHeader === "Face ID" ? 
          <MatIcon
            size={scale(50)}
            color={APP_COLOR}
            name={'face-recognition'}
          />
          : 
          <IonIcon
            size={scale(80)}
            color={APP_COLOR}
            name={'finger-print-outline'}
          />
        }

        <View style={styles.bodyWrapper}>
          <Text style={styles.primaryText}>{panelBody}</Text>
          <Text style={styles.subText}>
              {t("turn_off_bio")}
          </Text>

          <AppButton
            title={t('enable_button')}
            color={'#1976d2'}
            containerStyle={styles.btnContainer}
            textStyle={styles.btnText}
            onPress={biometricOnClick}
          />

          <TouchableHighlight
            // onPress={() => } add link here
          >
            <Text style={styles.pText}>
              Learn more about
              { panelHeader === 'Face ID' ? ' Face ID' : ' Touch ID' }
            </Text>
          </TouchableHighlight>
        </View>

      </Inset>
    </DraggablePanel>
  )
};
export default BiometricPanel;
