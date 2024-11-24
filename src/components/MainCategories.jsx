import { Link } from 'react-router-dom';

import Search from './Search';

const MainCategories = () => {
  return (
    <div className='hidden md:flex items-center justify-center gap-8 bg-white rounded-3xl xl:rounded-full p-4 shadow-lg'>
      <div className='flex-1 flex items-center justify-between flex-wrap'>
        <Link
          to='/posts'
          className='bg-blue-800 text-white rounded-full px-4 py-2 capitalize'
        >
          All posts
        </Link>
        <Link
          to='/posts?category=web-design'
          className='bg-blue-800 text-white rounded-full px-4 py-2 capitalize'
        >
          Web design
        </Link>
        <Link
          to='/posts?category=development'
          className='bg-blue-800 text-white rounded-full px-4 py-2 capitalize'
        >
          Development
        </Link>
        <Link
          to='/posts?category=databases'
          className='bg-blue-800 text-white rounded-full px-4 py-2 capitalize'
        >
          Databases
        </Link>
        <Link
          to='/posts?category=seo'
          className='bg-blue-800 text-white rounded-full px-4 py-2 capitalize'
        >
          Search engines
        </Link>
        <Link
          to='/posts?category=marketing'
          className='bg-blue-800 text-white rounded-full px-4 py-2 capitalize'
        >
          Marketings
        </Link>
      </div>
      <span className='text-xl font-medium'>|</span>
      <Search />
    </div>
  );
};

export default MainCategories;
