'use client';

import { Button } from '@/components/ui/button';
import LamboLogo from './components/icons/lambo-logo';
import LamboLogoSmall from './components/icons/lambo-logo-mobile';
import { MobileSidenav } from './sidenav';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { useCookies } from 'react-cookie';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import { truncateXrpAddress } from '@/lib/utils';
import { AppContext } from '@/context/AppContext';

const Navbar = () => {
  const [qrcode, setQrcode] = useState<string>('');
  const [jumpLink, setJumpLink] = useState<string>('');
  const [, setCookie] = useCookies(['walley']);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const appContext = useContext(AppContext);

  const getQrCode = async () => {
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
              <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
                <DrawerTrigger className="" onClick={getQrCode}>
                  <Button>Connect Wallet</Button>
                </DrawerTrigger>
                <DrawerContent className="bg-white p-4">
                  <DrawerHeader className="flex flex-col items-center">
                    <DrawerTitle>
                      Scann this qr code to sign in with xaman!
                    </DrawerTitle>
                  </DrawerHeader>
                  <DrawerDescription className="flex flex-col items-center">
                    {qrcode !== '' ? (
                      <Image
                        src={qrcode}
                        alt="xaman qr code"
                        width={200}
                        height={200}
                      />
                    ) : (
                      <div className="flex flex-col space-y-3">
                        <Skeleton className="h-[250px] w-[250px] rounded-xl bg-gray-300" />
                      </div>
                    )}
                    {jumpLink !== '' && (
                      <Button
                        className="mt-4"
                        onClick={() => {
                          window.open(jumpLink, '_blank');
                        }}
                      >
                        Open in Xaman
                      </Button>
                    )}
                  </DrawerDescription>
                </DrawerContent>
              </Drawer>
            </>
          )}

          <MobileSidenav />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
