'use client';

import { Dispatch, SetStateAction } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Image from 'next/image';
import Logo from './Logo';
import Menu from './Menu';

const MobileMenu = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className="sm:hidden">
        <Image width={30} height={30} src={'/icons/hamburger.svg'} alt="hamburger" />
      </SheetTrigger>
      <SheetContent
        side={'left'}
        className="flex max-w-xs flex-col gap-12 border-none bg-dark-1 p-3 text-white"
      >
        <Logo onClick={() => setIsOpen(false)} />
        <Menu onClick={() => setIsOpen(false)} isMobile />
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
