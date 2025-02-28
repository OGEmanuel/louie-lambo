import { Button } from '@/components/ui/button';
import LamboLogo from './components/icons/lambo-logo';
import LamboLogoSmall from './components/icons/lambo-logo-mobile';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between rounded-[18px] bg-[var(--color-black)] py-[9px] pl-[14px] pr-[9px] md:rounded-[30px] md:px-[33px] md:py-[19px]">
      <LamboLogo className="hidden md:block" />
      <LamboLogoSmall className="md:hidden" />
      <Button>Connect Wallet</Button>
    </nav>
  );
};

export default Navbar;
