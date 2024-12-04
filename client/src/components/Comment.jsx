import { useAuth, useUser } from '@clerk/clerk-react';
import { format } from 'timeago.js';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import Image from './Image';
import { deleteComment } from '../services/commentService';

const removeComment = async (commentId, token) => {
  const { data } = await deleteComment(commentId, token);
  return data;
};

const Comment = ({ comment, postId }) => {
  const commentId = comment._id;

  const { user } = useUser();
  const { getToken } = useAuth();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      removeComment(commentId, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
      toast.success('Comment deleted successfully');
    },
    onError: (error) => {
      toast.error(error.response.data);
    },
  });

  const role = user?.publicMetadata?.role;

  return (
    <div className='p-4 bg-slate-50 rounded-xl mb-8'>
      <div className='flex items-center gap-4'>
        {comment.user.img && (
          <Image
            src={comment.user.img}
            className='w-10 h-10 rounded-full object-cover'
            width='40'
          />
        )}
        <span className='font-medium capitalize'>{comment.user.username}</span>
        <span className='text-sm text-gray-500'>
          {format(comment.createdAt)}
        </span>
        {user &&
          (comment.user.username === user.username || role === 'admin') && (
            <span
              className='text-xs text-red-300 hover:text-red-500 cursor-pointer'
              onClick={() => mutation.mutate()}
            >
              delete
              {mutation.isPending && <span>(in progress)</span>}
            </span>
          )}
      </div>
      <div className='mt-4'>
        <p>{comment.desc}</p>
      </div>
    </div>
  );
};

export default Comment;
