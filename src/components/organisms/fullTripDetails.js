import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet, ScrollView, useWindowDimensions } from 'react-native';
import DraggablePanel from 'react-native-draggable-panel';
import { Inset, Stack } from "react-native-spacing-system";
import { Divider } from 'react-native-paper';
import { useTranslation } from "react-i18next";
import { useSelector } from 'react-redux';

import { CloseButton } from '_atoms'
import { TripDetails } from '_organisms';

import { MemberService } from '_services';
import user from '_store';


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
    tripDetailsHolder: {
        backgroundColor: GRAY_LIGHT
    },
    content: {
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


const FullTripDetails = (props) => {
    const { t } = useTranslation();
    const { user } = useSelector(state => state.user);

    const [loading, setLoading] = React.useState(false);

    const {
        panelHeader,
        displayPanel,
        onPanelDismiss,
        currentTrip
    } = props;


    const onCancelTrip = () => {
        setLoading(true);
  
        let payload = {
            memberID: user.memberID,
            tripNumber: currentTrip.TripNumber
        }
    
        MemberService.cancelTrip(payload)
          .then((data) => {
    
            setLoading(false);
            onPanelDismiss();

          })
          .catch((err) => {
            alert(JSON.stringify(err));
            setLoading(false);
          });
    }

    const onCancelOnlineTrip = () => {
        setLoading(true);
  
        let payload = {
            onlineTripID: currentTrip.OnlineTripID
        }
    
        MemberService.cancelOnlineTrip(payload)
          .then((data) => {
    
            setLoading(false);
            onPanelDismiss();

          })
          .catch((err) => {
            alert(JSON.stringify(err));
            setLoading(false);
          });
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
                {currentTrip && <Inset all={16}>
                    <View style={styles.content}>
                        <View>

                            <View style={styles.titleWrapper}>
                                <Text style={styles.title}>{panelHeader}</Text>
                            </View>
                            <Stack size={12} />

                            <ScrollView style={styles.bodyWrapper} showsVerticalScrollIndicator={false}>

                                <View style={styles.tripDetailsHolder}>
                                    <Inset all={8}>
                                        <TripDetails
                                            currentTrip={currentTrip}
                                            viewFullTripDetails={() => { }}
                                        />
                                    </Inset>
                                </View> 

                                <Divider style={{ backgroundColor: GRAY_DARK }} />
                                <Stack size={12} />

                                <Inset all={10}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={styles.levelOfService}>{currentTrip.LevelOfService}</Text>

                                        <Text style={styles.tripNumber}>{t('trip_no')} {currentTrip.TripNumber}</Text>
                                    </View>
                                </Inset>

                                <Divider style={{ backgroundColor: GRAY_DARK }} />

                                <Inset all={10}>
                                    <View style={{ flexDirection: 'column' }}>
                                        <Text style={styles.specialNeedsLabel}>{t('special_needs')} </Text>
                                        {currentTrip.SpecialNeeds ? <Text>{currentTrip.SpecialNeeds}</Text> : <Text>{t('none')}</Text>}
                                    </View>
                                </Inset>

                                <Divider style={{ backgroundColor: GRAY_DARK }} />

                            </ScrollView>

                            <View>
                                <Inset all={16}>
                                    <TouchableOpacity
                                        style={styles.customBtnBG}
                                        onPress={(currentTrip.TransportProviderName !== null && currentTrip.TransportProviderName.toLowerCase() === 'pending') ? onCancelOnlineTrip : onCancelTrip}
                                    >
                                        <Text style={styles.customBtnText}>{t('cancel_trip')}</Text>
                                    </TouchableOpacity>
                                </Inset>
                            </View>

                        </View>

                    </View>

                </Inset>}

            </DraggablePanel>
        </View>
    );
}

export default FullTripDetails;