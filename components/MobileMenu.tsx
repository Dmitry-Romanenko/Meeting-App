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
      <SheetTrigger>
        <Image width={30} height={30} src={'/icons/hamburger.svg'} alt="hamburger" />
      </SheetTrigger>
      <SheetContent side={'left'} className="bg-dark-1 flex flex-col gap-12 border-none">
        <Logo onClick={() => setIsOpen(false)} />
        <Menu onClick={() => setIsOpen(false)} />
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
