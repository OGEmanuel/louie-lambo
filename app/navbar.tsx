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
import { isInstalled, getPublicKey, signMessage } from '@gemwallet/api';
import sdk from '@crossmarkio/sdk';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import FirstLedger from './components/icons/first-ledger';
import Xaman from './components/icons/xaman';
import Atomic from './components/icons/atomic';
import Crossmark from './components/icons/crossmark';
import Exodus from './components/icons/exodus';
import Gatehub from './components/icons/gatehub';
import Bitfrost from './components/icons/bitfrost';
import Edge from './components/icons/edge';

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

  const handleConnectGem = () => {
    isInstalled().then(response => {
      if (response.result.isInstalled) {
        getPublicKey().then(response => {
          const pubkey = response.result?.publicKey;
          fetch(
            `/api/auth/gem/nonce?pubkey=${pubkey}&address=${response.result?.address}`,
          )
            .then(response => response.json())
            .then(data => {
              const nonceToken = data.token;
              const opts = {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${nonceToken}`,
                },
              };
              signMessage(nonceToken).then(response => {
                const signedMessage = response.result?.signedMessage;
                if (signedMessage !== undefined) {
                  fetch(
                    `/api/auth/gem/checksign?signature=${signedMessage}`,
                    opts,
                  )
                    .then(response => response.json())
                    .then(data => {
                      const { token, address } = data;
                      if (token === undefined) {
                        console.log('error');
                        return;
                      }
                      appContext.setWalletAddress(address);
                      setCookie('walley', token, { path: '/' });
                    });
                }
              });
            });
        });
      }
    });
  };

  const handleConnectCrossmark = async () => {
    //sign in first, then generate nonce
    const hashUrl = '/api/auth/crossmark/hash';
    const hashR = await fetch(hashUrl);
    const hashJson = await hashR.json();
    const hash = hashJson.hash;
    const id = await sdk.methods.signInAndWait(hash);
    console.log(id);
    const address = id.response.data.address;
    const pubkey = id.response.data.publicKey;
    const signature = id.response.data.signature;
    const checkSign = await fetch(
      `/api/auth/crossmark/checkSign?signature=${signature}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${hash}`,
        },
        body: JSON.stringify({
          pubkey: pubkey,
          address: address,
        }),
      },
    );

    const checkSignJson = await checkSign.json();
    if (checkSignJson.hasOwnProperty('token')) {
      await appContext.loginUser(checkSignJson.xrpAddress, 'crossmark');
      appContext.setWalletAddress(checkSignJson.xrpAddress);
      setCookie('walley', checkSignJson.token, { path: '/' });
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
          {appContext.walletAddress ? (
            <>
              <Button>{truncateXrpAddress(appContext.walletAddress)}</Button>
            </>
          ) : (
            <>
              {' '}
              {/* <Button onClick={() => getQrCode()}>Connect Wallet</Button> */}
              <WalletDialog />
              {/* <Button onClick={() => handleConnectCrossmark()} className="">
                Crossmark
              </Button> */}
              <Button onClick={() => handleConnectGem()} className="hidden">
                Gem wallet
              </Button>
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

const WALLET_LIST = [
  { name: 'First ledger', icon: <FirstLedger /> },
  { name: 'Xaman wallet', icon: <Xaman /> },
  { name: 'Atomic wallet', icon: <Atomic /> },
  { name: 'Crossmark', icon: <Crossmark /> },
  { name: 'Exodus wallet', icon: <Exodus /> },
  { name: 'Gatehub', icon: <Gatehub /> },
  { name: 'Bitfrost', icon: <Bitfrost /> },
  { name: 'Edge wallet', icon: <Edge /> },
];

const WalletDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Connect Wallet</Button>
      </DialogTrigger>
      <DialogContent className="flex w-full flex-col gap-8 rounded-3xl px-6 pt-6 max-sm:h-[38.5rem] max-sm:w-4/5 sm:max-w-[47.5rem] sm:gap-[3.5rem] sm:rounded-[2.5rem] sm:px-[2.69rem] sm:pt-8 [&>button]:right-[2.69rem] [&>button]:top-6 sm:[&>button]:top-7 [&>button_svg]:size-6 sm:[&>button_svg]:size-8">
        <DialogHeader className="max-sm:text-left">
          <DialogTitle className="text-xl leading-[1.38rem] sm:text-[1.75rem]">
            Select Wallet
          </DialogTitle>
          <DialogDescription className="sr-only">
            Select your wallet to connect to the app.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-3 overflow-auto rounded-[1.25rem] bg-[var(--color-off-white)] p-3 dark:bg-[var(--color-bg)] max-sm:h-full max-sm:max-h-[32rem] sm:grid-cols-2 sm:gap-7 sm:rounded-[2rem] sm:p-5">
          {WALLET_LIST.map(item => (
            <button
              key={item.name}
              className="flex items-center gap-5 rounded-[1.25rem] border border-[var(--color-stroke)] bg-[#FFFFFFF9] p-[1.13rem] dark:bg-[var(--color-lambo-black)] sm:p-7"
            >
              <div className="rounded-xl border p-2 dark:border-[var(--color-stroke)]">
                {item.icon}
              </div>
              <p className="text-lg text-[#505050] dark:text-white sm:text-2xl sm:leading-[1.38rem]">
                {item.name}
              </p>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
