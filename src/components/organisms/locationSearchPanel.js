import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, useWindowDimensions, TouchableHighlight } from 'react-native';
import { Avatar, Card, IconButton, Divider } from 'react-native-paper';

import DraggablePanel from 'react-native-draggable-panel';
import { Inset, Stack } from "react-native-spacing-system";
import { useTranslation } from "react-i18next";

import { CloseButton } from '_atoms'

import  storage  from '_storage';


//helpers
import { LocationService } from '_helpers';

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
        zIndex: 1,
        flexDirection: "row",
    },
    bodyWrapper: {
        marginBottom: 0,
        height: '65%'
    },


    locationIcon: {
        backgroundColor: "white",
        borderColor: "black",
        borderStyle: "solid",
        borderWidth: 1,
    },
});


const LocationSearchPanel = (props) => {
    const { t } = useTranslation();
    const [ savedLocations, setSavedLocations ] = useState([]);
    

    const {
        panelHeader,
        displayPanel,
        onPanelDismiss,
        onPlaceSelected,
    } = props;


    useEffect(() => {
        // load
        storage
            .load({
                key: 'savedLocations',
                autoSync: true,
                syncInBackground: true
            })
            .then(ret => {
                setSavedLocations(ret);
            })
            .catch(err => {
                console.warn(err.message);
                switch (err.name) {
                    case 'NotFoundError':
                        // TODO;
                        break;
                    case 'ExpiredError':
                        // TODO
                        break;
                }
            });
    }, []);


    return (
        <View>
            <DraggablePanel
                visible={displayPanel}
                onDismiss={onPanelDismiss}
                initialHeight={800}
                expandable
            >
                <CloseButton
                    onPress={onPanelDismiss}
                />
                <Inset all={16}>

                    <View style={styles.titleWrapper}>
                        <Text style={styles.title}>{panelHeader}</Text>
                    </View>
                    <Stack size={12} />

                    <View style={styles.content} keyboardShouldPersistTaps={'handled'}>

                        <LocationService.googlePlacesAutoInput placeholder={t('search_location')} lang={'en'} onPlaceSelected={(v) => onPlaceSelected(v)} />
                    
                    </View>

                    <Stack size={12} />

                    {savedLocations && savedLocations.length > 0 &&

                        <ScrollView style={styles.bodyWrapper} showsVerticalScrollIndicator={false}>

                            {savedLocations.map(currentLocation => (
                                <TouchableHighlight onPress={() => onPlaceSelected(currentLocation.address)}>
                                    <View>
                                        <Card.Title
                                            style={{ backgroundColor: 'white' }}
                                            title={currentLocation.name}
                                            subtitle={currentLocation.address.FormattedAddress}
                                            left={(props) => <Avatar.Icon {...props} icon="map-marker" color="black" style={styles.locationIcon} />}
                                        />
                                        <Divider />
                                        <Stack size={12} />
                                    </View>
                                </TouchableHighlight>
                            ))}

                        </ScrollView>}





                </Inset>

            </DraggablePanel>
        </View>
    );
}

export default LocationSearchPanel;