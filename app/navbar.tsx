'use client';

import { Button } from '@/components/ui/button';
import LamboLogo from './components/icons/lambo-logo';
import LamboLogoSmall from './components/icons/lambo-logo-mobile';
import { MobileSidenav } from './sidenav';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { useCookies } from 'react-cookie';
import { truncateXrpAddress } from '@/lib/utils';
import { AppContext } from '@/context/AppContext';
import WalletScanDrawer from '@/components/walletScanDrawer';

const Navbar = () => {
  const [qrcode, setQrcode] = useState<string>('');
  const [jumpLink, setJumpLink] = useState<string>('');
  const [, setCookie] = useCookies(['walley']);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const appContext = useContext(AppContext);

  const getQrCode = async () => {
    setDrawerOpen(open => !open);
    const payload = await fetch('/api/auth/xumm/createPayload');
    const data = await payload.json();

    setQrcode(data.payload.refs.qr_png);
    setJumpLink(data.payload.next.always);

    if (appContext.isMobile) {
      window.open(data.payload.next.always, '_blank');
    }

    const ws = new WebSocket(data.payload.refs.websocket_status);

    ws.onmessage = async e => {
      const responseObj = JSON.parse(e.data);
      if (responseObj.signed !== null && responseObj.signed !== undefined) {
        const payload = await fetch(
          `/api/auth/xumm/getPayload?payloadId=${responseObj.payload_uuidv4}`,
        );
        const payloadJson = await payload.json();
        const hex = payloadJson.payload.response.hex;
        const checkSign = await fetch(`/api/auth/xumm/checkSign?hex=${hex}`);
        const checkSignJson = await checkSign.json();
        await appContext.loginUser(checkSignJson.xrpAddress, 'xaman');
        appContext.setWalletAddress(checkSignJson.xrpAddress);
        setCookie('walley', checkSignJson.token, { path: '/' });
        setDrawerOpen(false);
      }
    };
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
          {appContext.walletAddress ? (
            <>
              <Button>{truncateXrpAddress(appContext.walletAddress)}</Button>
            </>
          ) : (
            <>
              {' '}
              <Button onClick={() => getQrCode()}>Connect Wallet</Button>
              <WalletScanDrawer
                drawerOpen={drawerOpen}
                jumpLink={jumpLink}
                qrcode={qrcode}
                setDrawerOpen={setDrawerOpen}
              />
            </>
          )}

          <MobileSidenav />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
