import { RequestApi } from '_helpers';
import i18next from "i18next";

const loginUser = payload => {
    return RequestApi.post(`/users?type=login`,payload);
};
 
const updateUser = payload => {
    return RequestApi.put(`/users?type=login`,payload);
};

const getUserRecord = (value) => {
    return RequestApi.get(`/users?type=userRecord&value=${value}`);
};

const requestTrip = (payload) => {
    return RequestApi.post(`/members?type=requestTrip`,payload);
};
 
const cancelTrip = (payload) => {
    return RequestApi.post(`/members?type=cancel`,payload);
};
  
const cancelOnlineTrip = (payload) => {
    return RequestApi.post(`/members?type=cancelOnlineTrip`,payload);
};

// member registration calls
const validateMemberInfo= (value,subValue,triSubValue) => {
    return RequestApi.get(`/members?type=memberInfo&value=${value}&subValue=${subValue}&triSubValue=${triSubValue}`);
};

const sendTempPassCode = payload => {
    return RequestApi.post(`/users?type=sendTempPassCode`,payload);
};

const registerUser = payload => {
    return RequestApi.post(`/users?type=register`,payload);
};

const validateMemberLogin = (value) => {
    return RequestApi.get(`/users?type=loginDetails&value=${value}`);
};

const updatePassword = (payload) => {
    return RequestApi.put(`/users`,payload);
};

export default {
    loginUser,
    updateUser,
    getUserRecord,
    requestTrip,
    cancelTrip,
    cancelOnlineTrip,
    validateMemberInfo,
    sendTempPassCode,
    registerUser,
    validateMemberLogin,
    updatePassword
};