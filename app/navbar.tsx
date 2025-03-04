'use client';

import { Button } from '@/components/ui/button';
import LamboLogo from './components/icons/lambo-logo';
import LamboLogoSmall from './components/icons/lambo-logo-mobile';
import { MobileSidenav } from './sidenav';
import Link from 'next/link';
import { useState } from 'react';
import { XRPWalletConnect } from '@/utils/walletConnect';

const Navbar = () => {
  const [wallet, setWallet] = useState<XRPWalletConnect | null>(null);
  const [connected, setConnected] = useState(false);

  const connectWallet = () => {
    const walletInstance = new XRPWalletConnect();
    setWallet(walletInstance);
    setConnected(true);
  };

  const disconnectWallet = async () => {
    if (wallet) {
      await wallet.disconnect();
      setConnected(false);
    }
  };
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
          {connected ? (
            <button
              onClick={disconnectWallet}
              className="mt-4 rounded bg-red-500 px-4 py-2 text-white"
            >
              Disconnect Wallet
            </button>
          ) : (
            <button
              onClick={connectWallet}
              className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
            >
              Connect Wallet
            </button>
          )}
          <MobileSidenav />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
