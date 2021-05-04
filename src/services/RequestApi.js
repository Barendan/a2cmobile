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

export default RequestApi;
