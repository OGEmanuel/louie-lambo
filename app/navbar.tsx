import { Button } from '@/components/ui/button';
import LamboLogo from './components/icons/lambo-logo';
import LamboLogoSmall from './components/icons/lambo-logo-mobile';
import { MobileSidenav } from './sidenav';

const Navbar = () => {
  return (
    <nav className="max-2xl:px-[120px] max-lg:px-6">
      <div className="flex items-center justify-between rounded-[18px] bg-[var(--color-black)] py-[9px] pl-[14px] pr-[9px] md:rounded-[30px] md:px-[33px] md:py-[19px]">
        <LamboLogo className="hidden md:block" />
        <LamboLogoSmall className="md:hidden" />
        <div className="flex items-center gap-[25px]">
          <Button>Connect Wallet</Button>
          <MobileSidenav />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
