'use client';
import { useGetCallById } from '@/app/hooks/useGetCallById';
import { useToast } from '@/components/ui/use-toast';
import { useUser } from '@clerk/nextjs';
import { useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import React from 'react';
import Image from 'next/image';

const Table = ({ title, description }: { title: string; description: string }) => {
  return (
    <div className="flex flex-col items-start gap-2 break-all xl:flex-row">
      <h1 className="text-xl font-medium text-blue-3">{title}:</h1>
      <h1 className="text-xl font-semibold text-white">{description}</h1>
    </div>
  );
};

const PersonalRoom = () => {
  const { user } = useUser();
  const meetingId = user?.id;
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?personal=true`;
  const { toast } = useToast();
  const { call } = useGetCallById(meetingId!);
  const client = useStreamVideoClient();
  const router = useRouter();

  const startRoom = async () => {
    if (!client || !user) return;

    if (!call) {
      const newCall = client.call('default', meetingId!);
      await newCall.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
        },
      });
    }

    router.push(`meeting/${meetingId}?personal=true`);
  };

  return (
    <div>
      <div className="flex flex-col gap-8">
        <Table description={`${user?.username}'s Meeting Room`} title="Topic" />
        <Table description={meetingId!} title="Meeting Id" />
        <Table description={meetingLink} title="Invite Link" />
      </div>

      <div className="mt-5 flex items-center gap-2">
        <button
          onClick={startRoom}
          className="rounded-md bg-blue-1 px-[20px] py-[10px] font-semibold text-white"
        >
          Start Meeting
        </button>
        <button
          onClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({ title: 'Link cpoied' });
          }}
          className="flex items-center gap-1 rounded-md bg-dark-1 px-[20px] py-[9px] font-semibold text-blue-3"
        >
          <Image src={'/icons/copy.svg'} width={20} height={13} alt="share" />
          Copy Invitation
        </button>
      </div>
    </div>
  );
};

export default PersonalRoom;
