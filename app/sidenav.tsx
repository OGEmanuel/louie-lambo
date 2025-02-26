'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ComponentProps } from 'react';

const Sidenav = () => {
  const pathname = usePathname();

  return (
    <aside>
      <ul className="relative flex flex-col gap-3 rounded-[20px] border border-[var(--color-lambo-green)] p-6 text-[18px] font-semibold leading-[23.44px] text-[var(--color-black)]">
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
