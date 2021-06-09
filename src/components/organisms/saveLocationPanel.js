import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, useWindowDimensions } from 'react-native';
import DraggablePanel from 'react-native-draggable-panel';
import { Inset, Stack } from "react-native-spacing-system";
import { Input, Button } from '@ui-kitten/components';
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux';

import { CloseButton } from '_atoms'
import { LocationSearchCard } from '_molecules';

import { MemberService } from '_services';
import { updateSavedLocations } from '_store/savedLocations';


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
        backgroundColor: 'green'
    },
    content: {
        justifyContent: 'space-between',
        display: 'flex',
        alignItems: 'stretch'
    },
    bodyWrapper: {
        marginBottom: 0,
        height: '65%'
    },

    input: {
        width: '95%',
        height: 50,
        borderWidth: 2,
        borderRadius: 2,
        marginBottom: '10%',
        alignSelf: 'center',
    },

    requiredInput: {
        borderColor: 'red',
        borderWidth: 1
    },
    forwardButton: {
        flex: 1,
        height: 40,
        borderColor: '#F5F5F5',
        borderRadius: 30,
    },
});


const SaveLocationPanel = (props) => {
    const { t } = useTranslation();
    const { savedLocations } = useSelector(state => state.savedLocations);
    const dispatch = useDispatch();

    const [loading, setLoading] = React.useState(false);

    const [newLocation, setNewLocation] = React.useState({
        address: null,
        name: ''
    });

    const updateNewLocation = React.useCallback((key, value) => {
        setNewLocation(newLocation => {
            return {
                ...newLocation,
                [key]: value,
            };
        });
    }, []);

    const {
        panelHeader,
        displayPanel,
        onPanelDismiss,
    } = props;


    const onSaveLocation = () => {
        dispatch(updateSavedLocations([...savedLocations, newLocation]));
        onPanelDismiss();
    }

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

                    <View style={styles.titleWrapper}>
                        <Text style={styles.title}>{t('add_new_location')}</Text>
                    </View>
                    <Stack size={12} />

                    <View style={styles.content}>
                        <ScrollView style={styles.bodyWrapper} showsVerticalScrollIndicator={false}>

                        <Stack size={6} />

                            <Input
                                style={[styles.input, (newLocation.name.length === 0 && styles.requiredInput)]}
                                onChangeText={text => updateNewLocation('name', text)}
                                value={newLocation.name}
                                label={t('enter_name_label') + "*"}
                                placeholder={t('enter_name_label')}
                            />


                            <LocationSearchCard
                                required={newLocation.address === null ? true : false}
                                title={newLocation.name.length === 0 ? t('address') : newLocation.name}
                                description={newLocation.address === null ? t('address_description') : newLocation.address.FormattedAddress}
                                onAddressSelected={addr => updateNewLocation("address", addr)}
                            />

                        </ScrollView>

                        <Inset all={16}>

                            <Button
                                title={t('save_location')}
                                size="large"
                                style={styles.forwardButton}
                                disabled={newLocation.address === null || newLocation.name.length === 0}
                                onPress={onSaveLocation}>
                                {t('save_location')}
                            </Button>

                        </Inset>
                    </View>
                </Inset>

            </DraggablePanel>
        </View>
    );
}

export default SaveLocationPanel;