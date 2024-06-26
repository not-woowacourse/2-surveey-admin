import { type Metadata } from 'next';
import localFont from 'next/font/local';

import { type PropsWithChildren } from 'react';

import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import QueryProvider from '@/providers/query-provider';
import RecoilRootProvider from '@/providers/recoil-root-provider';

import './globals.css';

const wantedSansVariable = localFont({
  src: '../public/fonts/WantedSansVariable.woff2',
  display: 'swap',
});

const metadata: Metadata = {
  title: 'Surveey 어드민',
  description: 'Surveey 어드민',
};

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="ko-KR">
      <body className={cn(wantedSansVariable.className, 'bg-neutral-100')}>
        <RecoilRootProvider>
          <QueryProvider>
            <TooltipProvider>
              {children}
              <Toaster richColors />
            </TooltipProvider>
          </QueryProvider>
        </RecoilRootProvider>
      </body>
    </html>
  );
};

export { metadata };
export default RootLayout;
