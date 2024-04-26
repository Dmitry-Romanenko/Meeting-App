'use client';

import { useState } from 'react';
import Logo from './Logo';
import MobileMenu from './MobileMenu';
import { SignedIn, UserButton } from '@clerk/nextjs';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed left-0 top-0 z-20 flex h-[72px] w-[100%] items-center justify-between bg-dark-1 px-6">
      <Logo />
      <div className="flex items-center gap-5">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </div>
  );
};

export default Navbar;
