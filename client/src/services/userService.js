import http from './httpService';

const apiEndpoint = '/users';

export const getSavedPosts = (token) =>
  http.get(`${apiEndpoint}/saved`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const savePost = (postId, token) =>
  http.patch(`${apiEndpoint}/save`, postId, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
