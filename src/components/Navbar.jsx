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
          className={`w-full h-screen flex flex-col items-center justify-center absolute top-16 bg-red-600 transition-all ease-in-out ${
            isOpen ? '-right-0' : '-right-[100%]'
          }`}
        >
          menu
        </div>
      </div>
      <div className='hidden md:flex'>D</div>
    </nav>
  );
};

export default Navbar;
