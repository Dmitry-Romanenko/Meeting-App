import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  className?: string;
  children?: ReactNode;
  handleClick?: () => void;
  buttonText?: string;
  image?: string;
  buttonIcon?: string;
}

const Modal = ({
  isOpen,
  onClose,
  title,
  buttonIcon,
  buttonText,
  children,
  className,
  handleClick,
  image,
}: ModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[520px] border-none bg-dark-1 py-9 text-white">
        {image && <Image src={image} width={72} height={72} alt="image" />}
        <h2 className={cn('text-center text-3xl font-bold text-white', className)}>{title}</h2>

        {children}
        <button onClick={handleClick} className="mt-3 block rounded-md bg-blue-1 py-2 text-white">
          {buttonIcon && <Image src={buttonIcon} alt="icon" width={12} height={13} />}
          {buttonText || 'Schedule Meeting'}
        </button>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
