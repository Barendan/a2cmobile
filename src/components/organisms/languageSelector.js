import React, { useState } from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import DraggablePanel from 'react-native-draggable-panel';
import { Inset, Stack } from "react-native-spacing-system";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { PreferencesContext } from '_context';
import { CloseButton } from '_atoms'

// styles
import { WHITE } from '_styles/colors';
import { scaleFont } from '_styles/mixins';

const styles = StyleSheet.create({
    touchableContainer: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        flex: 2,
        padding: 16,
    },
    touchableText: {
        fontSize: scaleFont(18),
        fontWeight: 'bold',
    },
    titleWrapper: {
        borderBottomColor: '#6f99bf',
        borderBottomWidth: 2,
    },
    title: {
        fontWeight: 'bold',
        color: '#366999',
        fontSize: 18,
        marginBottom: 10,
    }
});


const LanguageSelector = (props) => {
    const languageMap = {
        en: { label: "English", dir: "ltr", active: true },
        es: { label: "Español", dir: "ltr", active: false }
    };
    const [displayLanguageModal, setDisplayLanguageModal] = useState(false);

    const { t } = useTranslation();

      
    return (
        <View>
            <TouchableHighlight onPress={() => setDisplayLanguageModal(!displayLanguageModal)}>
                <Text style={props.headerStyle}>{t('change_language')}</Text>
            </TouchableHighlight>
            <DraggablePanel
                visible={displayLanguageModal}
                onDismiss={()=>setDisplayLanguageModal(false)}
            >
                <CloseButton
                    onPress={()=> setDisplayLanguageModal(false)}
                />
                <Inset all={16}>
                    <View style={styles.titleWrapper}>
                        <Text style={styles.title}>{t('change_language')}</Text>
                    </View>

                    <Stack size={12} />
                    {Object.keys(languageMap)?.map(item => (
                        <TouchableHighlight key={languageMap[item].label} onPress={() => {
                            i18next.changeLanguage(item);
                            setDisplayLanguageModal(false);                            
                        }}>
                            <>
                                <Text style={styles.touchableText}>{languageMap[item].label}</Text>
                                <Stack size={16} />
                            </>
                        </TouchableHighlight>
                    ))}
                </Inset>

            </DraggablePanel>
        </View>
    );
}
export default LanguageSelector;