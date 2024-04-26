import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';

const HomeCard = ({
  title,
  subtitle,
  bgColor,
  icon,
  onClick,
}: {
  title: string;
  subtitle: string;
  bgColor: string;
  icon: string;
  onClick?: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(bgColor, 'flex flex-col justify-between rounded-2xl px-5 py-6')}
    >
      <div className="glass flex h-[56px] w-[56px] items-center justify-center">
        <Image alt="" src={icon} width={36} height={36} />
      </div>
      <div className="flex flex-col items-start gap-1">
        <span className="text-2xl font-bold text-white">{title}</span>
        <span className="text-lg font-bold text-white">{subtitle}</span>
      </div>
    </button>
  );
};

export default HomeCard;
