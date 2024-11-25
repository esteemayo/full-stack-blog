import PostList from '../components/PostList';

const PostLists = () => {
  return (
    <div className=''>
      <h1 className='mb-8 text-2xl capitalize'>Development blogs</h1>
      <div className='flex gap-8'>
        <div className=''>
          <PostList />
        </div>
        <div className=''></div>
      </div>
    </div>
  );
};

export default PostLists;
