const Navbar = () => {
  return (
    <nav className='w-full h-16 md:h-20 flex items-center justify-between'>
      <div className='flex items-center gap-4 text-2xl font-bold'>
        <img src='/logo.png' alt='logo' className='w-8 h-8' />
        <span>blog</span>
      </div>
      <div className='md:hidden'>M</div>
      <div className='hidden md:flex'>D</div>
    </nav>
  );
};

export default Navbar;
