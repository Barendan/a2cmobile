import { RequestApi } from '_helpers';
import i18next from "i18next";

const getAppInformation = (type) => {
    return RequestApi.get(`/appInfo?type=${type}&language=${i18next.language}`);
};
 
export default {
    getAppInformation
};