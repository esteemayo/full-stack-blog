import { Link } from 'react-router-dom';

import Image from './Image';

const PostListItem = () => {
  return (
    <div className='flex flex-col xl:flex-row gap-8 mb-12'>
      <div className='md:hidden xl:block xl:w-1/3'>
        <Image
          src='postImg.jpeg'
          className='rounded-2xl object-cover'
          width='735'
        />
      </div>
      <div className='flex flex-col gap-4 xl:w-2/3'>
        <Link to='/test' className='text-4xl font-semibold'>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam modi
          eum aut.
        </Link>
        <div className='flex items-center gap-2 text-gray-400 text-sm'>
          <span>Written by</span>
          <Link className='text-blue-800 capitalize' to=''>
            John doe
          </Link>
          <span>on</span>
          <Link className='text-blue-800 capitalize'>Web design</Link>
          <span></span>
        </div>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam vel
          quia perspiciatis corporis nostrum. Dolorem a quibusdam porro?
          Suscipit amet nisi officiis dicta, id ab aliquid nobis? Assumenda,
          rerum ab.
        </p>
        <Link to='/test' className='underline text-blue-800 text-sm capitalize'>
          Read more
        </Link>
      </div>
    </div>
  );
};

export default PostListItem;
