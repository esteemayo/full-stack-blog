import http from './httpService';

const apiEndpoint = '/comments';

export const getComments = (postId) => http.get(`${apiEndpoint}/${postId}`);

export const createComment = (postId, comment, token) =>
  http.post(`${apiEndpoint}/${postId}`, comment, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
