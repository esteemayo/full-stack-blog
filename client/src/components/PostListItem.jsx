import { format } from 'timeago.js'
import { Link } from 'react-router-dom';

import Image from './Image';

const PostListItem = ({ title, desc, img, slug, user, category, createdAt }) => {
  return (
    <article className='flex flex-col xl:flex-row gap-8 mb-12'>
      <div className='md:hidden xl:block xl:w-1/3'>
        {img && <Image
          src={img}
          className='rounded-2xl object-cover'
          width='735'
        />}
      </div>
      <div className='flex flex-col gap-4 xl:w-2/3'>
        <Link to={`/${slug}`} className='text-4xl font-semibold'>
          {title}
        </Link>
        <div className='flex items-center gap-2 text-gray-400 text-sm'>
          <span>Written by</span>
          <Link className='text-blue-800 capitalize' to={`/posts?author=${user.username}`}>
            {user.username}
          </Link>
          <span>on</span>
          <Link className='text-blue-800 capitalize'>{category}</Link>
          <span>{format(createdAt)}</span>
        </div>
        <p>
          {desc}
        </p>
        <Link to={`/${slug}`} className='underline text-blue-800 text-sm capitalize'>
          Read more
        </Link>
      </div>
    </article>
  );
};

export default PostListItem;
