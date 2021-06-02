import React from 'react';
import { useSelector } from 'react-redux';

const useTripDetails = () => {
  const { user } = useSelector(state => state.user);
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
    specialNeeds: '',
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
    if (type.toLowerCase() === 'tripstops') {
      updateTripDetails('tripStops', [...tripDetails.tripStops, value]);
    } else {
      updateTripDetails(type, value);
    }
  };

  const deleteTripStop = index => {
    let newTripStops = tripDetails.tripStops;
    updateTripDetails('tripStops', newTripStops);
  };

  const onRoundTripChecked = value => {
    updateTripDetails('isRoundTrip', value);
  };

  const onAdditionPassengersChange = value => {
    updateTripDetails('additionalPassengers', value);
  };

  const onWheelchairRequiredChecked = value => {
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
        console.log('Unknown type. Only Date and Time Required');
    }
  };

  const onTripReasonSelected = selected => {
    updateTripDetails('tripReason', selected.value);
  };

  const onSpecialNeedsEntered = value => {
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
      wheelchair: tripDetails.wheelchairRequired ? 'yes' : 'no',
      appointmentDateTime: tripDetails.appointmentDateTime,
      appointmentDate: tripDetails.appointmentDate,
      appointmentTime: tripDetails.appointmentTime,
      tripReason: tripDetails.tripReason,
      specialNeeds: tripDetails.specialNeeds,
    };

    console.log(JSON.stringify(payload));

    setLoading(true);
    MemberService.requestTrip(payload)
      .then(data => {
        setLoading(false);
        alert(JSON.stringify(data));
      })
      .catch(err => {
        alert(JSON.stringify(err));

        setLoading(false);
      });
  };

  return {
    tripDetails,
    setTripDetails,
    updateTripDetails,
    onAddressSelected,
    deleteTripStop,
    onRoundTripChecked,
    onAdditionPassengersChange,
    onWheelchairRequiredChecked,
    onAppointmentDateTimeChange,
    onTripReasonSelected,
    onSpecialNeedsEntered,
    onRequestTrip,
  };
};

export default useTripDetails;