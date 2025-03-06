'use client';

import { ReactNode, useContext, useState } from 'react';
import RibbonFirst from './components/icons/ribbon-first';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
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

const OverviewMain = () => {
  return (
    <div className="flex flex-col gap-12 sm:gap-[61px] lg:max-xl:gap-6">
      <div className="flex items-center justify-between max-md:flex-col max-md:gap-12 lg:max-xl:flex-col lg:max-xl:gap-6">
        <TierSelector />
        <Balance />
      </div>
      <div className="flex flex-col gap-[13px]">
        <p className="items-center px-[10px] py-[10.5px] text-sm leading-[18.23px] text-[var(--color-black)] sm:text-[18px] sm:leading-[23.44px] md:gap-2 xl:flex">
          Refer & earn: Earn additional{' '}
          <span className="font-bold dark:text-white">XRP</span> upon all
          referals.{' '}
          <Link
            href="/"
            className="flex items-center font-semibold text-black dark:text-white"
          >
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
  const [value, setValue] = useState('Tier 1');
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col gap-5 rounded-[18px] border border-[var(--color-stroke)] p-4 sm:p-6">
      <Popover onOpenChange={setOpen} open={open}>
        <PopoverTrigger className="flex w-max items-center gap-[11px]">
          <span className="flex items-center gap-[14px] text-[18px] text-[var(--color-black)] sm:text-2xl sm:leading-[31.25px]">
            <RibbonFirst className="hidden sm:block" />
            <RibbonSelectMobile className="sm:hidden" />
            {value}
          </span>
          <ArrowDown />
        </PopoverTrigger>
        <PopoverContent className="w-full rounded-[18px] p-[42px] dark:bg-[var(--color-lambo-black)]">
          <RadioGroup
            defaultValue={value}
            onValueChange={setValue}
            value={value}
            className="grid grid-cols-2 gap-[42px]"
          >
            <TierItem tier="Tier 1" icon={<RibbonFirstSelect />} value={value}>
              <Tier1 />
            </TierItem>
            <TierItem tier="Tier 2" icon={<RibbonSecondSelect />} value={value}>
              <Tier2 />
            </TierItem>
            <TierItem tier="Tier 3" icon={<RibbonThirdSelect />} value={value}>
              <Tier3 />
            </TierItem>
            <TierItem tier="Tier 4" icon={<RibbonFourthSelect />} value={value}>
              <Tier4 />
            </TierItem>
          </RadioGroup>
        </PopoverContent>
      </Popover>
      <ul className="ml-2 list-inside list-disc leading-[20.83px] text-[var(--color-gray)] dark:text-[var(--color-gray)]">
        {value === 'Tier 1' && <Tier1 />}
        {value === 'Tier 2' && <Tier2 />}
        {value === 'Tier 3' && <Tier3 />}
        {value === 'Tier 4' && <Tier4 />}
      </ul>
    </div>
  );
};

const Balance = () => {
  const appContext = useContext(AppContext);

  return (
    <div className="flex w-full gap-[18.5px] sm:max-md:justify-center md:w-2/5 md:justify-between lg:max-xl:w-full">
      <div className="flex flex-col gap-3 pb-[26px] pt-3 text-center max-xl:basis-full sm:gap-6">
        <p className="text-sm leading-[18.23px] text-[var(--color-gray)] sm:text-xl sm:leading-[26.04px] md:max-lg:text-lg md:max-lg:leading-[18.23px]">
          XRP balance
        </p>
        <p className="text-[20px] font-medium leading-[26.04px] text-[var(--color-black)] dark:text-white sm:text-[28px] sm:leading-[36.46px] md:max-lg:text-lg md:max-lg:leading-[18.23px]">
          {appContext.xrpBalance} XRP
        </p>
      </div>
      <Separator
        className="my-2 h-auto bg-[var(--color-stroke)] md:max-lg:my-0"
        orientation="vertical"
      />
      <div className="flex flex-col gap-3 pb-[26px] pt-3 text-center max-xl:basis-full sm:gap-6">
        <p className="text-sm leading-[18.23px] text-[var(--color-gray)] sm:text-xl sm:leading-[26.04px] md:max-lg:text-lg md:max-lg:leading-[18.23px]">
          XRP pooled
        </p>
        <p className="text-[20px] font-medium leading-[26.04px] text-[var(--color-black)] dark:text-white sm:text-[28px] sm:leading-[36.46px] md:max-lg:text-lg md:max-lg:leading-[18.23px]">
          240,000 XRP
        </p>
      </div>
    </div>
  );
};

const WalletSummary = () => {
  return (
    <div className="flex justify-center rounded-[20px] border border-[var(--color-stroke)] py-12 sm:py-8">
      <div className="flex justify-between max-md:gap-12 max-sm:max-w-[175px] max-sm:flex-col sm:w-3/4 lg:max-xl:gap-6">
        <div className="flex w-full max-w-[139px] flex-col gap-4 self-center text-center sm:gap-6 sm:pb-[26px] sm:pt-3 lg:max-xl:basis-full">
          <p className="leading-[20.83px] text-[var(--color-gray)] md:text-xl md:leading-[26.04px] lg:max-xl:text-base">
            $LAMBO Token Holdings
          </p>
          <p className="text-2xl font-medium leading-[31.25px] text-[var(--color-black)] dark:text-white md:text-[28px] md:leading-[36.46px] lg:max-xl:text-xl">
            500,000
          </p>
        </div>
        <Separator
          className="my-2 hidden h-auto bg-[var(--color-stroke)] sm:block"
          orientation="vertical"
        />
        <Separator className="my-2 h-[1px] w-full bg-[var(--color-stroke)] sm:hidden" />
        <div className="flex w-full max-w-[139px] flex-col gap-4 self-center text-center sm:gap-6 sm:pb-[26px] sm:pt-3 lg:max-xl:basis-full">
          <p className="leading-[20.83px] text-[var(--color-gray)] md:text-xl md:leading-[26.04px] lg:max-xl:text-base">
            Staked Wallets
          </p>
          <p className="text-2xl font-medium leading-[31.25px] text-[var(--color-black)] dark:text-white md:text-[28px] md:leading-[36.46px] lg:max-xl:text-xl">
            1,200
          </p>
        </div>
        <Separator
          className="my-2 hidden h-auto bg-[var(--color-stroke)] sm:block"
          orientation="vertical"
        />
        <Separator className="my-2 h-[1px] w-full bg-[var(--color-stroke)] sm:hidden" />
        <div className="flex w-full max-w-[139px] flex-col gap-4 self-center text-center sm:gap-6 sm:pb-[26px] sm:pt-3 lg:max-xl:basis-full">
          <p className="leading-[20.83px] text-[var(--color-gray)] md:text-xl md:leading-[26.04px] lg:max-xl:text-base">
            XRP <br />
            Rewards Distributed
          </p>
          <p className="text-2xl font-medium leading-[31.25px] text-[var(--color-black)] dark:text-white md:text-[28px] md:leading-[36.46px] lg:max-xl:text-xl">
            75,000 XRP
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
          props.tier === props.value
            ? 'border-[var(--color-lambo-green)]'
            : 'border-[var(--color-stroke)]',
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
