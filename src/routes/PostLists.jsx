import { useMemo, useState } from 'react';

import PostList from '../components/PostList';
import SideMenu from '../components/SideMenu';

const PostLists = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((value) => {
      return !value;
    });
  };

  const btnLabel = useMemo(() => {
    return isOpen ? 'Close' : 'Filter or Search';
  }, [isOpen]);

  return (
    <div className=''>
      <h1 className='mb-8 text-2xl capitalize'>Development blogs</h1>
      <button
        type='button'
        onClick={handleToggle}
        className='bg-blue-800 text-sm text-white px-4 py-2 rounded-xl outline-0 mb-4 md:hidden'
      >
        {btnLabel}
      </button>
      <div className='flex flex-col-reverse gap-8 md:flex-row'>
        <div className=''>
          <PostList />
        </div>
        <div className={`${isOpen ? 'block' : 'hidden'} md:block`}>
          <SideMenu />
        </div>
      </div>
    </div>
  );
};

export default PostLists;
