import { RequestApi } from '_helpers';
import i18next from "i18next";

const loginUser = payload => {
    return RequestApi.post(`/users?type=login`,payload);
};
 
const updateUser = payload => {
    return RequestApi.put(`/users?type=login`,payload);
};

const getUserRecord= (value) => {
    return RequestApi.get(`/users?type=userRecord&value=${value}`);
};

const requestTrip = (value) => {
    return RequestApi.post(`/members?type=requestTrip&value=${value}`);
};
 
const cancelTrip = (value) => {
    return RequestApi.post(`/members?type=cancel&value=${value}`);
};
 
 
export default {
    loginUser,
    updateUser,
    getUserRecord,
    requestTrip,
    cancelTrip
};