'use client';

import { sidebarLinks } from '@/app/constants';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

const Menu = ({ onClick }: { onClick?: () => void }) => {
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
              className={cn(
                'flex justify-center items-center text-lg p-2 font-semibold text-white rounded-lg xl:justify-start xl:p-4 xl:gap-4',
                {
                  'bg-blue-1': isActive,
                }
              )}
            >
              <Image width={24} height={24} src={link.icon} alt={link.label} />
              <span className="hidden xl:block">{link.label}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Menu;
