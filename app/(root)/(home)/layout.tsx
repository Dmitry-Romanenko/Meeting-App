import Navbar from '@/components/Navbar';
import { Sidebar } from '@/components/Sidebar';
import { ReactNode } from 'react';

const HomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Navbar />
      <div className="mt-[72px]">
        <Sidebar />
        <div className="flex ml-[264px] p-8">{children}</div>
      </div>
    </div>
  );
};

export default HomeLayout;
