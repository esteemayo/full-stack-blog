import { useQuery } from '@tanstack/react-query';

import Comment from './Comment';
import { getComments } from '../services/commentService';

const fetchComments = async (postId) => {
  const { data } = await getComments(postId);
  return data;
};

const Comments = ({ postId }) => {
  const { isPending, error, data } = useQuery({
    queryKey: ['comments', postId],
    queryFn: () => fetchComments(),
  });

  if (isPending) return 'Loading...';

  if (error) return `Something went wrong... ${error.message}`;

  return (
    <div className='flex flex-col gap-8 lg:w-3/5 mb-12'>
      <h1 className='text-xl text-gray-500 underline'>Comments</h1>
      <form className='flex items-center justify-between gap-8 w-full'>
        <textarea
          name='desc'
          placeholder='Write a comment...'
          className='w-full p-4 rounded-xl outline-0 resize-none'
        />
        <button className='bg-blue-800 px-4 py-3 text-white font-medium rounded-xl capitalize outline-0'>
          Send
        </button>
      </form>

      {data.map((comment) => {
        return <Comment key={comment._id} {...comment} />;
      })}
    </div>
  );
};

export default Comments;
