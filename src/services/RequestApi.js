import axios from 'axios';
// import { store } from 'react-notifications-component';
import { NetworkSettings } from 'utils';

const RequestApi = axios.create({
  baseURL: NetworkSettings.fullApiURL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  },
});

RequestApi.interceptors.request.use(
  config => {
    const selectedLanguage = localStorage.getItem('i18nextLng') || 'en';
    config.headers['X-App-LAnguage'] = `${selectedLanguage}`;

    const token = localStorage.getItem('token');

    if (token) {
      config.headers['Authorization'] = `Token ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

RequestApi.interceptors.response.use(
  response => {
    return response.data.result;
  },
  error => {
    return Promise.reject(error.response.data);
  },
);

export default RequestApi;
