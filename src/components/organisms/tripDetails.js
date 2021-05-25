import React from 'react';
import { SafeAreaView, View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import { Inset, Stack } from "react-native-spacing-system";
import { Avatar, Card, Title, IconButton, Divider, List } from 'react-native-paper';
import { useTranslation } from "react-i18next";

// styles
import { GRAY_DARK, START_LOCATION_COLOR, MID_LOCATION_COLOR, END_LOCATION_COLOR } from '_styles/colors';

const TripDetails = (props) => {
    const { t } = useTranslation();

    const [tripStops, setTripStops] = React.useState([]);

    const {
        currentTrip,
        viewFullTripDetails
    } = props;

    React.useEffect(() => {
        if (currentTrip) {
            let currentStopsArray = currentTrip.Stops.split(',');
            let lastStop = currentStopsArray[currentStopsArray.length - 1];

            if (currentStopsArray[0] === lastStop) {
                currentStopsArray.splice(currentStopsArray.length - 1, 1);
            }

            setTripStops(currentStopsArray);
        }
    }, [props]);

    const stopStyle = (index) => {
        if (index === (tripStops.length - 1))
            return styles.endLocationIcon;

        switch (index) {
            case 0:
                return styles.startLocationIcon
                break;
            default:
                return styles.midLocationIcon
        }
    }
    return (
        <Card style={styles.tripDetail} onPress={() => viewFullTripDetails()}>
            {currentTrip && <Card.Content>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View>
                        <Text style={styles.providerNameText}>{currentTrip.TransportProviderName}</Text>
                        {currentTrip.TripDate && <>
                            <Stack size={6} />
                            <Text>{currentTrip.TripDate} {currentTrip.TripTime}</Text>
                        </>}

                    </View>

                    {currentTrip.ProviderPhoneNumber && <TouchableHighlight onPress={() => alert()}>
                        <Avatar.Icon {...props} size={30} icon="phone" color="black" style={styles.callIcon} />
                    </TouchableHighlight>}
                </View>
                <Stack size={12} />

                <Divider style={{ backgroundColor: GRAY_DARK }} />
                <Stack size={12} />

                {tripStops.map((currentStop, index) => (
                    <List.Item
                        title={currentStop}
                        titleStyle={styles.tripTitleStyle}
                        style={styles.tripPathDetails}
                        left={props => <Avatar.Icon {...props} size={12} color="black" style={stopStyle(index)} />}
                    />
                ))}

                <Divider style={{ backgroundColor: GRAY_DARK }} />
                <Stack size={12} />
                <View style={styles.appointmentReminderText}>
                    <Text style={styles.blueText}>{t('please_be_Ready')} <Text style={styles.greenText}>{t('one_hour')}</Text> {t('before_appt_time')}</Text>
                </View>
            </Card.Content>}
        </Card>
    );
};

const styles = StyleSheet.create({
    callIcon: {
        backgroundColor: "white",
        borderColor: "black",
        borderStyle: "solid",
        borderWidth: 1,
    },
    tripDetail: {
        backgroundColor: "white",
        borderRadius: 10
    },
    tripPathDetails: {
        marginLeft: -5
    },
    appointmentReminderText: {
        alignItems: 'center',
    },
    providerNameText: {
        color: '#276092',
        fontWeight: 'bold',
        fontSize: 14,
    },
    blueText: {
        color: '#276092',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    greenText: {
        color: 'green',
        fontWeight: 'bold'
    },
    tripTitleStyle: {
        fontSize: 15,
        color: '#47494d',
        marginTop: -9
    },
    startLocationIcon: {
        backgroundColor: START_LOCATION_COLOR,
    },
    midLocationIcon: {
        backgroundColor: MID_LOCATION_COLOR,
    },
    endLocationIcon: {
        backgroundColor: END_LOCATION_COLOR,
    },
});

export default TripDetails;

