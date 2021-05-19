import { RequestApi } from '_helpers';

const getMemberTrips = (type, subValue) => {
    return RequestApi.get(`/members?type=memberTrips&value=${type}&subValue=${subValue}`);
};

export default {
    getMemberTrips
};