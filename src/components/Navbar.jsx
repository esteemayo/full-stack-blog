import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((value) => {
      return !value;
    });
  };

  return (
    <nav className='w-full h-16 md:h-20 flex items-center justify-between'>
      <div className='flex items-center gap-4 text-2xl font-bold'>
        <img src='/logo.png' alt='logo' className='w-8 h-8' />
        <span>blog</span>
      </div>
      <div className='md:hidden'>
        <div className='cursor-pointer text-4xl' onClick={handleToggle}>
          {isOpen ? 'X' : '☰'}
        </div>
        <div
          className={`w-full h-screen flex flex-col items-center justify-center gap-8 font-medium text-lg capitalize absolute top-16  transition-all ease-in-out ${
            isOpen ? '-right-0' : '-right-[100%]'
          }`}
        >
          <a href='/'>Home</a>
          <a href='/'>Trending</a>
          <a href='/'>Most popular</a>
          <a href='/'>About</a>
          <a href='/'>
            <button type='button' className='py-2 px-4 rounded-3xl bg-blue-800'>
              Login 👋
            </button>
          </a>
        </div>
      </div>
      <div className='hidden md:flex items-center gap-8 xl:gap-12 font-medium'>
        <a href='/'>Home</a>
        <a href='/'>Trending</a>
        <a href='/'>Most popular</a>
        <a href='/'>About</a>
        <a href='/'>
          <button type='button' className='py-2 px-4 rounded-3xl bg-blue-800'>
            Login 👋
          </button>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
