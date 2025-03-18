'use client';

import { ReactNode, useContext, useState } from 'react';
import RibbonFirst from './components/icons/ribbon-first';
// import Link from 'next/link';
// import { ChevronRight } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import RibbonFirstSelect from './components/icons/ribbon-first-select';
import { cn } from '@/lib/utils';
import RibbonSecondSelect from './components/icons/ribbon-second-select';
import RibbonThirdSelect from './components/icons/ribbon-third-select';
import RibbonFourthSelect from './components/icons/ribbon-fourth-select';
import ArrowDown from './components/icons/arrow-down';
import RibbonSelectMobile from './components/icons/ribbon-select-mobile';
import { Separator } from '@/components/ui/separator';
import { AppContext } from '@/context/AppContext';
import Pooled from './components/icons/pooled';
import Wallet from './components/icons/wallet';
import Trophy from './components/icons/trophy';

const OverviewMain = () => {
  return (
    <div className="flex flex-col gap-12 sm:gap-[61px] lg:max-xl:gap-6">
      <div className="flex justify-between gap-6 max-md:flex-col max-md:gap-12 lg:max-xl:flex-col lg:max-xl:gap-6">
        <TierSelector />
        <Balance />
      </div>
      <div className="flex flex-col gap-[13px]">
        <WalletSummary />
      </div>
    </div>
  );
};

export default OverviewMain;

const TierSelector = () => {
  const [open, setOpen] = useState(false);

  const appContext = useContext(AppContext);

  return (
    <div className="flex flex-col gap-5 rounded-[18px] border border-[var(--color-stroke)] p-4 sm:p-6">
      <Popover onOpenChange={setOpen} open={open}>
        <PopoverTrigger className="flex items-center gap-[11px]">
          <span className="flex items-center gap-[14px] text-[18px] text-[var(--color-black)] sm:text-2xl sm:leading-[31.25px]">
            <RibbonFirst className="hidden sm:block" />
            <RibbonSelectMobile className="sm:hidden" />
            {appContext.userTier.name}
          </span>
          <ArrowDown />
        </PopoverTrigger>
        <PopoverContent
          align="center"
          className="w-full rounded-[18px] p-4 dark:bg-[var(--color-lambo-black)] md:p-[2.63rem]"
        >
          <RadioGroup
            defaultValue={appContext.userTier.name}
            value={appContext.userTier.name}
            className="grid gap-6 md:grid-cols-2 md:gap-[2.63rem]"
          >
            <TierItem
              tier="T1"
              icon={<RibbonFirstSelect />}
              value={appContext.userTier.name}
            >
              <Tier1 />
            </TierItem>
            <TierItem
              tier="T2"
              icon={<RibbonSecondSelect />}
              value={appContext.userTier.name}
            >
              <Tier2 />
            </TierItem>
            <TierItem
              tier="T3"
              icon={<RibbonThirdSelect />}
              value={appContext.userTier.name}
            >
              <Tier3 />
            </TierItem>
            <TierItem
              tier="T4"
              icon={<RibbonFourthSelect />}
              value={appContext.userTier.name}
            >
              <Tier4 />
            </TierItem>
          </RadioGroup>
        </PopoverContent>
      </Popover>
      <ul className="ml-2 list-inside list-disc leading-[20.83px] text-[var(--color-black)]">
        {appContext.userTier.name === 'T1' && <Tier1 />}
        {appContext.userTier.name === 'T2' && <Tier2 />}
        {appContext.userTier.name === 'T3' && <Tier3 />}
        {appContext.userTier.name === 'T4' && <Tier4 />}
      </ul>
    </div>
  );
};

const Balance = () => {
  const appContext = useContext(AppContext);

  return (
    <div className="flex w-full flex-col gap-[1.13rem] rounded-2xl border border-[var(--color-lambo-green)] p-[2.63rem] text-xl font-medium leading-[100%] text-[var(--color-black)] md:w-2/5 lg:max-xl:w-full">
      <div className="flex items-center gap-5">
        <div className="rounded-lg bg-[var(--color-bg)] p-3">
          <Pooled fill="#313131" className="dark:hidden" />
          <Pooled fill="#8a8a8a" className="hidden dark:block" />
        </div>
        <p>XRP pooled</p>
      </div>
      <p>{appContext.poolXrpBalance} XRP</p>
    </div>
  );
};

const WalletSummary = () => {
  const appContext = useContext(AppContext);

  return (
    <div className="flex justify-center gap-6 rounded-[20px] bg-[var(--color-bg)] p-6 max-md:flex-col sm:gap-12 sm:px-16 sm:py-[4.38rem]">
      <div className="flex items-center gap-6 rounded-[1.25rem] bg-white p-8 dark:bg-[var(--color-lambo-black)]">
        <div className="rounded-[1.13rem] bg-[var(--color-bg)] p-6">
          <Wallet className="hidden dark:block" />
          <Wallet className="dark:hidden" fill="#8A8A8A" />
        </div>
        <div className="flex flex-col gap-6">
          <p className="text-xl leading-[100%] text-[var(--color-gray)]">
            No. of wallets staked
          </p>
          <p className="text-[2rem] font-medium leading-[100%] text-[var(--color-black)]">
            {appContext.stakedWallets}
          </p>
        </div>
      </div>
      <Separator
        className="my-2 hidden h-auto bg-[var(--color-stroke)] md:block"
        orientation="vertical"
      />
      <Separator className="my-2 h-[1px] w-full bg-[var(--color-stroke)] md:hidden" />
      <div className="flex items-center gap-6 rounded-[1.25rem] bg-white p-8 dark:bg-[var(--color-lambo-black)]">
        <div className="rounded-[1.13rem] bg-[var(--color-bg)] p-6">
          <Trophy className="hidden dark:block" />
          <Trophy className="dark:hidden" fill="#8A8A8A" />
        </div>
        <div className="flex flex-col gap-6">
          <p className="text-xl leading-[100%] text-[var(--color-gray)]">
            XRP rewards distributed
          </p>
          <p className="text-[2rem] font-medium leading-[100%] text-[var(--color-black)]">
            {appContext.xrpRewardsDistributed} XRP
          </p>
        </div>
      </div>
    </div>
  );
};

const TierItem = (props: {
  tier: string;
  icon: ReactNode;
  children: ReactNode;
  value: string;
}) => {
  return (
    <div className="flex items-center">
      <RadioGroupItem value={props.tier} id={props.tier} className="hidden" />
      <Label
        htmlFor={props.tier}
        className={cn(
          'flex flex-col gap-[19px] rounded-2xl border-2 p-4',
          props.tier === 'T1 Max' &&
            'border-[var(--color-lambo-black)] bg-[#B9DFFF] dark:border-[var(--color-lambo-green)]',
          props.tier === 'T2 Max' &&
            'border-[var(--color-stroke)] bg-[#D1FFED]',
          props.tier === 'T3 Max' &&
            'border-[var(--color-stroke)] bg-[#FFE4FC]',
          props.tier === 'T4 Max' &&
            'border-[var(--color-stroke)] bg-[#E8FFCF]',
        )}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {props.icon}
            <p className="text-[18px] leading-[23.44px] text-[var(--color-black)]">
              {props.tier}
            </p>
          </div>
          {props.tier === props.value && (
            <p className="rounded-lg border border-transparent bg-[var(--color-lambo-black)] px-2 py-1 text-sm font-medium leading-[26px] text-[var(--color-lambo-green)] dark:border-[var(--color-lambo-green)]">
              Current Tier
            </p>
          )}
        </div>
        <ul className="ml-2 list-inside list-disc leading-[26px] text-[var(--color-black)] [&>span]:font-medium">
          {props.children}
        </ul>
      </Label>
    </div>
  );
};

const Tier1 = () => {
  return (
    <>
      <li>
        Hold <span>500K to 2M</span> $LAMBO
      </li>
      <li>
        <span>250 XRP</span> maximum XRP mining
      </li>
      <li>
        APY : 50% <span>(7 days) - 1000%</span> (6 months).
      </li>
    </>
  );
};

const Tier2 = () => {
  return (
    <>
      <li>
        Hold <span>2.01M to 8M</span> $LAMBO
      </li>
      <li>
        <span>500 XRP</span> maximum XRP mining
      </li>
      <li>
        APY : 75% <span>(7 days) - 1000%</span> (6 months).
      </li>
    </>
  );
};

const Tier3 = () => {
  return (
    <>
      <li>
        Hold <span>8.01M to 18M</span> $LAMBO
      </li>
      <li>
        <span>500 XRP</span> maximum XRP mining
      </li>
      <li>
        APY : 100% <span>(7 days) - 1250%</span> (6 months).
      </li>
    </>
  );
};

const Tier4 = () => {
  return (
    <>
      <li>
        Hold <span>18M+</span> $LAMBO
      </li>
      <li>
        <span>500 XRP</span> maximum XRP mining
      </li>
      <li>
        APY : 200% <span>(7 days) - 1500%</span> (6 months).
      </li>
    </>
  );
};
