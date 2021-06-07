//setup redux
import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
//import reducers
import user from './user';
import plan from './plan';
import steps from './steps';
import savedLocations from './savedLocations';

const reducer = combineReducers({
    user,
    plan,
    steps,
    savedLocations
});
const store = configureStore({
    reducer,
});
export default store;