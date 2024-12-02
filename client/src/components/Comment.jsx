import { format } from 'timeago.js';

import Image from './Image';

const Comment = ({ comment }) => {
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
        <span className='text-xs text-red-300 hover:text-red-500 cursor-pointer'>
          delete
          <span>(in progress)</span>
        </span>
      </div>
      <div className='mt-4'>
        <p>{comment.desc}</p>
      </div>
    </div>
  );
};

export default Comment;
