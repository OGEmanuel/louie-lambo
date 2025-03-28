'use client';

import { MinerFormWithdraw } from './form';
import { useState } from 'react';
import { SuccessPage, Summary } from './tabs';

const Withdraw = () => {
  const [isSuccess, setIsSuccess] = useState(false);

  return (
    <div className="flex w-full gap-8 max-xl:flex-col">
      <div className="w-[63.5294117647%] rounded-[20px] bg-white p-8 dark:bg-[#1F2029] max-xl:w-full max-lg:space-y-8 max-lg:p-6 max-md:rounded-none lg:max-xl:rounded-none">
        {isSuccess ? (
          <SuccessPage type="withdrawn" setIsSuccess={setIsSuccess} />
        ) : (
          <MinerFormWithdraw type="Withdraw" setIsSuccess={setIsSuccess} />
        )}
        <div className="py-[17.5px] max-lg:py-0"></div>
      </div>
      <Summary setIsSuccess={setIsSuccess} />
    </div>
  );
};

export default Withdraw;
