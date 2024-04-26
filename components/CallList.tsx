//@ts-nocheck
'use client';

import { useGetCalls } from '@/app/hooks/useGetCalls';
import { Call, CallRecording } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import MeetingCard from './MeetingCard';
import { useToast } from './ui/use-toast';
import Loading from './Loading';

interface CallListProps {
  type: 'ended' | 'upcoming' | 'recordings';
}

const CallList = ({ type }: CallListProps) => {
  const { endedCalls, upcomingCalls, callRecordings, isLoading } = useGetCalls();
  const router = useRouter();
  const [recordings, setRecordings] = useState<CallRecording[]>([]);
  const { toast } = useToast();

  const getCalls = () => {
    switch (type) {
      case 'ended':
        return endedCalls;
      case 'recordings':
        return recordings;
      case 'upcoming':
        return upcomingCalls;
      default:
        return [];
    }
  };

  const getNoCallsMessage = () => {
    switch (type) {
      case 'ended':
        return 'No prev calls';
      case 'recordings':
        return 'No recordings';
      case 'upcoming':
        return 'No upcoming calls';
      default:
        return '';
    }
  };

  useEffect(() => {
    const fetchRecordings = async () => {
      try {
        const callData = await Promise.all(
          callRecordings?.map((meeting) => meeting.queryRecordings()) ?? []
        );

        const recordings = callData
          .filter((call) => call.recordings.length > 0)
          .flatMap((call) => call.recordings);

        setRecordings(recordings);
      } catch (e) {
        toast({ title: 'Try again later' });
      }
    };

    if (type === 'recordings') {
      fetchRecordings();
    }
  }, [type, callRecordings]);

  const calls = getCalls();
  const noCallsMessage = getNoCallsMessage();
  if (isLoading) return <Loading />;
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[repeat(2,_auto)]">
      {calls && calls.length > 0 ? (
        calls.map((meeting: Call | CallRecording) => {
          const date = meeting?.start_time?.toLocaleString();
          const link =
            type === 'recordings'
              ? meeting.url
              : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meeting.id}`;
          return (
            <MeetingCard
              key={(meeting as Call).id}
              icon={
                type === 'ended'
                  ? '/icons/previous.svg'
                  : type === 'upcoming'
                    ? '/icons/upcoming.svg'
                    : '/icons/recordings.svg'
              }
              title={
                (meeting as Call).state?.custom?.description?.substring(0, 26) || 'No description'
              }
              date={(meeting as Call).state?.startsAt?.toLocaleString() || date}
              isPreviousMeeting={type === 'ended'}
              handleClick={
                type === 'recordings'
                  ? () => router.push(`${meeting.url}`)
                  : () => router.push(`/meeting/${meeting.id}`)
              }
              link={link}
              buttonText={type === 'recordings' ? 'Play' : 'Start'}
            />
          );
        })
      ) : (
        <h1 className="text-2xl font-bold text-white">{noCallsMessage}</h1>
      )}
    </div>
  );
};

export default CallList;
