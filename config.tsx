import { usePathname } from 'next/navigation';

import { Bell, Home, Settings, User, ChartNoAxesCombinedIcon } from 'lucide-react';

export const NavItems = () => {
  const pathname = usePathname();

  function isNavItemActive(pathname: string, nav: string) {
    return pathname.includes(nav);
  }

  return [
    {
      name: 'Home',
      href: '/dashboard',
      icon: <Home size={20} />,
      active: pathname === '/dashboard',
      position: 'top',
    },    
    {
      name: 'Analytics',
      href: '/analytics',
      icon: <ChartNoAxesCombinedIcon size={20} />,
      active: isNavItemActive(pathname, '/analytics'),
      position: 'top',
    },
    {
      name: 'Profile',
      href: '/profile',
      icon: <User size={20} />,
      active: isNavItemActive(pathname, '/profile'),
      position: 'top',
    },
  ];
};