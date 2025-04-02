'use client';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { MenuIcon, MoonIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ComponentProps, useContext, useEffect, useState } from 'react';
import LamboLogoSmall from './components/icons/lambo-logo-mobile';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { DynaPuff } from 'next/font/google';
import Active from './components/icons/active';
import Image from 'next/image';
import Tier1 from '@/public/images/tier1.jpg';
import Tier2 from '@/public/images/tier2.jpg';
import Tier3 from '@/public/images/tier3.jpg';
import Tier4 from '@/public/images/tier4.jpg';
import Tier5 from '@/public/images/tier5.jpg';
import Tier6 from '@/public/images/tier6.jpg';
import { AppContext } from '@/context/AppContext';

const dynaPuff = DynaPuff({
  variable: '--font-dyna-puff',
  subsets: ['latin'],
});

const Sidenav = () => {
  const pathname = usePathname();
  const appContext = useContext(AppContext);
  return (
    <aside className="flex flex-col gap-8 max-2xl:pl-[120px] max-lg:hidden">
      <ul className="relative flex flex-col gap-3 rounded-[20px] border border-[var(--color-lambo-green)] bg-white p-6 text-[18px] font-semibold leading-[23.44px] dark:bg-[var(--color-lambo-black)] xl:[&>li]:w-[238px]">
        <li>
          <NavLink href="/">
            <span
              className={cn(
                'absolute left-0 translate-y-full opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100',
                pathname === '/' && 'translate-x-44 translate-y-0 opacity-100',
              )}
            >
              <Active />
            </span>
            Overview
          </NavLink>
        </li>
        <li>
          <NavLink href="/start-your-journey">
            <span
              className={cn(
                'absolute left-0 translate-y-full opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100',
                pathname === '/start-your-journey' &&
                  'translate-x-44 translate-y-0 opacity-100',
              )}
            >
              <Active />
            </span>
            Fuel Up
          </NavLink>
        </li>
        <li>
          <NavLink href="/invest">
            <span
              className={cn(
                'absolute left-0 translate-y-full opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100',
                pathname === '/invest' &&
                  'translate-x-44 translate-y-0 opacity-100',
              )}
            >
              <Active />
            </span>
            {"Let's Ride"}
          </NavLink>
        </li>
        <li>
          <NavLink href="/calculator">
            <span
              className={cn(
                'absolute left-0 translate-y-full opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100',
                pathname === '/calculator' &&
                  'translate-x-44 translate-y-0 opacity-100',
              )}
            >
              <Active />
            </span>
            APY Calculator
          </NavLink>
        </li>
      </ul>
      <ThemeSwitch />
      <div className="relative size-[283px] overflow-hidden rounded-2xl">
        <Image
          src={
            appContext.userTier.name === 'T1 - LAMBORGHINI AVENTADOR 🚨'
              ? Tier1
              : appContext.userTier.name === 'T2 - LAMBORGHINI REVENTON 🚨'
                ? Tier2
                : appContext.userTier.name === 'T3 - LAMBORGHINI CENTENARIO 🚨'
                  ? Tier3
                  : appContext.userTier.name === 'T4 - LAMBORGHINI EGOISTA 🚨'
                    ? Tier4
                    : appContext.userTier.name === 'T5 - LAMBORGHINI SIAN 🚨'
                      ? Tier5
                      : appContext.userTier.name ===
                          'T6 - LAMBORGHINI VENENO 🚨'
                        ? Tier6
                        : Tier1
          }
          alt="side-image"
          fill
        />
      </div>
    </aside>
  );
};

export default Sidenav;

export const MobileSidenav = () => {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <MenuIcon className="hidden h-7 w-7 text-white max-lg:block" />
      </SheetTrigger>
      <SheetContent className="flex min-h-screen flex-col gap-8 overflow-auto px-0 [&>button]:top-8">
        <SheetHeader className="sr-only">
          <SheetTitle>Side Navigation</SheetTitle>
          <SheetDescription>
            Navigate to the different sections of the website.
          </SheetDescription>
        </SheetHeader>
        <div className="mx-8 flex items-center justify-between rounded-[18px] bg-[var(--color-black)] py-[9px] pl-[14px] pr-[9px]">
          <LamboLogoSmall />
        </div>
        <Separator />
        <ul className="relative flex flex-col gap-3 rounded-[20px] p-6 text-[18px] font-semibold leading-[23.44px] xl:[&>li]:w-[238px]">
          <li onClick={() => setOpen(false)}>
            <NavLink href="/">Overview</NavLink>
          </li>
          <li onClick={() => setOpen(false)}>
            <NavLink href="/start-your-journey">Your $LAMBO Awaits</NavLink>
          </li>
          <li onClick={() => setOpen(false)}>
            <NavLink href="/invest">{"Let's Ride"}</NavLink>
          </li>
          <li onClick={() => setOpen(false)}>
            <NavLink href="/calculator">APY Calculator</NavLink>
          </li>
        </ul>
        <div className="px-6">
          <ThemeSwitch />
        </div>
      </SheetContent>
    </Sheet>
  );
};

const ThemeSwitch = () => {
  // Initialize with a default value
  const [isDark, setIsDark] = useState(false);

  // Check the theme after the component mounts (client-side only)
  useEffect(() => {
    const darkTheme =
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);

    setIsDark(darkTheme);
  }, []);

  // Sync the dark class with localStorage state
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);

    // Persist the preference
    localStorage.theme = newIsDark ? 'dark' : 'light';
  };

  return (
    <div
      className={`flex items-center justify-between rounded-[18px] border border-[var(--color-stroke)] bg-white p-6 dark:border-[#2B2B34] dark:bg-[var(--color-lambo-black)] ${dynaPuff.className}`}
    >
      <Label
        htmlFor="theme-switch"
        className="flex items-center gap-[6px] dark:text-[#8A8A8A]"
      >
        <MoonIcon className="h-[18px] w-[18px]" />
        {isDark ? 'Dark' : 'Light'} Mode
      </Label>
      <Switch
        checked={!isDark}
        onCheckedChange={toggleTheme}
        id="theme-switch"
      />
    </div>
  );
};

export const NavLink = (
  props: Omit<ComponentProps<typeof Link>, 'className'>,
) => {
  const pathname = usePathname();
  return (
    <Link
      {...props}
      className={cn(
        'group relative block overflow-hidden text-nowrap rounded-xl p-4 text-[var(--color-black)] transition-all hover:bg-[var(--color-black)] hover:text-[18px] hover:font-medium hover:text-[var(--color-lambo-green)] dark:text-[#8A8A8A] dark:hover:bg-[#42434B] dark:hover:text-[var(--color-lambo-green)]',
        pathname === props.href &&
          'bg-[var(--color-black)] text-[18px] font-medium text-[var(--color-lambo-green)] dark:bg-[#42434B] dark:text-[var(--color-lambo-green)]',
      )}
    />
  );
};
