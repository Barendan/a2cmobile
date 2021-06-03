//setup redux
import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
//import reducers
import user from './user';
import plan from './plan';
import steps from './steps';

const reducer = combineReducers({
    user,
    plan,
    steps
});
const store = configureStore({
    reducer,
});
export default store;