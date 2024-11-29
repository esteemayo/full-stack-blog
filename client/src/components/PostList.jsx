import { useQuery } from '@tanstack/react-query';

import PostListItem from './PostListItem';
import { getPosts } from '../services/postService';

const fetchPosts = async () => {
  const { data } = await getPosts();
  return data;
};

const PostList = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ['posts'],
    queryFn: () => fetchPosts(),
  });

  if (isPending) return 'Loading...';

  if (error) return `An error has occurred ${error.message}`;

  return (
    <>
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem />
    </>
  );
};

export default PostList;
