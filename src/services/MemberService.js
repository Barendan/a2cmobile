import { RequestApi } from '_helpers';
import i18next from "i18next";

const loginUser = payload => {
    return RequestApi.post(`/users?type=login`,payload);
};
 
export default {
    loginUser
};