import React, { ReactNode } from 'react';
import { StreamProvider } from '../providers/StreamProvider';
import { Toaster } from '@/components/ui/toaster';

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <StreamProvider>
        {children} <Toaster />
      </StreamProvider>
    </main>
  );
};

export default RootLayout;
