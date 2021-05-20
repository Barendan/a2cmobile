import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet, ScrollView, useWindowDimensions } from 'react-native';
import DraggablePanel from 'react-native-draggable-panel';
import { Inset, Stack } from "react-native-spacing-system";
import { Divider } from 'react-native-paper';
import { useTranslation } from "react-i18next";
import { CloseButton } from '_atoms'


// styles
import { CANCEL, GRAY_LIGHT, GRAY_DARK } from '_styles/colors';
import { scaleFont } from '_styles/mixins';

const styles = StyleSheet.create({
    titleWrapper: {
        borderBottomColor: '#6f99bf',
        borderBottomWidth: 2,
    },
    title: {
        fontWeight: 'bold',
        color: '#366999',
        fontSize: 18,
        marginBottom: 10,
    },
    body: {
        fontSize: scaleFont(12),
        fontWeight: 'bold',
    },
    bodyWrapper: {
        marginBottom: 50
    },
    levelOfService: {
        fontSize: scaleFont(13),
        fontWeight: 'bold',
        color: '#47494d',
    },
    tripNumber: {
        fontSize: scaleFont(13),
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#366999',
    },
    specialNeedsLabel: {
        fontSize: scaleFont(14),
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#276092',
    },
    content: {
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    callToActionBtnHolder: {
        marginTop: 'auto',
        alignSelf: 'center',
        width: '100%',
        marginBottom: 20,
    },
    /* Here style the text of your button */
    customBtnText: {
        fontSize: 18,
        fontWeight: '400',
        color: "#fff",
        textAlign: 'center',
        fontWeight: 'bold'
    },

    /* Here style the background of your button */
    customBtnBG: {
        backgroundColor: CANCEL,
        paddingVertical: 10,
        borderRadius: 30,
        width: '100%',
    }
});


const RequestNewTrip = (props) => {
    const { t } = useTranslation();

    const {
        panelHeader,
        displayPanel,
        onPanelDismiss,
    } = props;

    return (
        <View>
            <DraggablePanel
                visible={displayPanel}
                onDismiss={onPanelDismiss}
                initialHeight={600}
                expandable
            >
                <CloseButton
                    onPress={onPanelDismiss}
                />
                <Inset all={16}>
                        <View>

                            <View style={styles.titleWrapper}>
                                <Text style={styles.title}>{t('request_new_trip')}</Text>
                            </View>
                            <Stack size={12} />

                            <Divider style={{ backgroundColor: GRAY_DARK }} />


                            <View>
                                <View style={styles.callToActionBtnHolder}>
                                    <Inset all={16}>
                                        <TouchableOpacity
                                            style={styles.customBtnBG}
                                            onPress={() => { }}
                                        >
                                            <Text style={styles.customBtnText}>{t('request_trip')}</Text>
                                        </TouchableOpacity>
                                    </Inset>
                                </View>
                            </View>


                    </View>

                </Inset>

            </DraggablePanel>
        </View>
    );
}

export default RequestNewTrip;