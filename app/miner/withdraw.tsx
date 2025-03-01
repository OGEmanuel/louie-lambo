'use client';

import MinerForm from './form';
import { useState } from 'react';
import HowItWorks from './how-it-works';
import { SuccessPage, Summary } from './tabs';
import { Separator } from '@/components/ui/separator';

const Withdraw = () => {
  const [isSuccess, setIsSuccess] = useState(false);

  return (
    <div className="flex w-full gap-8 max-xl:flex-col">
      <div className="w-[63.5294117647%] rounded-[20px] bg-white p-8 max-xl:w-full max-lg:space-y-8 max-lg:p-6 max-md:rounded-none lg:max-xl:rounded-none">
        {isSuccess ? (
          <SuccessPage type="withdrawn" setIsSuccess={setIsSuccess} />
        ) : (
          <MinerForm type="Withdraw" setIsSuccess={setIsSuccess} />
        )}
        <div className="py-[17.5px] max-lg:py-0"></div>
        <Separator className="bg-[var(--color-stroke)]" />
        <div className="py-[18.5px] max-lg:py-0"></div>
        <HowItWorks />
      </div>
      <Summary />
    </div>
  );
};

export default Withdraw;
