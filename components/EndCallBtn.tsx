import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import React from 'react';

const EndCallBtn = () => {
  const call = useCall();
  const router = useRouter();
  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();
  const isMeetingOwner =
    localParticipant &&
    call?.state.createdBy &&
    localParticipant.userId === call.state.createdBy.id;

  if (!isMeetingOwner) return null;

  return (
    <button
      className="rounded-lg bg-red-500 px-2 py-2 text-white"
      onClick={async () => {
        await call.endCall();
        router.push('/');
      }}
    >
      End call for everyone
    </button>
  );
};

export default EndCallBtn;
