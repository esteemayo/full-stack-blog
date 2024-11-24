import Image from './Image';

const Comment = () => {
  return (
    <div className='p-4 bg-slate-50 rounded-xl mb-8'>
      <div className='flex items-center gap-4'>
        <Image
          src='userImg.jpeg'
          className='w-10 h-10 rounded-full object-cover'
          width='40'
        />
        <span className='font-medium capitalize'>John doe</span>
        <span className='text-sm text-gray-500'>2 days ago</span>
        <span className='text-xs text-red-300 hover:text-red-500 cursor-pointer'>
          delete
          <span>(in progress)</span>
        </span>
      </div>
      <div className='mt-4'>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum optio
          debitis laboriosam perferendis tenetur temporibus iure, sed quas,
          ratione deleniti totam unde vitae, recusandae eius nulla?
          Necessitatibus eveniet eius minima.
        </p>
      </div>
    </div>
  );
};

export default Comment;
