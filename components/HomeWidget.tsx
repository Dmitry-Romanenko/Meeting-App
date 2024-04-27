'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { useGetCalls } from '@/app/hooks/useGetCalls';

const HomeWidget = () => {
  const { upcomingCalls } = useGetCalls();
  const [isUpcomingToday, setIsUpcomingToday] = useState<false | Date>();
  const [currentDate, setCurrentDate] = useState(new Date());

  const checkUpcoming = useCallback(() => {
    if (!upcomingCalls) return false;
    const todayMeetings = upcomingCalls
      .map((call) => call.state?.startsAt)
      .filter(
        (date) => date?.toISOString().split('T')[0] === currentDate.toISOString().split('T')[0]
      )
      .map((date) => date?.getTime());
    if (!todayMeetings.length) return false;
    const upcomingMinDate = new Date(Math.min(...(todayMeetings as number[])));
    return upcomingMinDate;
  }, [upcomingCalls]);

  useEffect(() => {
    const todayUpcoming = checkUpcoming();
    setIsUpcomingToday(todayUpcoming);
  }, [checkUpcoming]);

  useEffect(() => {
    const dateTimer = setInterval(function () {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(dateTimer);
  }, []);

  return (
    <div className="bg-home relative flex h-[260px] w-full flex-col justify-between rounded-3xl px-[10px] py-[36px] before:absolute before:left-0 before:top-0 before:z-[-1] before:block before:h-[100%] before:w-[100%] before:rounded-3xl before:bg-slate-900 before:opacity-[0.6] sm:h-[350px] sm:px-[44px]">
      <Image
        alt="laptop"
        src={'/images/hero-background.jpg'}
        fill
        className="absolute z-[-2] rounded-3xl object-cover"
      />

      {isUpcomingToday ? (
        <div className="glass flex max-w-[270px] items-center justify-center gap-2 py-2 text-sm text-blue-2 sm:w-[270px] sm:text-base">
          <div>Upcoming Meeting at:</div>
          <div>
            {new Intl.DateTimeFormat('en-US', {
              hour: '2-digit',
              minute: '2-digit',
            }).format(isUpcomingToday)}
          </div>
        </div>
      ) : (
        <div></div>
      )}

      <div className="flex flex-col gap-2">
        <span className="text-5xl font-extrabold text-white sm:text-7xl">
          {new Intl.DateTimeFormat('en-US', {
            hour: '2-digit',
            minute: '2-digit',
          }).format(currentDate)}
        </span>
        <span className="text-2xl font-medium text-blue-3">
          {new Intl.DateTimeFormat('en-US', {
            dateStyle: 'full',
          }).format(currentDate)}
        </span>
      </div>
    </div>
  );
};

export default HomeWidget;
