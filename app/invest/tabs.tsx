'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Deposit from './deposit';
import Withdraw from './withdraw';
import { Button } from '@/components/ui/button';
// import { Referral } from '../referral';
import { Separator } from '@/components/ui/separator';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import MinerSuccess from '../components/icons/miner-success';
import Apy from '../components/icons/apy';
import MinerSuccessDark from '../components/icons/miner-success-dark';
import { AppContext } from '@/context/AppContext';
import {
  calculateElapsedRewards,
  getApyBasedOnTierAndDuration,
  isUnlockDateEarly,
} from '@/lib/utils';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { toast, ToastContainer } from 'react-toastify';
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
import { MineType } from '@/lib/types';
import { Timer } from '@/components/Timer';
import { Referral } from '../referral';

const BASE_URL = 'https://lambo-miner-backend.onrender.com/api';

const MinerTabs = () => {
  const appContext = useContext(AppContext);

  return (
    <Tabs
      defaultValue={
        appContext.activeMine?.status === 'ACTIVE' ? 'withdraw' : 'deposit'
      }
      className=""
    >
      <TabsList>
        <TabsTrigger value="deposit">Deposit</TabsTrigger>
        {appContext.activeMine?.status === 'ACTIVE' && (
          <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
        )}
      </TabsList>
      <TabsContent value="deposit" className="w-full">
        <Deposit />
      </TabsContent>
      {appContext.activeMine?.status === 'ACTIVE' && (
        <TabsContent value="withdraw" className="w-full">
          <Withdraw />
        </TabsContent>
      )}
    </Tabs>
  );
};

export default MinerTabs;

export const Summary = ({
  setIsSuccess,
}: {
  setIsSuccess: Dispatch<SetStateAction<boolean>>;
}) => {
  const appContext = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const [openRemine, setOpenRemine] = useState(false);
  const [isLoading, setIsloading] = useState<boolean>(false);

  const [rewards, setRewards] = useState<number>(0);

  const { mutate, isPending } = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: async (data: any) => {
      return axios.post(`${BASE_URL}/mine/claimRewards`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    },
    onSuccess: async data => {
      toast.success('Successfully claimed rewards', {
        position: 'bottom-right',
      });
      appContext.setActiveMine(data.data.mine as MineType);

      setOpen(false);
    },
    onError: async data => {
      const error = data as AxiosError;
      const errorData = error.response?.data as { message: string };
      if (errorData) {
        toast.error(errorData.message, {
          position: 'bottom-right',
        });
      }
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
    onSuccess: async data => {
      toast.success('Successfully restaked xrp', {
        position: 'bottom-right',
      });
      appContext.setActiveMine(data.data.mine as MineType);
      setOpenRemine(false);
    },
    onError: async data => {
      const error = data as AxiosError;
      const errorData = error.response?.data as { message: string };
      if (errorData) {
        toast.error(errorData.message, {
          position: 'bottom-right',
        });
      }
    },
  });

  useEffect(() => {
    const interval = setInterval(() => calculateRewards(), 2000);

    return () => clearInterval(interval);
  });

  const calculateRewards = () => {
    if (appContext.activeMine) {
      // const amount = calculateStakeRewards(
      //   appContext.activeMine?.tokensAmount,
      //   getApyBasedOnTierAndDuration(
      //     appContext.activeMine.tierData,
      //     appContext.activeMine.stakingDurationInDays,
      //   ),
      //   appContext.activeMine?.stakingDurationInDays,
      //   new Date(appContext.activeMine.lastClaimDate!),
      //   new Date(),
      // ).toFixed(5);

      const amount = calculateElapsedRewards(
        appContext.activeMine?.tokensAmount,
        getApyBasedOnTierAndDuration(
          appContext.activeMine.tierData,
          appContext.activeMine.stakingDurationInDays,
        ),
        appContext.activeMine?.stakingDurationInDays,
        new Date(appContext.activeMine.lastClaimDate!),
        new Date(),
      ).toFixed(5);

      setRewards(Number(amount));
    }
  };

  async function onSubmit() {
    if (appContext.activeMine?.tokensAmount) {
      setIsloading(true);
      const successful = await appContext.unMine(
        appContext.activeMine?.tokensAmount,
      );
      if (successful) {
        setIsSuccess(true);
      }
      setIsloading(false);
    }
  }

  return (
    <div className="flex w-[36.4705882353%] flex-col gap-[76px] bg-white p-12 dark:bg-[var(--color-lambo-black)] max-xl:w-full max-xl:gap-12 max-lg:px-6 md:rounded-[20px] lg:max-xl:rounded-none">
      <ToastContainer position="bottom-right" theme="dark" />

      {appContext.activeMine?.status === 'ACTIVE' && (
        <>
          {' '}
          <div className="flex flex-col items-center gap-[18px] rounded-[20px] border border-[var(--color-stroke)] px-[46px] pb-[47.5px] pt-[48.25px] text-center font-medium">
            <div className="flex items-center gap-1 text-[var(--color-black)]">
              <p className="leading-[20.83px]">XRP Earned</p>
              <Apy className="lg:hidden" />
            </div>

            <p className="text-[28px] leading-[36.46px]">{rewards} XRP</p>
          </div>
          <div className="flex gap-6 max-2xl:flex-col max-xl:flex-row 2xl:gap-12">
            <WarningModal
              title="ReInvest"
              mutate={mutateReMine}
              isPending={isPendingReMine}
              open={openRemine}
              setOpen={setOpenRemine}
            >
              <Button
                variant={'outline'}
                className="basis-full border-[var(--color-lambo-green)] max-xl:h-[49px]"
              >
                Re-invest XRP
              </Button>
            </WarningModal>
            {/* {!isUnlockDateEarly(appContext.activeMine.unlockDate) && ( */}
            <WarningModal
              title="Claim reward"
              mutate={mutate}
              isPending={isPending}
              open={open}
              setOpen={setOpen}
            >
              <Button
                variant={'outline'}
                className={`basis-full max-xl:h-[49px] ${!isUnlockDateEarly(appContext.activeMine.unlockDate) && 'border-[var(--color-lambo-green)]'}`}
                disabled={isUnlockDateEarly(appContext.activeMine.unlockDate)}
              >
                Claim reward
              </Button>
            </WarningModal>
            {/* )} */}
          </div>
          <Separator className="bg-[var(--color-stroke)]" />
          {appContext.activeStake && appContext.activeMine && (
            <div className="flex flex-col items-center gap-[18px] rounded-[20px] border border-[var(--color-stroke)] px-[46px] pb-[30.5px] pt-[48.25px] text-center font-medium">
              <div className="flex items-center gap-1">
                <p className="leading-[20.83px] text-[var(--color-black)]">
                  Unlock Date
                </p>
                <Apy className="lg:hidden" />
              </div>
              <Timer
                deadline={new Date(
                  appContext.activeStake.unlockDate!,
                ).toISOString()}
              />
            </div>
          )}
        </>
      )}

      {appContext.activeMine?.status === 'UNSTAKED' && (
        <>
          <div className="flex flex-col items-center gap-[18px] rounded-[20px] border border-[var(--color-stroke)] px-[46px] pb-[47.5px] pt-[48.25px] text-center font-medium">
            <div className="flex items-center gap-1 text-[var(--color-black)]">
              <p className="leading-[20.83px]">Pending XRP Withdrawal</p>
              <Apy className="lg:hidden" />
            </div>

            <p className="text-[28px] leading-[36.46px]">
              {appContext.activeMine ? appContext.activeMine?.tokensAmount : 0}{' '}
              XRP
            </p>
          </div>
          <div className="flex gap-6 max-2xl:flex-col max-xl:flex-row 2xl:gap-12">
            <ButtonLoading
              className="w-full"
              variant={'secondary'}
              label={`Withdraw XRP`}
              isPending={isLoading}
              onClick={onSubmit}
              disabled={isLoading}
            />
          </div>
        </>
      )}

      {(!appContext.activeMine ||
        appContext.activeMine == undefined ||
        appContext.activeMine == null) && <Referral />}
    </div>
  );
};

export const SuccessPage = (props: {
  setIsSuccess: Dispatch<SetStateAction<boolean>>;
  type: string;
}) => {
  // const appContext = useContext(AppContext);
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
        <span className="text-black dark:text-white">XRP</span> to your wallet
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
          <DialogClose asChild>
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

export const WithdrawWarningModal = (props: {
  children: ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  isPending: boolean;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onClick: () => void;
}) => {
  return (
    <Dialog open={props.open} onOpenChange={props.setOpen}>
      <DialogTrigger asChild>{props.children}</DialogTrigger>
      <DialogContent className="flex w-full flex-col gap-8 rounded-3xl px-6 pt-6 max-sm:h-[38.5rem] max-sm:w-4/5 sm:max-w-[47.5rem] sm:gap-[3.5rem] sm:rounded-[2.5rem] sm:px-[2.69rem] sm:pt-8 [&>button]:right-[2.69rem] [&>button]:top-6 sm:[&>button]:top-7 [&>button_svg]:size-6 sm:[&>button_svg]:size-8">
        <DialogHeader className="space-y-6 max-sm:text-left">
          <DialogTitle className="text-xl leading-[1.38rem] sm:text-[1.75rem]">
            Confirm Action
          </DialogTitle>
          <DialogDescription className="text-lg sm:text-xl">
            Are you sure you want to Withdraw?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={'destructive'}>Cancel</Button>
          </DialogClose>
          <ButtonLoading
            label="Confirm"
            type="submit"
            onClick={props.onClick}
            isPending={props.isPending}
            disabled={props.isPending}
            className="h-48 py-2"
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
