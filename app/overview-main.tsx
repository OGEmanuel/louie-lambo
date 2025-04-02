'use client';

import { DM_Sans } from 'next/font/google';
import { ReactNode, useContext, useState } from 'react';
import RibbonFirst from './components/icons/ribbon-first';
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
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Skeleton } from '@/components/ui/skeleton';
import wallets from '@/public/images/wallets-illus.jpeg';
import rewards from '@/public/images/rewards-illus.jpeg';
import Image from 'next/image';
import token from '@/public/images/token.png';
import RibbonFifthSelect from './components/icons/ribbon-fifth-select';
import RibbonSixthSelect from './components/icons/ribbon-sixth-select';

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
});

const OverviewMain = () => {
  return (
    <div className="flex flex-col gap-12 sm:gap-[61px] lg:max-xl:gap-6">
      <div className="relative flex justify-between gap-6 max-md:flex-col max-md:gap-12 lg:max-xl:flex-col lg:max-xl:gap-6">
        <TierSelector />
      </div>
      <div className="flex flex-col gap-[13px]">
        <WalletSummary />
      </div>
    </div>
  );
};

export default OverviewMain;

const TierSelector = () => {
  const appContext = useContext(AppContext);
  const [open, setOpen] = useState(false);

  const { data: tiers, isPending } = useQuery({
    queryKey: ['tiers'],
    queryFn: async () => {
      const response = await axios.get('/api/admin/getTiers');
      return response.data.tiers;
    },
  });

  if (isPending) {
    return (
      <Skeleton className="h-[11.9rem] w-full animate-pulse rounded-[18px]" />
    );
  }

  return (
    <div className="flex basis-full flex-col gap-5 overflow-hidden rounded-[1.25rem] border border-[var(--color-stroke)] bg-custom-gradient p-4 dark:bg-dark-gradient sm:px-8 sm:py-9">
      <div className="absolute bottom-0 right-0 z-10 h-[10rem] w-[10.69rem] shrink-0 animate-slide-in overflow-hidden">
        <Image src={token} alt="token" fill />
      </div>
      <Popover onOpenChange={setOpen} open={open}>
        {isPending ? (
          <Skeleton className="h-9 w-full" />
        ) : (
          <PopoverTrigger className="z-20 flex items-center gap-[11px]">
            <span className="flex items-center gap-[14px] text-[var(--color-black)] sm:text-2xl sm:leading-[31.25px]">
              <RibbonFirst className="hidden sm:block" />
              <RibbonSelectMobile className="sm:hidden" />
              <span className="text-left text-2xl transition-all hover:rotate-6 hover:skew-x-12 hover:scale-150">
                {tiers[0]?.name}
              </span>
            </span>
            <ArrowDown />
          </PopoverTrigger>
        )}
        <PopoverContent
          align="center"
          className="h-[30rem] w-80 max-w-[700px] self-center overflow-auto rounded-[18px] p-4 dark:bg-[var(--color-lambo-black)] sm:h-[35rem] sm:w-full md:p-[2.63rem]"
        >
          <RadioGroup
            defaultValue={tiers[0].name}
            value={tiers[0].name}
            className="grid gap-6 md:grid-cols-2 md:gap-[2.63rem]"
          >
            <TierItem
              tier="T1 - LAMBORGHINI AVENTADOR 🚨"
              icon={<RibbonFirstSelect />}
              value={appContext.userTier?.name}
            >
              <li>{tiers[0].description}</li>
            </TierItem>
            <TierItem
              tier="T2 - LAMBORGHINI REVENTON 🚨"
              icon={<RibbonSecondSelect />}
              value={appContext.userTier?.name}
            >
              <li>{tiers[1].description}</li>
            </TierItem>
            <TierItem
              tier="T3 - LAMBORGHINI CENTENARIO 🚨"
              icon={<RibbonThirdSelect />}
              value={appContext.userTier?.name}
            >
              <li>{tiers[2].description}</li>
            </TierItem>
            <TierItem
              tier="T4 - LAMBORGHINI EGOISTA 🚨"
              icon={<RibbonFourthSelect />}
              value={appContext.userTier?.name}
            >
              <li>{tiers[3].description}</li>
            </TierItem>
            <TierItem
              tier="T5 - LAMBORGHINI SIAN 🚨"
              icon={<RibbonFifthSelect />}
              value={appContext.userTier?.name}
            >
              <li>{tiers[4].description}</li>
            </TierItem>
            <TierItem
              tier="T6 - LAMBORGHINI VENENO 🚨"
              icon={<RibbonSixthSelect />}
              value={appContext.userTier?.name}
            >
              <li>{tiers[5].description}</li>
            </TierItem>
          </RadioGroup>
        </PopoverContent>
      </Popover>
      <ul className="z-20 ml-4 max-w-[33.44rem] list-disc leading-[20.83px] text-[var(--color-black)] [&>li]:leading-[26px]">
        {appContext.userTier?.name === 'T1 - LAMBORGHINI AVENTADOR 🚨' && (
          <li>{tiers[0].description}</li>
        )}
        {appContext.userTier?.name === 'T2 - LAMBORGHINI REVENTON 🚨' && (
          <li>{tiers[1].description}</li>
        )}
        {appContext.userTier?.name === 'T3 - LAMBORGHINI CENTENARIO 🚨' && (
          <li>{tiers[2].description}</li>
        )}
        {appContext.userTier?.name === 'T4 - LAMBORGHINI EGOISTA 🚨' && (
          <li>{tiers[3].description}</li>
        )}{' '}
        {appContext.userTier?.name === 'T5 - LAMBORGHINI SIAN 🚨' && (
          <li>{tiers[4].description}</li>
        )}{' '}
        {appContext.userTier?.name === 'T6 - LAMBORGHINI VENENO 🚨' && (
          <li>{tiers[5].description}</li>
        )}
      </ul>
    </div>
  );
};

const WalletSummary = () => {
  const appContext = useContext(AppContext);

  return (
    <div className="flex justify-center gap-6 rounded-[20px] bg-[var(--color-bg)] p-6 max-lg:flex-col sm:gap-12 sm:px-16 sm:py-[4.38rem] lg:max-2xl:px-10 lg:max-2xl:py-10">
      <div className="flex items-center gap-6 rounded-[1.25rem] border border-[var(--color-lambo-green)] bg-white p-8 dark:bg-[var(--color-lambo-black)] max-sm:flex-col">
        <div className="relative size-36 shrink-0 overflow-hidden rounded-[1.13rem]">
          <Image src={wallets} alt="wallets" fill />
        </div>
        <div className="flex flex-col gap-6 max-sm:text-center">
          <p className="text-xl leading-[100%] text-[var(--color-gray)]">
            Staked Supply
          </p>
          <p
            className={cn(
              `text-[2rem] font-medium leading-[100%] text-[var(--color-black)]`,
              dmSans.className,
            )}
          >
            {appContext.stakedSupply.toLocaleString()} $LAMBO
          </p>
        </div>
      </div>
      <Separator
        className="my-2 hidden h-auto bg-[var(--color-stroke)] dark:bg-[#E4E4E4] lg:block"
        orientation="vertical"
      />
      <Separator className="my-2 h-[1px] w-full bg-[var(--color-stroke)] dark:bg-[#E4E4E4] lg:hidden" />
      <div className="flex items-center gap-6 rounded-[1.25rem] border border-[var(--color-lambo-green)] bg-white p-8 dark:bg-[var(--color-lambo-black)] max-sm:flex-col">
        <div className="relative size-36 shrink-0 overflow-hidden rounded-[1.13rem]">
          <Image src={rewards} alt="rewards" fill />
        </div>
        <div className="flex flex-col gap-6 max-sm:text-center">
          <p className="text-xl leading-[100%] text-[var(--color-gray)]">
            XRP rewards distributed
          </p>
          <p
            className={cn(
              `text-[2rem] font-medium leading-[100%] text-[var(--color-black)]`,
              dmSans.className,
            )}
          >
            {appContext.xrpRewardsDistributed.toFixed(1)} XRP
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
          props.tier === 'T1' &&
            'border-[var(--color-lambo-black)] bg-[#B9DFFF] dark:border-[var(--color-lambo-green)]',
          props.tier === 'T2' && 'border-[var(--color-stroke)] bg-[#D1FFED]',
          props.tier === 'T3' && 'border-[var(--color-stroke)] bg-[#FFE4FC]',
          props.tier === 'T4' && 'border-[var(--color-stroke)] bg-[#E8FFCF]',
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
