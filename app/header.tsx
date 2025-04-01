'use client';

import React, { useEffect, useState } from 'react';

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
import { deleteCookie } from "cookies-next";
import { useRouter } from 'next/navigation';
import { useAuth } from '@/authContext/authContext';
import { API_CONSTANTS } from '@/constants/ApiConstants';

export default function Header() {
  const router = useRouter();
  const navItems = NavItems();
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const [username, setUsername] = useState('')
  
  useEffect(() => {
        
        fetchData().then((value: any) => {
        })

  }, [])

  const fetchData = async () => {
    let licenseno: any;
    if (typeof window !== "undefined"){
      licenseno = window.localStorage.getItem('license') || '';
    }
    let url = API_CONSTANTS.GET_USER_DETAILS + licenseno;
    const res = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    let response = await res.json();
    if(response.status == 'success'){
        let userData = response.data;
        setUsername(userData?.username || '');

    } else {
        logout();
        if (typeof window !== "undefined"){
          window.localStorage.removeItem('license');
        }
        deleteCookie('Token');
        router.push('/login');
    }
  }

  const logoutAccount = () => {
    logout();
    if (typeof window !== "undefined"){
      window.localStorage.removeItem('license');
    }
    deleteCookie('Token');
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
        Hi! <span>👋</span> { username }
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
                  src={`https://ui-avatars.com/api/?name=` + username}
                  alt="User"
                />
                <AvatarFallback>PA</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={logoutAccount}>Logout</DropdownMenuItem>
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