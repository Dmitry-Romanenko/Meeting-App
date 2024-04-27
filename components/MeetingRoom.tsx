'use client';

import { cn } from '@/lib/utils';
import {
  CallControls,
  CallParticipantsList,
  CallStatsButton,
  CallingState,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from '@stream-io/video-react-sdk';
import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LayoutList, Users } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import EndCallBtn from './EndCallBtn';
import { useRouter } from 'next/navigation';
import Loading from './Loading';

type CallLayoutTyoe = 'grid' | 'speaker-left' | 'speaker-right';

const MeetingRoom = () => {
  const { useCallCallingState } = useCallStateHooks();
  const searchParams = useSearchParams();
  const isPersonalRoom = searchParams.get('personal');
  const [layout, setLayout] = useState<CallLayoutTyoe>('speaker-left');
  const [showParticipians, setShowParticipians] = useState(true);
  const callingState = useCallCallingState();
  const router = useRouter();

  if (callingState !== CallingState.JOINED) {
    return <Loading />;
  }

  const CallLayout = () => {
    switch (layout) {
      case 'grid':
        return <PaginatedGridLayout />;
      case 'speaker-right':
        return <SpeakerLayout participantsBarPosition="left" />;
      case 'speaker-left':
        return <SpeakerLayout participantsBarPosition="right" />;
      default:
        return <SpeakerLayout participantsBarPosition="right" />;
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden pt-4">
      <div className="relative flex size-full items-center justify-center">
        <div className="flex size-full max-w-[1000px] items-center">
          <CallLayout />
          <div className={cn('ml-2 hidden h-[calc(100vh-86px)]', { block: showParticipians })}>
            <CallParticipantsList onClose={() => setShowParticipians(false)} />
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 flex w-full flex-wrap items-center justify-center gap-5">
        <CallControls onLeave={() => router.push('/')} />
        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
            <LayoutList size={20} className="text-white" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="border-dark-1 bg-dark-1 text-white">
            {['Grid', 'Speaker-Left', 'Speaker-Right'].map((item, idx) => {
              return (
                <div key={idx}>
                  <DropdownMenuItem
                    onClick={() => setLayout(item.toLocaleLowerCase() as CallLayoutTyoe)}
                    className="cursor-pointer"
                  >
                    {item}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </div>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
        <CallStatsButton />
        <button
          className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]"
          onClick={() => setShowParticipians((prev) => !prev)}
        >
          <Users className="text-white" size={20} />
        </button>
        {!isPersonalRoom && <EndCallBtn />}
      </div>
    </section>
  );
};

export default MeetingRoom;
