import { createSlice } from '@reduxjs/toolkit';
import storage from './../storage';

// Slice
// const initialPlan = localStorage.getItem('plan')
//   ? JSON.parse(localStorage.getItem('plan'))
//   : null;

let initialPlan = null;
let initialMemberPlans = [];

// load
storage
  .load({
    key: 'plan',

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
      someFlag: true,
    },
  })
  .then(ret => {
    // found data go to then()
    initialPlan = ret;
  })
  .catch(err => {
    // any exception including data not found
    // goes to catch()
    // console.warn(err.message);
    switch (err.name) {
      case 'NotFoundError':
        console.log('No user found.');
        break;
      case 'ExpiredError':
        console.log('User expired.');
        break;
    }
  });

storage
  .load({
    key: 'memberPlans',

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
      someFlag: true,
    },
  })
  .then(ret => {
    // found data go to then()
    initialPlan = ret;
  })
  .catch(err => {
    // any exception including data not found
    // goes to catch()
    // console.warn(err.message);
    switch (err.name) {
      case 'NotFoundError':
        console.log('No user found.');
        break;
      case 'ExpiredError':
        console.log('User expired.');
        break;
    }
  });

const slice = createSlice({
  name: 'plan',
  initialState: {
    plan: initialPlan,
    memberPlans: initialMemberPlans,
  },
  reducers: {
    updateCurrentPlan: (state, action) => {
      state.plan = action.payload;
      storage
        .save({
          key: 'plan', // Note: Do not use underscore("_") in key!
          id: 'currentPlan', // Note: Do not use underscore("_") in id!
          data: action.payload,
          expires: null,
        })
        .catch(err => {
          // any exception including data not found
          // goes to catch()
          // console.warn(err.message);
          switch (err.name) {
            case 'NotFoundError':
              console.log('No user to load.');
              break;
            case 'ExpiredError':
              console.log('Data expired.');
              break;
          }
        });
    },
    setCurrentMemberPlans: (state, action) => {
      state.memberPlans = action.payload;
      storage
        .save({
          key: 'memberPlans', // Note: Do not use underscore("_") in key!
          id: 'memberPlans', // Note: Do not use underscore("_") in id!
          data: action.payload,
          expires: null,
        })
        .catch(err => {
          // any exception including data not found
          // goes to catch()
          // console.warn(err.message);
          switch (err.name) {
            case 'NotFoundError':
              console.log('No user to load.');
              break;
            case 'ExpiredError':
              console.log('Data expired.');
              break;
          }
        });
    },
  },
});
export default slice.reducer;
// Actions
const { updateCurrentPlan, setCurrentMemberPlans } = slice.actions;

export const updatePlan = currentPlan => async dispatch => {
  try {
    dispatch(updateCurrentPlan(currentPlan));
  } catch (e) {
    return console.error(e.message);
  }
};

export const setMemberPlans = currentPlan => async dispatch => {
  try {
    dispatch(setCurrentMemberPlans(currentPlan));
  } catch (e) {
    return console.error(e.message);
  }
};
