//setup redux
import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
//import reducers
import user from './user';
import plan from './plan';

const reducer = combineReducers({
    user,
    plan
});
const store = configureStore({
    reducer,
});
export default store;