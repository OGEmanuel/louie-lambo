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
import { MenuIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ComponentProps, useState } from 'react';
import LamboLogoSmall from './components/icons/lambo-logo-mobile';
import { Separator } from '@/components/ui/separator';

const Sidenav = () => {
  return (
    <aside className="max-2xl:pl-[120px] max-lg:hidden">
      <ul className="relative flex flex-col gap-3 rounded-[20px] border border-[var(--color-lambo-green)] p-6 text-[18px] font-semibold leading-[23.44px] text-[var(--color-black)] xl:[&>li]:w-[238px]">
        <li>
          <NavLink href="/">Overview</NavLink>
        </li>
        <li>
          <NavLink href="/stake">Stake</NavLink>
        </li>
        <li>
          <NavLink href="/miner">Miner</NavLink>
        </li>
        <li>
          <NavLink href="/portfolio">My Portfolio</NavLink>
        </li>
        <li>
          <NavLink href="/calculator">APY Calculator</NavLink>
        </li>
      </ul>
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
      <SheetContent className="px-0">
        <SheetHeader className="sr-only">
          <SheetTitle>Side Navigation</SheetTitle>
          <SheetDescription>
            Navigate to the different sections of the website.
          </SheetDescription>
        </SheetHeader>
        <div className="mx-8 mb-[37px] mt-[71px] flex items-center justify-between rounded-[18px] bg-[var(--color-black)] py-[9px] pl-[14px] pr-[9px]">
          <LamboLogoSmall />
        </div>
        <Separator />
        <ul className="relative mt-[37px] flex flex-col gap-3 rounded-[20px] p-6 text-[18px] font-semibold leading-[23.44px] text-[var(--color-black)] xl:[&>li]:w-[238px]">
          <li onClick={() => setOpen(false)}>
            <NavLink href="/">Overview</NavLink>
          </li>
          <li onClick={() => setOpen(false)}>
            <NavLink href="/stake">Stake</NavLink>
          </li>
          <li onClick={() => setOpen(false)}>
            <NavLink href="/miner">Miner</NavLink>
          </li>
          <li onClick={() => setOpen(false)}>
            <NavLink href="/portfolio">My Portfolio</NavLink>
          </li>
          <li onClick={() => setOpen(false)}>
            <NavLink href="/calculator">APY Calculator</NavLink>
          </li>
        </ul>
      </SheetContent>
    </Sheet>
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
        'block text-nowrap rounded-xl p-4 transition-all',
        pathname === props.href && 'bg-[var(--color-off-white)]',
      )}
    />
  );
};
