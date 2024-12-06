import { useSearchParams } from 'react-router-dom';

import Search from './Search';

const SideMenu = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleFilterChange = (e) => {
    if (searchParams.get('sort') !== e.target.value) {
      setSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        sort: e.target.value,
      });
    }
  };

  const handleCategoryChange = (category) => {
    if (searchParams.get('category') !== category) {
      setSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        category,
      });
    }
  };

  return (
    <aside className='px-4 h-max sticky top-8'>
      <h1 className='mb-4 text-sm font-medium capitalize'>Search</h1>
      <Search />
      <h1 className='mt-8 mb-4 text-sm font-medium capitalize'>Filter</h1>
      <div className='flex flex-col gap-2 text-sm'>
        <label htmlFor='' className='flex items-center gap-2 cursor-pointer'>
          <input
            type='radio'
            name='sort'
            value='newest'
            className='appearance-none w-4 h-4 border-[1.5px] border-blue-800 cursor-pointer rounded-sm bg-white checked:bg-blue-800'
            onChange={handleFilterChange}
          />
          Newest
        </label>
        <label htmlFor='' className='flex items-center gap-2 cursor-pointer'>
          <input
            type='radio'
            name='sort'
            value='popular'
            className='appearance-none w-4 h-4 border-[1.5px] border-blue-800 cursor-pointer rounded-sm bg-white checked:bg-blue-800'
            onChange={handleFilterChange}
          />
          Most Popular
        </label>
        <label htmlFor='' className='flex items-center gap-2 cursor-pointer'>
          <input
            type='radio'
            name='sort'
            value='trending'
            className='appearance-none w-4 h-4 border-[1.5px] border-blue-800 cursor-pointer rounded-sm bg-white checked:bg-blue-800'
            onChange={handleFilterChange}
          />
          Trending
        </label>
        <label htmlFor='' className='flex items-center gap-2 cursor-pointer'>
          <input
            type='radio'
            name='sort'
            value='oldest'
            className='appearance-none w-4 h-4 border-[1.5px] border-blue-800 cursor-pointer rounded-sm bg-white checked:bg-blue-800'
            onChange={handleFilterChange}
          />
          Oldest
        </label>
      </div>
      <h1 className='mt-8 mb-4 text-sm font-medium capitalize'>Categories</h1>
      <div className='flex flex-col gap-2 text-sm'>
        <span
          className='underline cursor-pointer capitalize'
          onClick={() => handleCategoryChange('general')}
        >
          All
        </span>
        <span
          className='underline cursor-pointer capitalize'
          onClick={() => handleCategoryChange('web-design')}
        >
          Web design
        </span>
        <span
          className='underline cursor-pointer capitalize'
          onClick={() => handleCategoryChange('development')}
        >
          Development
        </span>
        <span
          className='underline cursor-pointer capitalize'
          onClick={() => handleCategoryChange('databases')}
        >
          Databases
        </span>
        <span
          className='underline cursor-pointer capitalize'
          onClick={() => handleCategoryChange('seo')}
        >
          Search engines
        </span>
        <span
          className='underline cursor-pointer capitalize'
          onClick={() => handleCategoryChange('marketing')}
        >
          Marketing
        </span>
      </div>
    </aside>
  );
};

export default SideMenu;
