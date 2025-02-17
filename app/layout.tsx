import type { Metadata } from 'next';
import { Inter } from 'next/font/google';


import '../styles/globals.css';

import SideNav from '@/components/side-nav';

import Header from './header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Parking Next App',
  description: 'Parking Assist next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>

          <Header />
          <div className="flex">
            <SideNav />
            <div className="w-full overflow-x-auto">
              <div className="sm:h-[calc(99vh-60px)] overflow-auto ">
                <div className="w-full flex justify-center mx-auto   overflow-auto h-[calc(100vh - 120px)] overflow-y-auto relative">
                  <div className="w-full">{children}</div>
                </div>
              </div>
            </div>
          </div>
      </body>
    </html>
  );
}