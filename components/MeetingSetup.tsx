'use client';

import { DeviceSettings, VideoPreview, useCall } from '@stream-io/video-react-sdk';
import React, { useEffect, useState } from 'react';

const MeetingSetup = ({ onClickJoin }: { onClickJoin: (value: boolean) => void }) => {
  const [isAllow, setIsAllow] = useState(false);
  const call = useCall();

  if (!call) {
    throw new Error('err');
  }

  useEffect(() => {
    if (isAllow) {
      call?.camera.disable();
      call?.microphone.disable();
    } else {
      call?.camera.enable();
      call?.microphone.enable();
    }
  }, [isAllow, call?.camera, call?.microphone]);

  return (
    <div className="gap-c flex h-screen w-full flex-col items-center justify-center text-white">
      <h1 className="mb-4 text-4xl font-bold">Setup</h1>
      <VideoPreview />
      <div className="mt-3 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 font-semibold text-white">
            <input
              type="checkbox"
              checked={isAllow}
              onChange={(e) => setIsAllow(e.target.checked)}
            />
            <span>Join with mic and camera off</span>
          </label>
          <DeviceSettings />
        </div>
        <button
          onClick={() => {
            call.join();
            onClickJoin(true);
          }}
          className="rounded-md bg-blue-300 px-[20px] py-[9px] font-semibold text-white"
        >
          Join Meeting
        </button>
      </div>
    </div>
  );
};

export default MeetingSetup;
