import http from './httpService';

const apiEndpoint = '/posts';

export const getPosts = () => http.get(apiEndpoint);
