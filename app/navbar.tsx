import { Button } from '@/components/ui/button';
import LamboLogo from './components/icons/lambo-logo';
import LamboLogoSmall from './components/icons/lambo-logo-mobile';
import { MobileSidenav } from './sidenav';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="max-2xl:px-[120px] max-lg:px-6">
      <div className="flex items-center justify-between rounded-[18px] bg-[var(--color-black)] py-[9px] pl-[14px] pr-[9px] dark:bg-[#42434B] md:rounded-[30px] md:px-[33px] md:py-[19px]">
        <Link href="/">
          <LamboLogo className="hidden md:block" />
        </Link>
        <Link href="/">
          <LamboLogoSmall className="md:hidden" />
        </Link>
        <div className="flex items-center gap-[25px]">
          <Button>Connect Wallet</Button>
          <MobileSidenav />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
