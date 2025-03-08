'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Stake from './stake';
import UnStake from './unstake';
import { useContext, useEffect, useState } from 'react';
import Apy from '../components/icons/apy';
import { AppContext } from '@/context/AppContext';

const StakeTabs = () => {
  const [value, setValue] = useState('stake');

  return (
    <Tabs onValueChange={setValue} value={value} className="">
      <TabsList className="">
        <TabsTrigger value="stake">Stake</TabsTrigger>
        <TabsTrigger value="unstake">Unstake</TabsTrigger>
      </TabsList>
      <TabsContent value="stake" className="w-full">
        <Stake />
      </TabsContent>
      <TabsContent value="unstake" className="w-full">
        <UnStake />
      </TabsContent>
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
      <div className="flex flex-col items-center gap-[18px] rounded-[20px] border border-[var(--color-stroke)] px-[46px] pb-[47.5px] pt-[48.25px] text-center font-medium">
        <div className="flex items-center gap-1">
          <p className="leading-[20.83px] text-[var(--color-black)]">
            Max XRP Mineable
          </p>
          <Apy className="lg:hidden" />
        </div>
        <p className="text-[28px] leading-[36.46px]">{apy} XRP</p>
      </div>
      <div className="flex w-full max-w-[217px] flex-col gap-7 self-center text-center">
        <div className="flex flex-col gap-3">
          <p className="text-lg leading-[23.44px] text-[var(--color-gray)]">
            Current tier
          </p>
          <p className="text-2xl font-medium leading-[31.25px]">
            {appContext.userTier.name}
          </p>
        </div>
        {props.tab === 'stake' && (
          <>
            <hr />
            <div className="flex flex-col gap-3">
              <p className="text-lg leading-[23.44px] text-[var(--color-gray)]">
                $LAMBO balance
              </p>
              <p className="text-2xl font-medium leading-[31.25px]">
                {appContext.tokenBalance} $LAMBO
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export const EarlyWithdrawal = () => {
  return (
    <p className="rounded-lg bg-[var(--color-bg)] p-3 leading-[20.83px] text-[var(--color-black)] max-lg:text-sm max-lg:leading-[18.23px]">
      Early withdrawal will result in <span className="font-medium">50%</span>{' '}
      loss of staked $LAMBO tokens
    </p>
  );
};

export const TransactionDetails = () => {
  return (
    <div className="flex flex-col gap-6 leading-[20.83px] max-lg:text-sm max-lg:leading-[18.23px]">
      <div className="flex items-center justify-between">
        <p className="text-[var(--color-gray)]">Transaction cost</p>
        <p className="font-medium text-[var(--color-black)]">0.24 XRP</p>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-[var(--color-gray)]">Exchange rate</p>
        <p className="font-medium text-[var(--color-black)]">
          1 $LAMBO = 1.2 XRP
        </p>
      </div>
    </div>
  );
};
