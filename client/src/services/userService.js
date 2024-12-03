import http from './httpService';

const apiEndpoint = '/users';

export const savePost = (postId, token) =>
  http.patch(`${apiEndpoint}/save`, postId, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
