import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
import { toast } from './ui/use-toast';

interface MeetingCardProps {
  title: string;
  date: string;
  icon: string;
  isPreviousMeeting?: boolean;
  buttonText?: string;
  handleClick: () => void;
  link: string;
}

const MeetingCard = ({
  icon,
  title,
  date,
  isPreviousMeeting,
  handleClick,
  link,
  buttonText,
}: MeetingCardProps) => {
  return (
    <div className="rounded-2xl bg-dark-1 px-6 py-8">
      <Image src={icon} width={25} height={25} alt="upcoming" />

      <div className="mt-4">
        <h1 className="text-2xl font-bold text-white">{title}</h1>
        <span className="mt-2 block text-base text-blue-2">{date}</span>
      </div>

      <div className="mt-9 flex items-center justify-between">
        {/* <div className="relative flex items-center">
          <Avatar className="border-[3px] border-dark-2 bg-[#1E2757]">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback className="text-base font-semibold text-white">+9</AvatarFallback>
          </Avatar>

          <Avatar className="ml-[-15px] border-[3px] border-dark-2 bg-[#1E2757]">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback className="text-base font-semibold text-white">+9</AvatarFallback>
          </Avatar>

          <Avatar className="ml-[-15px] border-[3px] border-dark-2 bg-[#1E2757]">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback className="text-base font-semibold text-white">+9</AvatarFallback>
          </Avatar>

          <Avatar className="ml-[-15px] border-[3px] border-dark-2 bg-[#1E2757]">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback className="text-base font-semibold text-white">+9</AvatarFallback>
          </Avatar>

          <Avatar className="ml-[-15px] border-[3px] border-dark-2 bg-[#1E2757]">
            <AvatarFallback className="text-base font-semibold text-white">+9</AvatarFallback>
          </Avatar>
        </div> */}

        {!isPreviousMeeting && (
          <div className="flex items-center gap-2">
            <button
              onClick={handleClick}
              className="rounded-md bg-blue-1 px-[20px] py-[9px] font-semibold text-white"
            >
              {buttonText}
            </button>
            <button
              onClick={() => {
                navigator.clipboard.writeText(link);
                toast({
                  title: 'Link Copied',
                });
              }}
              className="flex items-center gap-1 rounded-md bg-dark-2 px-[20px] py-[13px] font-semibold text-blue-3"
            >
              <Image src={'/icons/copy.svg'} width={20} height={13} alt="share" />
              Copy Invitation
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MeetingCard;
