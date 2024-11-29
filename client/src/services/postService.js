import http from './httpService';

const apiEndpoint = '/posts';

export const getPosts = () => http.get(apiEndpoint);

export const createPost = (post) => http.post(apiEndpoint, post);
