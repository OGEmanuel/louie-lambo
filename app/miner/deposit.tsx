'use client';

import Summary from './summary';
import MinerForm from './form';
import HowItWorks from './how-it-works';
import { useState } from 'react';
import SuccessPage from './success';

const Deposit = () => {
  const [isSuccess, setIsSuccess] = useState(false);

  return (
    <div className="flex w-full gap-8">
      <div className="w-[63.5294117647%] rounded-[20px] bg-white p-8">
        {isSuccess ? (
          <SuccessPage type="deposited" setIsSuccess={setIsSuccess} />
        ) : (
          <MinerForm type="Deposit" setIsSuccess={setIsSuccess} />
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

export default Deposit;
