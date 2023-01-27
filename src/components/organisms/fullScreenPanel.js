import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
  Platform,
} from 'react-native';

import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Searchbar } from 'react-native-paper';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { Inset, Stack } from 'react-native-spacing-system';
import RenderHTML from 'react-native-render-html';
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



const FullScreenPanel = props => {
  const {
    isHTML,
    panelHeader,
    panelBody,
    displayPanel,
    onPanelDismiss,
    biometricOption,
    biometricOnClick,
    staticKeyboard
  } = props;

  const contentWidth = useWindowDimensions().width;
  const { t, i18n } = useTranslation();

  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const extractQuestions = i18n.language === "en" ? panelBody.replace(/(<([^>]+)>)/gi, "").split('. ').map( i => {
    const questionMarkIndex = i.indexOf('?') + 1;
    return i.slice(0,questionMarkIndex);
  }) : 
  panelBody.split('<p>').map( i => {
    const startIndex = i.search("<strong>") +8;
    const endIndex = i.search("</strong>");

    return i.slice(startIndex, endIndex);
  });
  let formattedQuestions = extractQuestions.filter( element => { return element !== '' });

  useEffect(() => {
    const faqArr = panelBody.split('<p>').filter( element => { return element !== '' });
    const fixedArr = [];

    faqArr.forEach( item => {
      fixedArr.push(`<p>${item}`)
    });

    setMasterDataSource(fixedArr);
    setFilteredDataSource(fixedArr);
  },[props])

  const onChangeSearch = text => {
    if (text) {
      let selectedArr = []; 
      formattedQuestions.forEach( (q,i) => {

        if (q.toUpperCase().indexOf(text.toUpperCase()) > -1) {
          selectedArr.push(masterDataSource[i]);
        }
      })

      setFilteredDataSource(selectedArr);
      setSearchQuery(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearchQuery(text);
    }
  }

  if (biometricOption) {
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

          {/* <MatIcon
            size={moderateScale(20)}
            color={APP_COLOR}
            name={ panelHeader === 'Face ID' ? 'face-recognition' : 'finger-print-outline'}
          /> */}

          <View style={styles.bodyWrapper}>
            <MatIcon
              size={moderateScale(20)}
              color={APP_COLOR}
              name={'face-recognition'}
            />

            <Text style={styles.primaryText}>{panelBody}</Text>
            <Text style={styles.subText}>
              {t("turn_off_bio")}
            </Text>

            <AppButton
              // title={t('enable_text')}
              title='Enable'
              color={APP_COLOR}
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
                { panelHeader === 'Face ID' ? 'Face ID' : 'Touch ID' }
              </Text>
            </TouchableHighlight>

          </View>

        </Inset>
      </DraggablePanel>
    )
  } else {
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
  
          { panelHeader === "FAQs" || panelHeader === "Preguntas frecuentes" ? 
            <>
              <Searchbar 
                placeholder={t('search')}
                style={{ elevation: 0, borderWidth: 1, borderColor: 'gray', padding: 0}}
                inputStyle={{ marginLeft: -10 }}
                onChangeText={(text) => onChangeSearch(text)}
                value={searchQuery}
                />  
            
              <Stack size={verticalScale(12)} />
            </>
            : null
          }
  
          { masterDataSource.length < 1 && (
              <Text>{t('loading_data')}</Text>
          )}
          
          {
            masterDataSource.length > 0 && filteredDataSource.length < 1 ? (
              <Text>{t('no_results')}</Text>
            ) : (
              <>
                <ScrollView
                  style={styles.bodyWrapper}
                  showsVerticalScrollIndicator={true}>
                  {isHTML ? (
                    <RenderHTML
                    source={{ html: filteredDataSource.join(' ') }}
                    contentWidth={contentWidth}
                    baseStyle={{ color: 'red', margin: 50 }}
                    />
                    ) : (
                      <Text style={styles.body}>{panelBody}</Text>
                      )}
                </ScrollView>
              </>
            )
          }
  
        </Inset>
      </DraggablePanel>
    );
  }
  
};
export default FullScreenPanel;
