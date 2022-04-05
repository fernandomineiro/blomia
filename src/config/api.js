import axios from 'axios';

import { URL_API } from '../../blomia.config';

const api = axios.create({
  /* development */
  baseURL: URL_API,
});

api.interceptors.request.use(
  request => {
    console.log('chamada ->', request.url);
    return request;
  },
  error => {
    return Promise.reject(error);
  },
);

const armazenamentoToken = headers => {
  console.log('global access-token', headers['access-token']);
  api.defaults.headers.common['access-token'] = headers['access-token'];
  // console.log('global res', headers.client);
  api.defaults.headers.common.client = headers.client;
  // console.log('global uid', headers.uid);
  api.defaults.headers.common.uid = headers.uid;
};

api.interceptors.response.use(
  function (response) {
    console.log('success');
    armazenamentoToken(response.headers);
    return response;
  },
  function (error) {
    console.log('failed', error.response.data);
    if (error.response.data.errors) {
      if (
        error.response.data.errors[0] ===
        'You need to sign in or sign up before continuing.'
      ) {
        // console.log('global sem token');
      } else {
        armazenamentoToken(error.response.headers);
      }
    } else {
      armazenamentoToken(error.response.headers);
    }
    return Promise.reject(error);
  },
);

export default api;
