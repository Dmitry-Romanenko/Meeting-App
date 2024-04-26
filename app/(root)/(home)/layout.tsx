import Navbar from '@/components/Navbar';
import { Sidebar } from '@/components/Sidebar';
import { ReactNode } from 'react';

const HomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Navbar />
      <div className="mt-[72px]">
        <Sidebar />
        <div className="p-4 sm:ml-[70px] sm:p-8 xl:ml-[264px]">{children}</div>
      </div>
    </div>
  );
};

export default HomeLayout;
