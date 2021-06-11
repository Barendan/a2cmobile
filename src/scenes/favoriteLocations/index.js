import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    Alert,
} from 'react-native';
import { useTranslation } from 'react-i18next';

import { useDispatch, useSelector } from 'react-redux';

import { Avatar, Card, IconButton, Divider, FAB } from 'react-native-paper';
import { Inset, Stack } from 'react-native-spacing-system';
import { APP_COLOR } from '_styles/colors';
import { SaveLocationPanel } from '_organisms';
import { EmptyStateView } from '_molecules';

import storage from '_storage';

const FavoriteLocations = () => {

    const { t } = useTranslation();

    const [savedLocations, setSavedLocations] = useState([]);

    useEffect(() => {
        loadLocations();
    }, []);



    const [displayPanel, setDisplayPanel] = useState(false);


    const loadLocations = () => {
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
    }

    const onPanelDismiss = () => {
        loadLocations();
        setDisplayPanel(false);
    }


    const removeLocation = (location) => {
        const index = savedLocations.indexOf(location);
        if (index > -1) {
  
            let updatedLocations = [...savedLocations.slice(0, index), ...savedLocations.slice(index + 1)];

            storage.save({
                key: 'savedLocations', // Note: Do not use underscore("_") in key!
                data: updatedLocations,
                expires: null
            }).then(ret => {
                setSavedLocations(updatedLocations);
            });
        }
    }

    return (
        <SafeAreaView style={styles.container}>

            {savedLocations.length === 0 && <Inset all={16}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <EmptyStateView title={t('no_saved_locations')} />
                </ScrollView>
            </Inset>}

            {savedLocations.length > 0 && <Inset all={1}>

                <ScrollView showsVerticalScrollIndicator={false}>

                    {savedLocations.map(currentLocation => (
                        <>
                            <Card.Title
                                style={{ backgroundColor: 'white' }}
                                title={currentLocation.name}
                                subtitle={currentLocation.address.FormattedAddress}
                                left={(props) => <Avatar.Icon {...props} icon="map-marker" color="black" style={styles.locationIcon} />}
                                right={(props) => <IconButton {...props} icon="minus" onPress={() => removeLocation(currentLocation)} />}
                            />
                            <Divider />
                        </>
                    ))}

                    <Stack size={100} />
                </ScrollView>

            </Inset>}

            <FAB
                style={styles.fab}
                large
                icon="plus"
                label={t('add_saved_location')}
                onPress={() => setDisplayPanel(true)}
            />

            <SaveLocationPanel
                displayPanel={displayPanel}
                onPanelDismiss={onPanelDismiss}
            />

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    locationIcon: {
        backgroundColor: "white",
        borderColor: "black",
        borderStyle: "solid",
        borderWidth: 1,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: '#dbdbdb',
    },
    fab: {
        position: 'absolute',
        margin: 25,
        right: 0,
        bottom: 0,
        backgroundColor: APP_COLOR,
        zIndex: 1,
    },
});

export default FavoriteLocations;
