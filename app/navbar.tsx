import { Button } from '@/components/ui/button';
import LamboLogo from './components/icons/lambo-logo';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between rounded-[30px] bg-[var(--color-black)] px-[33px] py-[19px]">
      <LamboLogo />
      <Button>Connect Wallet</Button>
    </nav>
  );
};

export default Navbar;
