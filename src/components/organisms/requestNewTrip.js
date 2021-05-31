import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet, ScrollView, TouchableHighlight } from 'react-native';
import AnimatedMultistep from 'react-native-animated-multistep';
import DraggablePanel from 'react-native-draggable-panel';
import { Inset, Stack } from "react-native-spacing-system";
import { Divider } from 'react-native-paper';
import { useTranslation } from "react-i18next";
import { CloseButton, ProgressBar } from '_atoms'
import { LocationService } from '_helpers'
import { LocationSearchCard, CheckboxCard, NumericCountCard, DateTimePickerCard, DropDownPickerCard, TextInputCard } from '_organisms';
import { MemberService } from '_services';
import Spinner from 'react-native-spinkit';
import { useSelector } from 'react-redux';

// styles
import { CANCEL, GRAY_BLUE, APP_COLOR } from '_styles/colors';
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
    },
    loadingView: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});


const RequestNewTrip = (props) => {
    const { t } = useTranslation();
    const { user } = useSelector(state => state.user);

    //
    const allSteps = [
        { name: 'Where are you going?', component: <View>Pick Up Address</View> },
        { name: 'Appointment Details', component: <View>Special Needs</View> },
        { name: 'Review', component: <View>Review</View> },
    ];

    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = React.useState(false);

    const onNext = () => {
        setCurrentStep(currentStep + 1);
        console.log('Next');
    };

    const onBack = () => {
        console.log('Back');
    };

    const finish = finalState => {
        console.log(finalState);
    };

    const [tripReasons, setTripReasons] = useState([
        { label: 'Routine Checkup', value: 'Routine Checkup' },
        { label: 'Monthly Appointment', value: 'Monthly Appointment' },
        { label: 'Yearly Physical', value: 'Yearly Physical' }
    ]);

    //Trip Details
    const [tripDetails, setTripDetails] = React.useState({
        pickupAddress: null,
        tripStops: [],
        destinationAddress: null,
        isRoundTrip: false,
        additionalPassengers: 0,
        wheelchairRequired: false,
        appointmentDateTime: null,
        appointmentDate: '',
        appointmentTime: '',
        tripReason: '',
        specialNeeds: ''
    });

    const updateTripDetails = React.useCallback((key, value) => {
        setTripDetails(tripDetails => {
            return {
                ...tripDetails,
                [key]: value,
            };
        });
    }, []);

    const onAddressSelected = (type, value) => {
        if (type.toLowerCase() === "tripstops") {
            updateTripDetails("tripStops", [...tripDetails.tripStops, value]);
        } else {
            updateTripDetails(type, value);
        }
    };

    const deleteTripStop = (index) => {
        let newTripStops = tripDetails.tripStops;
        updateTripDetails("tripStops", newTripStops);
    }

    const onRoundTripChecked = (value) => {
        updateTripDetails('isRoundTrip', value);
    };

    const onAdditionPassengersChange = (value) => {
        updateTripDetails('additionalPassengers', value);
    };

    const onWheelchairRequiredChecked = (value) => {
        updateTripDetails('wheelchairRequired', value);
    };

    const onAppointmentDateTimeChange = (type, value) => {
        switch (type) {
            case 'date':
                updateTripDetails('appointmentDate', value);
                break;
            case 'time':
                updateTripDetails('appointmentTime', value);
                break;
            case 'datetime':
                updateTripDetails('appointmentDateTime', value);
                break;
            default:
                console.log('Unknown type. Only Date and Time Required')
        }
    };

    const onTripReasonSelected = (selected) => {
        updateTripDetails('tripReason', selected.value);
    };

    const onSpecialNeedsEntered = (value) => {
        updateTripDetails('specialNeeds', value);
    };


    const onRequestTrip = () => {
        var payload = {
            memberID: user.memberID,
            NETMember_ID: user.NETMember_ID,
            pickupAddress: tripDetails.pickupAddress.FormattedAddress,
            pickupAddressLat: tripDetails.pickupAddress.Latitude,
            pickupAddressLng: tripDetails.pickupAddress.Longitude,
            pickupAddress1: tripDetails.pickupAddress.AddressLine1,
            pickupAddress2: tripDetails.pickupAddress.AddressLine2,
            pickupAddressCity: tripDetails.pickupAddress.City,
            pickupAddressState: tripDetails.pickupAddress.State,
            pickupAddressCounty: tripDetails.pickupAddress.County,
            pickupAddressZip: tripDetails.pickupAddress.ZipCode,
            pickupAddressCountry: tripDetails.pickupAddress.Country,
            destinationAddress: tripDetails.destinationAddress.FormattedAddress,
            destinationAddressLat: tripDetails.destinationAddress.Latitude,
            destinationAddressLng: tripDetails.destinationAddress.Longitude,
            destinationAddress1: tripDetails.destinationAddress.AddressLine1,
            destinationAddress2: tripDetails.destinationAddress.AddressLine2,
            destinationAddressCity: tripDetails.destinationAddress.City,
            destinationAddressState: tripDetails.destinationAddress.State,
            destinationAddressCounty: tripDetails.destinationAddress.County,
            destinationAddressZip: tripDetails.destinationAddress.ZipCode,
            destinationAddressCountry: tripDetails.destinationAddress.Country,            
            tripStops: tripDetails.tripStops,
            isRoundTrip: tripDetails.isRoundTrip,
            additionalPassengers: tripDetails.additionalPassengers,
            wheelchair:  tripDetails.wheelchairRequired ? "yes" : "no",
            appointmentDateTime: tripDetails.appointmentDateTime,
            appointmentDate: tripDetails.appointmentDate,
            appointmentTime: tripDetails.appointmentTime,
            tripReason: tripDetails.tripReason,
            specialNeeds: tripDetails.specialNeeds,
        };

        console.log(JSON.stringify(payload))

        setLoading(true);
        MemberService.requestTrip(payload)
        .then((data) => {
            setLoading(false);
            alert(JSON.stringify(data))
        })
        .catch((err) => {
            alert(JSON.stringify(err))

            setLoading(false);
        });
    }

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
                initialHeight={800}
                expandable
            >
                {loading && <View style={styles.loadingView}>
                    <Spinner
                        isVisible={loading}
                        size={50}
                        type={'ThreeBounce'}
                        color={APP_COLOR}
                    />
                    <Text>{t('requesting_Trip')}...</Text>
                </View> }


                {!loading && <>
                    <CloseButton
                        onPress={onPanelDismiss}
                    />



                    <Inset all={16}>

                        <View style={styles.titleWrapper}>
                            <Text style={styles.title}>{t('request_new_trip')}</Text>
                        </View>
                        <Stack size={12} />


                        {/* <ProgressBar small={true} currentStep={currentStep} stepCount={allSteps.length} title={allSteps[currentStep - 1].name} subtitle={currentStep !== allSteps.length && t('go_to_next') + ': ' + allSteps[currentStep].name} /> */}
                        {/* <Stack size={12} /> */}

                        <Divider />
                        <Stack size={12} />
                        <ScrollView showsVerticalScrollIndicator={false}>

                            {/* <Text>Step 1</Text> */}

                            <LocationSearchCard locationIndex={0} title={t('pickup_address')} description={tripDetails.pickupAddress ? tripDetails.pickupAddress.FormattedAddress : t('pickup_address_description')} onAddressSelected={(addr) => onAddressSelected('pickupAddress', addr)} />

                            {tripDetails.tripStops.map((currentStop, index) => (<>
                                <LocationSearchCard disableClick={true} icon={'minus'} iconColor={GRAY_BLUE} showBorder={true} title={t('trip_stop') + ' ' + (index + 1)} description={currentStop.FormattedAddress} onPress={() => deleteTripStop(index)} />
                            </>))}

                            <LocationSearchCard showBorder={true} dashedBorder={true} title={t('add_a_stop')} description={t('add_a_stop_description')} onAddressSelected={(addr) => onAddressSelected('tripStops', addr)} />

                            <LocationSearchCard locationIndex={1} title={t('destination_address')} description={tripDetails.destinationAddress ? tripDetails.destinationAddress.FormattedAddress : t('destination_address_description')} onAddressSelected={(addr) => onAddressSelected('destinationAddress', addr)} />
                            <CheckboxCard cardIcon={'swap-horizontal'} title={t('round_trip')} checkedValue={tripDetails.isRoundTrip} onChecked={(value) => onRoundTripChecked(value)} />

                            {/* <Text>Step 2</Text> */}

                            <NumericCountCard cardIcon={'account-multiple-outline'} title={t('additional_passengers')} count={tripDetails.additionalPassengers} onCountChange={(value) => onAdditionPassengersChange(value)} />
                            <CheckboxCard cardIcon={'wheelchair-accessibility'} title={t('wheelchair_required')} checkedValue={tripDetails.wheelchairRequired} onChecked={(value) => onWheelchairRequiredChecked(value)} />
                            <DateTimePickerCard cardIcon={'calendar-clock'} title={t('appointment_date_time')} description={tripDetails.appointmentDateTime && <>{tripDetails.appointmentDate} {tripDetails.appointmentDate && tripDetails.appointmentTime ? 'at ' + tripDetails.appointmentTime : tripDetails.appointmentTime}</>} minimumDate={new Date()} showDatePicker={true} showTimePicker={true} dateValue={tripDetails.appointmentDate} timeValue={tripDetails.appointmentTime} onDateTimeChange={(type, value) => onAppointmentDateTimeChange(type, value)} />
                            <DropDownPickerCard cardIcon={'information-outline'} title={t('trip_reason')} multiple={false} optionsList={tripReasons} selectedValue={tripDetails.tripReason} onOptionSelected={(value) => onTripReasonSelected(value)} />

                            {/* <Text>Step 3</Text> */}

                            <TextInputCard cardIcon={'handshake'} title={t('special_needs')} placeholder={t('special_needs_description')} textValue={tripDetails.specialNeeds} onChangeText={(value) => onSpecialNeedsEntered(value)} />

                            <Stack size={12} />


                            <View style={styles.callToActionBtnHolder}>
                                <Inset all={16}>
                                <TouchableOpacity
                                        style={styles.customBtnBG}
                                        onPress={() => onRequestTrip()}
                                    >
                                        <Text style={styles.customBtnText}>{t('request_trip')}</Text>
                                    </TouchableOpacity>
                                </Inset>
                            </View>
              
                        <Stack size={120} />

                        </ScrollView>
                       
              
                     
                        {/* 

                            <AnimatedMultistep
        steps={allSteps}
        onFinish={finish}
        onBack={onBack}
        onNext={onNext}
      /> */}

                
                    
                  

                    </Inset>
                </>}

            </DraggablePanel>
        </View>
    );
}

export default RequestNewTrip;