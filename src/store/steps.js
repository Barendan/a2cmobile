import { createSlice } from '@reduxjs/toolkit';


const slice = createSlice({
  name: 'steps',
  initialState: {
      steps: {
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
      }
  },
  reducers: {
    destinationAddressHelper: (state, action) => {
        state.steps.destinationAddress = action.payload;
      },
    pickupAddressHelper: (state, action) => {
      state.steps.pickupAddress = action.payload;
    },
    tripStopsHelper: (state, action) => {
        state.steps.tripStops = [...state.steps.tripStops, action.payload];
    },
    tripReasonHelper: (state, action) => {
        state.steps.tripReason = action.payload;
    },
    deleteATripStopHelper: (state, action) => {
      state.steps.tripStops.splice(action.payload, 1);
    },
    isRoundTripHelper: (state, action) =>  {
        state.steps.isRoundTrip = action.payload;
    },
    additionalPassengerHelper: (state, action) => {
        state.steps.additionalPassengers = action.payload;
    },  
    wheelchairRequiredHelper: (state, action) => {
        state.steps.wheelchairRequired = action.payload;
    },
    specialNeedsHelper: (state, action) => {
        state.steps.specialNeeds = action.payload;
    },
    appointmentDateTimeHelper: (state, action) => {
        switch (action.payload.type) {
            case 'date':
                state.steps.appointmentDate = action.payload.value;
              break;
            case 'time':
                state.steps.appointmentTime = action.payload.value;
              break;
            case 'datetime':
                state.steps.appointmentDateTime = action.payload.value;
              break;
            default:
              console.log('Unknown type. Only Date and Time Required');
          }
    },      
  },
});
export default slice.reducer;
// Actions
const { pickupAddressHelper, destinationAddressHelper, tripStopsHelper, deleteATripStopHelper, isRoundTripHelper, specialNeedsHelper,
    additionalPassengerHelper, wheelchairRequiredHelper, appointmentDateTimeHelper, tripReasonHelper
 } = slice.actions;
export const selectAddress = (address) => async dispatch => {
  try {
    dispatch(pickupAddressHelper(address));
  } catch (e) {
    return console.error(e.message);
  }
}

export const setTripReason = (reason) => async dispatch => {
    try {
      dispatch(tripReasonHelper(reason));
    } catch (e) {
      return console.error(e.message);
    }
  }

export const removeATripStop = (index) => async dispatch => {
    try {
        dispatch(deleteATripStopHelper(index));
      } catch (e) {
        return console.error(e.message);
      }
}

export const destinationSelect = (address) => async dispatch => {
    try {
      dispatch(destinationAddressHelper(address));
    } catch (e) {
      return console.error(e.message);
    }
  }

export const updateTripStop = (address) => async dispatch => {
  try {
    return dispatch(tripStopsHelper(address))
  } catch (e) {
    return console.error(e.message);
  }
}
export const roundTrip = (trip) => async dispatch => {
  try {
    dispatch(isRoundTripHelper(trip));
  } catch (e) {
    return console.error(e.message);
  }
}

export const deleteTripSt = (index) => async dispatch => {
    try {
      dispatch(deleteATripStopHelper(index));
    } catch (e) {
      return console.error(e.message);
    }
  }

export const setAppointMentSchedule = (schedule) => async dispatch => {
    try {
      dispatch(appointmentDateTimeHelper(schedule));
    } catch (e) {
      return console.error(e.message);
    }
  }

export const setRequiredWheelChair = (value) => async dispatch => {
    try {
      return dispatch(wheelchairRequiredHelper(value))
    } catch (e) {
      return console.error(e.message);
    }
}

export const setAdditionalPassenger = (value) => async dispatch => {
    try {
      return dispatch(additionalPassengerHelper(value))
    } catch (e) {
      return console.error(e.message);
    }
}

export const setSpecialNeeds = (value) => async dispatch => {
    try {
      return dispatch(specialNeedsHelper(value))
    } catch (e) {
      return console.error(e.message);
    }
}
