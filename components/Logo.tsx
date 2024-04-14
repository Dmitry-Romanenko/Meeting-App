'use client';

import Image from 'next/image';
import Link from 'next/link';

const Logo = ({ onClick }: { onClick?: () => void }) => {
  return (
    <Link onClick={onClick} href={'/'} className="flex gap-1 items-center ">
      <Image width={40} height={40} src={'/icons/logo.svg'} alt="logo" />
      <h1 className="text-2xl font-extrabold text-white">Meet</h1>
    </Link>
  );
};

export default Logo;
