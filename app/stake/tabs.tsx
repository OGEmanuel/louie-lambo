'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Stake from './stake';
import UnStake from './unstake';
import { useState } from 'react';

const StakeTabs = () => {
  const [value, setValue] = useState('stake');

  return (
    <Tabs onValueChange={setValue} value={value}>
      <TabsList>
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
  return (
    <div className="flex w-[36.4705882353%] flex-col gap-[76px] rounded-[20px] bg-white p-12">
      <div className="flex flex-col gap-[18px] rounded-[20px] border border-[var(--color-stroke)] px-[46px] pb-[47.5px] pt-[48.25px] text-center font-medium">
        <p className="leading-[20.83px]">Annual percentage profit (APY rate)</p>
        <p className="text-[28px] leading-[36.46px]">4.33%</p>
      </div>
      <div className="flex w-full max-w-[217px] flex-col gap-7 self-center text-center">
        <div className="flex flex-col gap-3">
          <p className="text-[18px] leading-[23.44px] text-[var(--color-gray)]">
            Current tier
          </p>
          <p className="text-2xl font-medium leading-[31.25px]">Tier 1</p>
        </div>
        {props.tab === 'stake' && (
          <>
            <hr />
            <div className="flex flex-col gap-3">
              <p className="text-[18px] leading-[23.44px] text-[var(--color-gray)]">
                $LAMBO balance
              </p>
              <p className="text-2xl font-medium leading-[31.25px]">
                250 $LAMBO
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
