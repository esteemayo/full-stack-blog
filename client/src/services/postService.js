import http from './httpService';

const apiEndpoint = '/posts';

export const getPosts = (pageParam) =>
  http.get(apiEndpoint, {
    params: { page: pageParam, limit: 2 },
  });

export const getPost = (slug) => http.get(`${apiEndpoint}/${slug}`);

export const createPost = (post) => http.post(apiEndpoint, post);
