import { Link } from 'react-router-dom';

import Image from './Image';

const PostListItem = () => {
  return (
    <div className='flex flex-col xl:flex-row gap-8 mb-12'>
      <div className='md:hidden xl:block xl:w-1/3'>
        <Image src='' className='rounded-2xl object-cover' w='735' />
      </div>
      <div className='flex flex-col gap-4 xl:w-2/3'>
        <Link to='' className='text-4xl font-semibold'></Link>
        <div className='flex items-center gap-2 text-gray-400 text-sm'>
          <span>Written by</span>
          <Link className='text-blue-800' to=''></Link>
          <span>on</span>
          <Link className='text-blue-800'></Link>
          <span></span>
        </div>
        <p></p>
        <Link to='' className='underline text-blue-800 text-sm'>
          Read More
        </Link>
      </div>
    </div>
  );
};

export default PostListItem;
