import { useInfiniteQuery } from '@tanstack/react-query';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import PostListItem from './PostListItem';
import { getPosts } from '../services/postService';

const fetchPosts = async (pageParam) => {
  const { data } = await getPosts(pageParam);
  return data;
};

const PostList = () => {
  const { data, error, fetchNextPage, hasNextPage, isFetching } =
    useInfiniteQuery({
      queryKey: ['posts'],
      queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam),
      initialPageParam: 1,
      getNextPageParam: (lastPage, pages) =>
        lastPage.hasMore ? pages.length + 1 : undefined,
    });

  if (isFetching) return 'Loading...';

  if (error) return `An error has occurred ${error.message}`;

  const allPosts = data?.pages.flatMap((page) => page.posts) || [];

  return (
    <InfiniteScroll
      dataLength={allPosts.length}
      next={fetchNextPage}
      hasMore={!!hasNextPage}
      loader={<h4>Loading more posts...</h4>}
      endMessage={
        <p>
          <b>All posts loaded!</b>
        </p>
      }
    >
      {allPosts.map((post) => {
        return <PostListItem key={post._id} {...post} />;
      })}
    </InfiniteScroll>
  );
};

export default PostList;
