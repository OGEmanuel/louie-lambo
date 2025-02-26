'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';
import RibbonFirst from './components/icons/ribbon-first';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

const OverviewMain = () => {
  return (
    <div className="flex flex-col gap-[61px]">
      <div className="flex items-center justify-between">
        <TierSelector />
        <Balance />
      </div>
      <div className="flex flex-col gap-[13px]">
        <p className="flex items-center gap-2 px-[10px] py-[10.5px] text-[18px] leading-[23.44px] text-[var(--color-black)]">
          Refer & earn: Earn additional <span className="font-bold">XRP</span>{' '}
          upon all referals.{' '}
          <Link href="/" className="flex items-center font-semibold text-black">
            Refer now
            <ChevronRight className="h-6 w-6" />
          </Link>
        </p>
        <WalletSummary />
      </div>
    </div>
  );
};

export default OverviewMain;

const TierSelector = () => {
  const [value, setValue] = useState('tier-1');
  return (
    <div className="flex flex-col gap-5 rounded-[18px] border border-[var(--color-stroke)] p-6">
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger className="h-[46px] w-[147px] border-none p-0 text-2xl leading-[31.25.44px] text-[var(--color-black)] shadow-none focus:ring-0">
          <SelectValue placeholder="Select a tier" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="tier-1">
            <span className="flex items-center gap-[14px]">
              <RibbonFirst />
              Tier 1
            </span>
          </SelectItem>
          <SelectItem value="tier-2">
            <span className="flex items-center gap-[14px]">
              <RibbonFirst />
              Tier 2
            </span>
          </SelectItem>
          <SelectItem value="tier-3">
            <span className="flex items-center gap-[14px]">
              <RibbonFirst />
              Tier 3
            </span>
          </SelectItem>
        </SelectContent>
      </Select>
      <ul className="ml-2 list-inside list-disc leading-[20.83px] text-[var(--color-gray)]">
        <li>250 maximum XRP mining</li>
        <li>APY rates: 50%(7 days), 100%(7 months)</li>
      </ul>
    </div>
  );
};

const Balance = () => {
  return (
    <div className="flex w-2/5 justify-between">
      <div className="flex flex-col gap-6 pb-[26px] pt-3 text-center">
        <p className="text-xl leading-[26.04px] text-[var(--color-gray)]">
          XRP balance
        </p>
        <p className="text-[28px] font-medium leading-[36.46px] text-[var(--color-black)]">
          250 XRP
        </p>
      </div>
      <div className="w-[1px] border-l border-[var(--color-stroke)]"></div>
      <div className="flex flex-col gap-6 pb-[26px] pt-3 text-center">
        <p className="text-xl leading-[26.04px] text-[var(--color-gray)]">
          XRP pooled
        </p>
        <p className="text-[28px] font-medium leading-[36.46px] text-[var(--color-black)]">
          240,000 XRP
        </p>
      </div>
    </div>
  );
};

const WalletSummary = () => {
  return (
    <div className="flex justify-center rounded-[20px] border border-[var(--color-stroke)] pb-8 pt-[73px]">
      <div className="flex w-3/4 justify-between">
        <div className="flex w-full max-w-[139px] flex-col gap-6 self-center pb-[26px] pt-3 text-center">
          <p className="text-xl leading-[26.04px] text-[var(--color-gray)]">
            $LAMBO Token Holdings
          </p>
          <p className="text-[28px] font-medium leading-[36.46px] text-[var(--color-black)]">
            500,000
          </p>
        </div>
        <div className="w-[1px] border-l border-[var(--color-stroke)]"></div>
        <div className="flex max-w-[139px] flex-col gap-6 self-center pb-[26px] pt-3 text-center">
          <p className="text-xl leading-[26.04px] text-[var(--color-gray)]">
            Staked Wallets
          </p>
          <p className="text-[28px] font-medium leading-[36.46px] text-[var(--color-black)]">
            1,200
          </p>
        </div>
        <div className="w-[1px] border-l border-[var(--color-stroke)]"></div>
        <div className="flex w-full max-w-[192px] flex-col gap-6 self-center pb-[26px] pt-3 text-center">
          <p className="text-xl leading-[26.04px] text-[var(--color-gray)]">
            XRP <br />
            Rewards Distributed
          </p>
          <p className="text-[28px] font-medium leading-[36.46px] text-[var(--color-black)]">
            75,000 XRP
          </p>
        </div>
      </div>
    </div>
  );
};
