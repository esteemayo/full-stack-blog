import { useAuth, useUser } from '@clerk/clerk-react';
import { toast } from 'react-toastify';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import Comment from './Comment';
import { createComment, getComments } from '../services/commentService';

const fetchComments = async (postId) => {
  const { data } = await getComments(postId);
  return data;
};

const addComment = async (postId, comment, token) => {
  const { data } = await createComment(postId, comment, token);
  return data;
};

const Comments = ({ postId }) => {
  const { user } = useUser();
  const { getToken } = useAuth();

  const queryClient = useQueryClient();

  const { isPending, error, data } = useQuery({
    queryKey: ['comments', postId],
    queryFn: () => fetchComments(),
  });

  const mutation = useMutation({
    mutationFn: async (comment) => {
      const token = await getToken();
      addComment(postId, comment, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
    },
    onError: (error) => {
      toast.error(error.response.data);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    const data = {
      desc: formData.get('desc'),
    };

    mutation.mutate(data);
  };

  return (
    <section className='flex flex-col gap-8 lg:w-3/5 mb-12'>
      <h1 className='text-xl text-gray-500 underline'>Comments</h1>
      <form
        onSubmit={handleSubmit}
        className='flex items-center justify-between gap-8 w-full'
      >
        <textarea
          name='desc'
          placeholder='Write a comment...'
          className='w-full p-4 rounded-xl outline-0 resize-none'
        />
        <button
          type='submit'
          className='bg-blue-800 px-4 py-3 text-white font-medium rounded-xl capitalize outline-0'
        >
          Send
        </button>
      </form>

      {isPending ? (
        'Loading...'
      ) : error ? (
        'Error loading comments!'
      ) : (
        <>
          {mutation.isPending && (
            <Comment
              comment={{
                desc: `${mutation.variables.desc} (Sending...)`,
                createdAt: new Date(),
                user: {
                  img: user.imageUrl,
                  username: user.username,
                },
              }}
            />
          )}
          {data.map((comment) => {
            return (
              <Comment key={comment._id} comment={comment} postId={postId} />
            );
          })}
        </>
      )}
    </section>
  );
};

export default Comments;
