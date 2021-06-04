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
    onDestinationAddress: (state, action) => {
        state.steps.destinationAddress = action.payload;
      },
    onAddressSelected: (state, action) => {
      state.steps.pickupAddress = action.payload;
    },
    onUpdateTripStops: (state, action) => {
        state.steps.tripStops = [...state.steps.tripStops, action.payload];
    },
    onEnterTripReason: (state, action) => {
        state.steps.tripReason = action.payload;
    },
    deleteTripStop: (state, action) => {
      state.steps.tripStops.splice(action.payload, 1);
    },
    onRoundTripChecked: (state, action) =>  {
        state.steps.isRoundTrip = action.payload;
    },
    onAdditionPassengersChange: (state, action) => {
        state.steps.additionalPassengers = action.payload;
    },  
    onWheelchairRequiredChecked: (state, action) => {
        state.steps.wheelchairRequired = action.payload;
    },
    onSpecialNeeds: (state, action) => {
        state.steps.specialNeeds = action.payload;
    },
    onAppointmentDateTimeChange: (state, action) => {

      if(action.payload.type === "datetime") {
        alert(action.payload.value)

      }
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
const { onAddressSelected, onDestinationAddress, onUpdateTripStops, deleteTripStop, onRoundTripChecked, onSpecialNeeds,
    onAdditionPassengersChange, onWheelchairRequiredChecked, onAppointmentDateTimeChange, onEnterTripReason
 } = slice.actions;
export const selectAddress = (address) => async dispatch => {
  try {
    dispatch(onAddressSelected(address));
  } catch (e) {
    return console.error(e.message);
  }
}

export const enterTripReason = (reason) => async dispatch => {
    try {
      dispatch(onEnterTripReason(reason));
    } catch (e) {
      return console.error(e.message);
    }
  }

export const removeATripStop = (index) => async dispatch => {
    try {
        dispatch(deleteTripStop(index));
      } catch (e) {
        return console.error(e.message);
      }
}

export const destinationSelect = (address) => async dispatch => {
    try {
      dispatch(onDestinationAddress(address));
    } catch (e) {
      return console.error(e.message);
    }
  }

export const updateTripStop = (address) => async dispatch => {
  try {
    return dispatch(onUpdateTripStops(address))
  } catch (e) {
    return console.error(e.message);
  }
}
export const roundTrip = (trip) => async dispatch => {
  try {
    dispatch(onRoundTripChecked(trip));
  } catch (e) {
    return console.error(e.message);
  }
}

export const deleteTripSt = (index) => async dispatch => {
    try {
      dispatch(deleteTripStop(index));
    } catch (e) {
      return console.error(e.message);
    }
  }

export const appointMentSchedule = (schedule) => async dispatch => {
    try {
      dispatch(onAppointmentDateTimeChange(schedule));
    } catch (e) {
      return console.error(e.message);
    }
  }

export const requireWheelChair = (value) => async dispatch => {
    try {
      return dispatch(onWheelchairRequiredChecked(value))
    } catch (e) {
      return console.error(e.message);
    }
}

export const additionalPassenger = (value) => async dispatch => {
    try {
      return dispatch(onAdditionPassengersChange(value))
    } catch (e) {
      return console.error(e.message);
    }
}

export const setSpecialNeeds = (value) => async dispatch => {
    try {
      return dispatch(onSpecialNeeds(value))
    } catch (e) {
      return console.error(e.message);
    }
}
