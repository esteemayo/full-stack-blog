import { Link } from 'react-router-dom';
import { useState } from 'react';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';

import Image from './Image';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((value) => {
      return !value;
    });
  };

  return (
    <nav className='w-full h-16 md:h-20 flex items-center justify-between'>
      <Link to='/' className='flex items-center gap-4 text-2xl font-bold'>
        <Image
          src='logo.png'
          className='w-8 h-8'
          alt='logo'
          width={32}
          height={32}
        />
        <span>blog</span>
      </Link>
      <div className='md:hidden'>
        <div className='cursor-pointer text-4xl' onClick={handleToggle}>
          {isOpen ? 'X' : '☰'}
        </div>
        <div
          className={`w-full h-screen flex flex-col items-center justify-center gap-8 font-medium text-lg capitalize absolute top-16  transition-all ease-in-out ${isOpen ? '-right-0' : '-right-[100%]'
            }`}
        >
          <Link to='/'>Home</Link>
          <Link to='/'>Trending</Link>
          <Link to='/'>Most popular</Link>
          <Link to='/'>About</Link>
          <Link to='/'>
            <button type='button' className='py-2 px-4 rounded-3xl bg-blue-800 text-white'>
              Login 👋
            </button>
          </Link>
        </div>
      </div>
      <div className='hidden md:flex items-center gap-8 xl:gap-12 font-medium'>
        <Link to='/'>Home</Link>
        <Link to='/'>Trending</Link>
        <Link to='/'>Most popular</Link>
        <Link to='/'>About</Link>
        <SignedOut>
          <Link to='/login'>
            <button type='button' className='py-2 px-4 rounded-3xl bg-blue-800 text-white'>
              Login 👋
            </button>
          </Link>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navbar;
