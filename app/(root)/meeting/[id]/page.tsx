'use client';

import { useGetCallById } from '@/app/hooks/useGetCallById';
import MeetingRoom from '@/components/MeetingRoom';
import MeetingSetup from '@/components/MeetingSetup';
import { useUser } from '@clerk/nextjs';
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import React, { useState } from 'react';

const Meeting = ({ params: { id } }: { params: { id: string } }) => {
  const { user, isLoaded } = useUser();
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const { call, isCallLoading } = useGetCallById(id);

  if (!isLoaded || isCallLoading) return <h2>Loading</h2>;

  return (
    <main className="h-screen w-full">
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ? <MeetingSetup onClickJoin={setIsSetupComplete} /> : <MeetingRoom />}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default Meeting;
