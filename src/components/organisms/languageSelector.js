import React, { useState } from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import DraggablePanel from 'react-native-draggable-panel';
import { Inset, Stack } from 'react-native-spacing-system';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';

import { CloseButton, AvatarButton } from '_atoms';
import { APP_COLOR } from '_styles/colors';
import { scale } from 'react-native-size-matters';

const styles = StyleSheet.create({
  touchableContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 2,
    padding: scale(16),
  },
  touchableText: {
    fontSize: scale(18),
    fontWeight: 'bold',
  },
  titleWrapper: {
    borderBottomColor: '#6f99bf',
    borderBottomWidth: scale(2),
  },
  title: {
    fontWeight: 'bold',
    color: '#366999',
    fontSize: scale(18),
    marginBottom: scale(10),
  },
  headerHolder: {
    flex: 1,
    flexDirection: 'row',
  },
  icon: {
    backgroundColor: 'white',
    marginTop: scale(-2),
    fontSize: scale(40),
  },
  translateBtn: {
    color: APP_COLOR,
    fontSize: scale(14),
    // width: '50%',
  },
});

const LanguageSelector = props => {
  const languageMap = {
    en: { label: 'English', dir: 'ltr', active: true },
    es: { label: 'Español', dir: 'ltr', active: false },
  };

  const [displayLanguageModal, setDisplayLanguageModal] = useState(false);
  const { t } = useTranslation();

  const changeLanguage = () => {
    if (Object.keys(languageMap).length == 2) {
      let languageOptions = Object.keys(languageMap);
      let index = languageOptions.indexOf(i18next.language.toLocaleLowerCase());

      let selectedLanguage = languageOptions[index === 0 ? 1 : 0];
      i18next.changeLanguage(selectedLanguage);
      setDisplayLanguageModal(false);
    } else {
      setDisplayLanguageModal(true);
    }
  };

  return (
    <View style={props.containerStyle}>
      <AvatarButton
        icon={'translate'}
        iconColor={APP_COLOR}
        iconStyle={props.iconStyle ? props.iconStyle : styles.icon}
        buttonText={
          i18next.language.toLocaleLowerCase() === 'en'
            ? t('in_spanish')
            : t('in_english')
        }
        buttonTextStyle={[styles.translateBtn, props.headerStyle]}
        onPress={() => changeLanguage()}
      />
      <DraggablePanel
        visible={displayLanguageModal}
        onDismiss={() => setDisplayLanguageModal(false)}>
        <CloseButton onPress={() => setDisplayLanguageModal(false)} />
        <Inset all={16}>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>{t('change_language')}</Text>
          </View>

          <Stack size={12} />
          {Object.keys(languageMap)?.map(item => (
            <TouchableHighlight
              key={languageMap[item].label}
              onPress={() => {
                i18next.changeLanguage(item);
                setDisplayLanguageModal(false);
              }}>
              <>
                <Text style={styles.touchableText}>
                  {languageMap[item].label}
                </Text>
                <Stack size={scale(16)} />
              </>
            </TouchableHighlight>
          ))}
        </Inset>
      </DraggablePanel>
    </View>
  );
};
export default LanguageSelector;
