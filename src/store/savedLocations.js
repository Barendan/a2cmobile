import { createSlice } from '@reduxjs/toolkit';
import  storage  from './../storage';

// Slice
// const initialSavedLocations = localStorage.getItem('plan')
//   ? JSON.parse(localStorage.getItem('plan'))
//   : null;

let initialSavedLocations = [];

// load
storage
  .load({
    key: 'savedLocations',
 
    // autoSync (default: true) means if data is not found or has expired,
    // then invoke the corresponding sync method
    autoSync: true,
 
    // syncInBackground (default: true) means if data expired,
    // return the outdated data first while invoking the sync method.
    // If syncInBackground is set to false, and there is expired data,
    // it will wait for the new data and return only after the sync completed.
    // (This, of course, is slower)
    syncInBackground: true,
 
    // you can pass extra params to the sync method
    // see sync example below
    syncParams: {
      extraFetchOptions: {
        // blahblah
      },
      someFlag: true
    }
  })
  .then(ret => {
    // found data go to then()
    initialSavedLocations = ret;
  })
  .catch(err => {
    // any exception including data not found
    // goes to catch()
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

const slice = createSlice({
  name: 'savedLocations',
  initialState: {
    savedLocations: initialSavedLocations
  },
  reducers: {
    updateCurrentLocations: (state, action) => {
      state.savedLocations = action.payload;
      storage.save({
        key: 'savedLocations', // Note: Do not use underscore("_") in key!
        id: 'currentLocationsList', // Note: Do not use underscore("_") in id!
        data: action.payload,
        expires: null
      });
    },      
  },
});
export default slice.reducer;
// Actions
const { updateCurrentLocations } = slice.actions;

export const updateSavedLocations = (currentLocationsList) => async dispatch => {
  try {
    dispatch(updateCurrentLocations(currentLocationsList));
  } catch (e) {
    return console.error(e.message);
  }
}
