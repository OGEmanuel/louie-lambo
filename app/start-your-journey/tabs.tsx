'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Stake from './stake';
import UnStake from './unstake';
import { useContext, useEffect, useState } from 'react';
import Apy from '../components/icons/apy';
import { AppContext } from '@/context/AppContext';
import { Timer } from '@/components/Timer';
import { isUnlockDateEarly } from '@/lib/utils';

const StakeTabs = () => {
  const [, setValue] = useState('lock');
  const appContext = useContext(AppContext);

  return (
    <Tabs
      onValueChange={setValue}
      value={appContext.activeStake ? 'unlock' : 'lock'}
      className=""
    >
      <TabsList className="">
        <TabsTrigger value="lock">Start your journey</TabsTrigger>
        {appContext.activeStake && (
          <TabsTrigger value="unlock">Eject from your ride</TabsTrigger>
        )}
      </TabsList>
      <TabsContent value="lock" className="w-full">
        <Stake />
      </TabsContent>
      {appContext.activeStake && (
        <TabsContent value="unlock" className="w-full">
          <UnStake />
        </TabsContent>
      )}
    </Tabs>
  );
};

export default StakeTabs;

export const Summary = (props: { tab: string }) => {
  const [apy, setApy] = useState<number>(0);
  const appContext = useContext(AppContext);
  useEffect(() => {
    const userTier = appContext.userTier;

    setApy(userTier.maxXrpMineable);
  }, [appContext.userTier]);
  return (
    <div className="flex w-[36.4705882353%] flex-col gap-[76px] bg-white p-12 dark:bg-[var(--color-lambo-black)] max-xl:w-full max-lg:gap-12 max-lg:px-6 md:rounded-[20px] lg:max-xl:rounded-none">
      <div className="flex w-full max-w-[217px] flex-col gap-7 self-center text-center">
        {props.tab === 'lock' && (
          <>
            <div className="flex flex-col gap-3">
              <p className="text-lg leading-[23.44px] text-[var(--color-gray)]">
                $LAMBO balance
              </p>
              <p className="text-2xl font-medium leading-[31.25px]">
                {appContext.tokenBalance} $LAMBO
              </p>
            </div>

            <hr />
          </>
        )}

        <div className="flex flex-col gap-3">
          <p className="text-lg leading-[23.44px] text-[var(--color-gray)]">
            Current tier
          </p>
          <p className="text-2xl font-medium leading-[31.25px]">
            {appContext.userTier.name}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-[18px] rounded-[20px] border border-[var(--color-stroke)] px-[46px] pb-[30.5px] pt-[48.25px] text-center font-medium">
        <div className="flex items-center gap-1">
          <p className="leading-[20.83px] text-[var(--color-black)]">
            How much XRP you can pack in your trunk
          </p>
          <Apy className="lg:hidden" />
        </div>
        <p className="text-[28px] leading-[36.46px]">{apy} XRP</p>
      </div>
      {appContext.activeStake && (
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
    </div>
  );
};

export const EarlyWithdrawal = (props: { tab?: string }) => {
  return (
    <>
      <p className="rounded-lg bg-[var(--color-bg)] p-3 leading-[20.83px] text-[var(--color-black)] max-lg:text-sm max-lg:leading-[18.23px]">
        All XRP rewards gained will be lost.{' '}
        {props.tab === 'unlock' && (
          <span>You will receive 50% $LAMBO if you eject early</span>
        )}
      </p>
    </>
  );
};

export const TransactionDetails = () => {
  const appContext = useContext(AppContext);
  const [isEarly, setIsEarly] = useState(false);

  useEffect(() => {
    if (appContext.activeStake) {
      setIsEarly(isUnlockDateEarly(appContext.activeStake!.unlockDate));
    }
  }, [appContext.activeStake]);

  return (
    <div className="flex flex-col gap-6 leading-[20.83px] max-lg:text-sm max-lg:leading-[18.23px]">
      {/* <div className="flex items-center justify-between">
        <p className="text-[var(--color-gray)]">Transaction cost</p>
        <p className="font-medium text-[var(--color-black)]">0.24 XRP</p>
      </div> */}
      {appContext.activeStake && (
        <div className="flex items-center justify-between">
          <p className="text-[var(--color-gray)]">You will receive</p>
          <p className="font-medium text-[var(--color-black)]">
            {isEarly
              ? appContext.activeStake!.tokensAmount / 2
              : appContext.activeStake?.tokensAmount}{' '}
            LAMBO
          </p>
        </div>
      )}
    </div>
  );
};
