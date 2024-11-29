import Axios from 'axios';
import { toast } from 'react-toastify';

import logger from './logService';

const devEnv = import.meta.env !== 'production';
const { VITE_DEV_URL_ENDPOINT, VITE_PROD_URL_ENDPOINT } = import.meta.env;

const API = Axios.create({
  baseURL: devEnv ? VITE_DEV_URL_ENDPOINT : VITE_PROD_URL_ENDPOINT,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

API.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response.status &&
    error.response.status >= 400 &&
    error.response.status &&
    error.response.status < 500;

  if (!expectedError) {
    logger.log(error);
    toast.error('An unexpected error occurred!');
  }

  return Promise.reject(error);
});

const http = {
  get: API.get,
  post: API.post,
  patch: API.patch,
  delete: API.delete,
};

export default http;
