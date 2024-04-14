'use client';

import { useState } from 'react';
import Logo from './Logo';
import MobileMenu from './MobileMenu';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 w-[100%] h-[72px] bg-dark-1 z-20 flex justify-between items-center px-6">
      <Logo />
      <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default Navbar;
