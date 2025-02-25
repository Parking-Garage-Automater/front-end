'use client';

import React, { useState } from 'react';

import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { NavItems } from '@/config';
import { Menu } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { removeUserCookie } from '@/components/cookies';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  const navItems = NavItems();
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state: RootState) => state.user);

  const removeCookie = () => {
    removeUserCookie();
    router.push('/login');
  }

  return (
    <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6 justify-between">
      <Link
        href="/"
        className="flex items-center gap-2 text-lg font-semibold md:text-base"
        prefetch={false}
      >
        <span>Parking Automater 🚗</span>
      </Link>
      <div>
        Hi! <span>👋</span> { user.user?.username }
      </div>

      <div className="ml-4 flex items-center gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="overflow-hidden rounded-full"
            >
              <Avatar>
                <AvatarImage
                  src={user.user?.profileURL}
                  alt="User"
                />
                <AvatarFallback>PA</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={removeCookie}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <button onClick={() => setIsOpen(true)} className="block sm:hidden">
          <Menu size={24} />
        </button>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetContent side="right" className='block md:hidden'>
            <div className="pt-4  overflow-y-auto h-fit w-full flex flex-col gap-1">
              {navItems.map((navItem, idx) => (
                <Link
                  key={idx}
                  href={navItem.href}
                  onClick={() => setIsOpen(false)}
                  className={`h-full relative flex items-center whitespace-nowrap rounded-md ${
                    navItem.active
                      ? 'font-base text-sm bg-neutral-200 shadow-sm text-neutral-700 dark:bg-neutral-800 dark:text-white'
                      : 'hover:bg-neutral-200  hover:text-neutral-700 text-neutral-500 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white'
                  }`}
                >
                  <div className="relative font-base text-sm py-1.5 px-2 flex flex-row items-center space-x-2 rounded-md duration-100">
                    {navItem.icon}
                    <span>{navItem.name}</span>
                  </div>
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}