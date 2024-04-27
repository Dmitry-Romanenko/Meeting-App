'use client';

import { sidebarLinks } from '@/app/constants';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

const Menu = ({ onClick, isMobile }: { onClick?: () => void; isMobile?: boolean }) => {
  const pathname = usePathname();
  return (
    <ul className="flex flex-col gap-3">
      {sidebarLinks.map((link) => {
        const isActive = pathname === link.route;
        return (
          <li key={link.label}>
            <Link
              onClick={onClick}
              href={link.route}
              className={cn({
                'flex items-center justify-center rounded-lg p-2 text-lg font-semibold text-white xl:justify-start xl:gap-4 xl:p-4':
                  !isMobile,
                'flex items-center gap-4 rounded-lg p-4 text-lg font-semibold text-white': isMobile,
                'bg-blue-1': isActive,
              })}
            >
              <Image width={24} height={24} src={link.icon} alt={link.label} />
              <span className={cn({ 'hidden xl:block': !isMobile })}>{link.label}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Menu;
