'use client';

import Summary from './summary';
import MinerForm from './form';
import { useState } from 'react';
import SuccessPage from './success';
import HowItWorks from './how-it-works';

const Withdraw = () => {
  const [isSuccess, setIsSuccess] = useState(false);

  return (
    <div className="flex w-full gap-8">
      <div className="w-[63.5294117647%] rounded-[20px] bg-white p-8">
        {isSuccess ? (
          <SuccessPage type="withdrawn" setIsSuccess={setIsSuccess} />
        ) : (
          <MinerForm type="Withdraw" setIsSuccess={setIsSuccess} />
        )}
        <div className="py-[17.5px]"></div>
        <hr className="border-t border-[var(--color-stroke)]" />
        <div className="py-[18.5px]"></div>
        <HowItWorks />
      </div>
      <Summary />
    </div>
  );
};

export default Withdraw;
