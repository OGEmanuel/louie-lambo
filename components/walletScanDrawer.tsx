import React, { SetStateAction } from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from './ui/drawer';
import { Button } from './ui/button';
import Image from 'next/image';
import { Skeleton } from './ui/skeleton';

interface WalletScanDrawerI {
  qrcode: string;
  drawerOpen: boolean;
  jumpLink: string;
  setDrawerOpen: React.Dispatch<SetStateAction<boolean>>;
}

const WalletScanDrawer: React.FC<WalletScanDrawerI> = ({
  drawerOpen,
  qrcode,
  jumpLink,
  setDrawerOpen,
}) => {
  return (
    <>
      {' '}
      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
        <DrawerContent className="bg-white p-4">
          <DrawerHeader className="flex flex-col items-center">
            <DrawerTitle>Scann this qr code to sign in with xaman!</DrawerTitle>
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
  );
};

export default WalletScanDrawer;
