import axios from 'axios';
// import { store } from 'react-notifications-component';
import { AppSettings, NetworkSettings } from '_utils';

const RequestApi = axios.create({
  baseURL: NetworkSettings.fullApiURL + NetworkSettings.apiBaseEndpointVersion,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    'X-App-Key': AppSettings.appKey
  },
});

RequestApi.interceptors.request.use(
  config => {
    const selectedLanguage = 'en';
    config.headers['X-App-Language'] = `${selectedLanguage}`;

    const token = 'test';

    if (token) {
      config.headers['Authorization'] = `Token ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

RequestApi.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    return Promise.reject(error.response);
  },
);

export default RequestApi;
