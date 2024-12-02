import http from './httpService';

const apiEndpoint = '/comments';

export const getComments = (postId) => http.get(`${apiEndpoint}/${postId}`);
