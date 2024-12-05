import http from './httpService';

const apiEndpoint = '/posts';

export const getPosts = (pageParam, searchParams) => {
  const searchParamsObj = Object.fromEntries([...searchParams]);
  console.log(searchParamsObj);

  http.get(apiEndpoint, {
    params: { page: pageParam, limit: 2, searchParamsObj },
  });
};

export const getPost = (slug) => http.get(`${apiEndpoint}/${slug}`);

export const createPost = (post) => http.post(apiEndpoint, post);

export const updateFeature = (postId, token) =>
  http.patch(`${apiEndpoint}/feature`, postId, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const deletePost = (postId, token) =>
  http.delete(`${apiEndpoint}/${postId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
