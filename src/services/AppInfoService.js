import { RequestApi } from '_helpers';
import i18next from "i18next";

const getAppInformation = (type) => {
    return RequestApi.get(`/appInfo?type=${type}&language=${i18next.language}`);
};
 
const getSecurityQuestions = () => {
    return RequestApi.get(`/users?type=securityQuestions`);
};

export default {
    getAppInformation,
    getSecurityQuestions
};