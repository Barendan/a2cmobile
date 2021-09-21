import { createSlice } from '@reduxjs/toolkit';
import storage from './../storage';

// Slice
// const initialUser = localStorage.getItem('user')
//   ? JSON.parse(localStorage.getItem('user'))
//   : null;

let initialUser = null;

// load
storage
  .load({
    key: 'user',

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
    initialUser = ret;
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

const slice = createSlice({
  name: 'user',
  initialState: {
    user: initialUser,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      storage
        .save({
          key: 'user', // Note: Do not use underscore("_") in key!
          id: 'currentUser', // Note: Do not use underscore("_") in id!
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
    saveUserLogin: (state, action) => {
      state.user = action.payload;
      storage.save({
        key: 'savedUser', // Note: Do not use underscore("_") in key!
        id: 'userSaved',
        data: action.payload,
        expires: null,
      });
    },
    logoutSuccess: (state, action) => {
      state.user = null;
      storage.remove({
        key: 'user',
        id: 'currentUser',
      });
      storage.remove({
        key: 'savedUser',
        id: 'userSaved',
      });
    },
    updateSuccess: (state, action) => {
      state.user = action.payload;
      storage
        .save({
          key: 'user', // Note: Do not use underscore("_") in key!
          id: 'currentUser', // Note: Do not use underscore("_") in id!
          data: action.payload,
          expires: null,
        })
        .catch(err => {
          // any exception including data not found
          // goes to catch()
          // console.warn(err.message);
          switch (err.name) {
            case 'NotFoundError':
              ``;
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
const {
  loginSuccess,
  logoutSuccess,
  updateSuccess,
  saveUserLogin,
} = slice.actions;
export const login = currentUser => async dispatch => {
  try {
    // const res = await api.post('/api/auth/login/', { username, password })
    dispatch(loginSuccess(currentUser));
  } catch (e) {
    return console.error(e.message);
  }
};
export const logout = () => async dispatch => {
  try {
    // const res = await api.post('/api/auth/logout/')
    return dispatch(logoutSuccess());
  } catch (e) {
    return console.error(e.message);
  }
};

export const saveLoggedInUser = currentUser => async dispatch => {
  try {
    dispatch(saveUserLogin(currentUser));
  } catch (e) {
    return console.error(e.message);
  }
};

export const update = currentUser => async dispatch => {
  try {
    // const res = await api.post('/api/auth/login/', { username, password })
    dispatch(updateSuccess(currentUser));
  } catch (e) {
    return console.error(e.message);
  }
};
