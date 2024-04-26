'use client';

import React, { useState } from 'react';
import HomeCard from './HomeCard';
import Modal from './Modal';
import { useToast } from '@/components/ui/use-toast';
import { useUser } from '@clerk/nextjs';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { usePathname, useRouter } from 'next/navigation';
import { Textarea } from './ui/textarea';
import ReactDatePicker from 'react-datepicker';
import { Input } from './ui/input';

const HomeCards = () => {
  const { user } = useUser();
  const { toast } = useToast();
  const client = useStreamVideoClient();
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: '',
    link: '',
  });
  const [callDetails, setCallDetails] = useState<Call>();
  const [meetingState, setMeetingState] = useState<
    'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined
  >();
  const router = useRouter();
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;

  const createCall = async () => {
    if (!client || !user) return;

    try {
      const id = crypto.randomUUID();
      const call = client.call('default', id);
      if (!call) throw Error('error call');
      const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || 'Instant meeting';
      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });
      setCallDetails(call);
      if (!values.description) {
        router.push(`/meeting/${call.id}`);
      }
      toast({
        title: 'Meeting Created',
      });
    } catch (err) {
      toast({
        title: 'Error',
        description: 'meeting error',
      });
    }
  };

  return (
    <div className="mt-8 grid auto-rows-[260px] grid-cols-[minmax(260px,_auto)] grid-rows-[260px] gap-8 md:grid-cols-[repeat(auto-fit,_minmax(260px,_auto))] ">
      <HomeCard
        onClick={() => setMeetingState('isInstantMeeting')}
        title="New Meeting"
        subtitle="Setup a new recording"
        bgColor="gradient"
        icon="/icons/add-meeting.svg"
      />
      <HomeCard
        onClick={() => setMeetingState('isJoiningMeeting')}
        title="Join Meeting"
        subtitle="via invitation link"
        bgColor="gradient2"
        icon="/icons/join-meeting.svg"
      />
      <HomeCard
        onClick={() => setMeetingState('isScheduleMeeting')}
        title="Schedule Meeting"
        subtitle="Plan your meeting"
        bgColor="gradient3"
        icon="/icons/schedule.svg"
      />
      <HomeCard
        onClick={() => router.push('/recordings')}
        title="View Recordings"
        subtitle="Meeting recordings"
        bgColor="gradient4"
        icon="/icons/recordings.svg"
      />
      {!callDetails ? (
        <Modal
          title="Create Meeting"
          onClose={() => setMeetingState(undefined)}
          handleClick={createCall}
          isOpen={meetingState === 'isScheduleMeeting'}
        >
          <div className="flex flex-col gap-2.5">
            <label htmlFor="" className="text-normal text-base leading-[22px] text-blue-2">
              Add a description
            </label>
            <Textarea
              onChange={(e) => setValues({ ...values, description: e.target.value })}
              className="resize-none border-none bg-dark-2 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
          <div className="flex flex-col gap-2.5">
            <label htmlFor="" className="text-normal text-base leading-[22px] text-blue-2">
              Select date and time
            </label>
            <ReactDatePicker
              selected={values.dateTime}
              showTimeSelect
              timeFormat="HH:mm"
              timeCaption="time"
              timeIntervals={15}
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full rounded bg-dark-2 p-2 focus:outline-none"
              onChange={(date) => setValues({ ...values, dateTime: date! })}
            />
          </div>
        </Modal>
      ) : (
        <Modal
          title="Meeting Created"
          className="text-center"
          buttonText="Copy Meeting Link"
          onClose={() => setMeetingState(undefined)}
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({ title: 'Link cpoied' });
          }}
          image="/icons/checked.svg"
          buttonIcon="/icons/copy.svg"
          isOpen={meetingState === 'isScheduleMeeting'}
        />
      )}
      <Modal
        title="Start an Instant Meeting"
        className="text-center"
        buttonText="Start Meeting"
        onClose={() => setMeetingState(undefined)}
        handleClick={createCall}
        isOpen={meetingState === 'isInstantMeeting'}
      />
      <Modal
        title="Type the link here"
        className="text-center"
        buttonText="Join Meeting"
        onClose={() => setMeetingState(undefined)}
        handleClick={() => router.push(values.link)}
        isOpen={meetingState === 'isJoiningMeeting'}
      >
        <Input
          className="w-full rounded border-none bg-dark-2 p-7 focus:outline-none"
          onChange={(e) => setValues({ ...values, link: e.target.value })}
          placeholder="Meering link"
        />
      </Modal>
    </div>
  );
};

export default HomeCards;
