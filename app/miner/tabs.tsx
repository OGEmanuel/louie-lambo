'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Deposit from './deposit';
import Withdraw from './withdraw';
import { Button } from '@/components/ui/button';
import { Referral } from '../referral';
import { Separator } from '@/components/ui/separator';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import MinerSuccess from '../components/icons/miner-success';
import Apy from '../components/icons/apy';
import MinerSuccessDark from '../components/icons/miner-success-dark';
import { AppContext } from '@/context/AppContext';
import { calculateStakeRewards } from '@/lib/utils';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ButtonLoading } from '@/components/ui/button-loading';

const BASE_URL = 'https://lambo-miner-backend.onrender.com/api';

const MinerTabs = () => {
  const appContext = useContext(AppContext);
  return (
    <Tabs
      defaultValue={appContext.activeMine ? 'withdraw' : 'deposit'}
      className=""
    >
      <TabsList>
        <TabsTrigger value="deposit">Deposit</TabsTrigger>
        {appContext.activeMine && (
          <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
        )}
      </TabsList>
      <TabsContent value="deposit" className="w-full">
        <Deposit />
      </TabsContent>
      {appContext.activeMine && (
        <TabsContent value="withdraw" className="w-full">
          <Withdraw />
        </TabsContent>
      )}
    </Tabs>
  );
};

export default MinerTabs;

export const Summary = () => {
  const appContext = useContext(AppContext);
  const [open, setOpen] = useState(false);

  const { mutate, isPending } = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: async (data: any) => {
      return axios.post(`${BASE_URL}/mine/claimRewards`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    },
    onSuccess: () => {
      toast.success(appContext.success, {
        position: 'bottom-right',
      });
      setOpen(false);
    },
    onError: () => {
      toast.error(appContext.error, {
        position: 'bottom-right',
      });
    },
  });

  const { mutate: mutateReMine, isPending: isPendingReMine } = useMutation({
    mutationFn: async (data: string) => {
      return axios.post(`${BASE_URL}/mine/reMine`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    },
    onSuccess: () => {
      toast.success(appContext.success, {
        position: 'bottom-right',
      });
      setOpen(false);
    },
    onError: () => {
      toast.error(appContext.error, {
        position: 'bottom-right',
      });
    },
  });

  return (
    <div className="flex w-[36.4705882353%] flex-col gap-[76px] bg-white p-12 dark:bg-[var(--color-lambo-black)] max-xl:w-full max-xl:gap-12 max-lg:px-6 md:rounded-[20px] lg:max-xl:rounded-none">
      {appContext.activeMine && (
        <>
          {' '}
          <div className="flex flex-col items-center gap-[18px] rounded-[20px] border border-[var(--color-stroke)] px-[46px] pb-[47.5px] pt-[48.25px] text-center font-medium">
            <div className="flex items-center gap-1 text-[var(--color-black)]">
              <p className="leading-[20.83px]">XRP mined</p>
              <Apy className="lg:hidden" />
            </div>

            <p className="text-[28px] leading-[36.46px]">
              {calculateStakeRewards(
                appContext.activeMine?.tokensAmount,
                175,
                appContext.activeMine?.stakingDurationInDays,
                new Date(appContext.activeMine.createdAt!),
                new Date(),
              ).toFixed(5)}{' '}
              XRP
            </p>
          </div>
          <div className="flex gap-6 max-2xl:flex-col max-xl:flex-row 2xl:gap-12">
            <WarningModal
              title="Re-mine"
              mutate={mutateReMine}
              isPending={isPendingReMine}
              open={open}
              setOpen={setOpen}
            >
              <Button
                variant={'outline'}
                className="basis-full border-[var(--color-lambo-green)] max-xl:h-[49px]"
              >
                Re-mine
              </Button>
            </WarningModal>
            <WarningModal
              title="Claim reward"
              mutate={mutate}
              isPending={isPending}
              open={open}
              setOpen={setOpen}
            >
              <Button
                variant={'outline'}
                className="basis-full max-xl:h-[49px]"
              >
                Claim reward
              </Button>
            </WarningModal>
          </div>
        </>
      )}

      <Separator className="bg-[var(--color-stroke)]" />
      <Referral />
    </div>
  );
};

export const SuccessPage = (props: {
  setIsSuccess: Dispatch<SetStateAction<boolean>>;
  type: string;
}) => {
  const appContext = useContext(AppContext);
  return (
    <div className="flex flex-col items-center justify-center">
      <MinerSuccess className="dark:hidden" />
      <MinerSuccessDark className="hidden dark:block" />
      <div className="py-[23.5px]"></div>
      <p className="text-[28px] font-semibold leading-[36.46px] text-[var(--color-black)]">
        Congratulations!
      </p>
      <div className="py-[10.5px]"></div>
      <p className="text-[var(--color-black)]">
        You have successfully {props.type}{' '}
        <span className="text-black dark:text-white">
          {appContext.activeMine?.tokensAmount} XRP
        </span>{' '}
        to your wallet
      </p>
      <div className="py-[17.5px]"></div>
      <Button
        onClick={() => props.setIsSuccess(false)}
        variant={'outline'}
        className="basis-full"
      >
        Go Back
      </Button>
    </div>
  );
};

const WarningModal = (props: {
  children: ReactNode;
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mutate: any;
  isPending: boolean;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const appContext = useContext(AppContext);

  return (
    <Dialog open={props.open} onOpenChange={props.setOpen}>
      <DialogTrigger asChild>{props.children}</DialogTrigger>
      <DialogContent className="flex w-full flex-col gap-8 rounded-3xl px-6 pt-6 max-sm:h-[38.5rem] max-sm:w-4/5 sm:max-w-[47.5rem] sm:gap-[3.5rem] sm:rounded-[2.5rem] sm:px-[2.69rem] sm:pt-8 [&>button]:right-[2.69rem] [&>button]:top-6 sm:[&>button]:top-7 [&>button_svg]:size-6 sm:[&>button_svg]:size-8">
        <DialogHeader className="space-y-6 max-sm:text-left">
          <DialogTitle className="text-xl leading-[1.38rem] sm:text-[1.75rem]">
            Confirm Action
          </DialogTitle>
          <DialogDescription className="text-lg sm:text-xl">
            Are you sure you want to {props.title}?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button variant={'destructive'}>Cancel</Button>
          </DialogClose>
          <ButtonLoading
            label="Confirm"
            isPending={props.isPending}
            disabled={props.isPending}
            className="h-48 py-2"
            onClick={() => props.mutate({ address: appContext.walletAddress })}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
