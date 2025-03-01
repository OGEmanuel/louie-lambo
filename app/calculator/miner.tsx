'use client';

import { Referral } from '../referral';
import CalculatorForm from './form';

const Miner = () => {
  return (
    <div className="flex w-full gap-8 max-xl:flex-col">
      <CalculatorForm />
      <div className="flex w-[36.4705882353%] flex-col gap-[76px] bg-white p-12 max-xl:w-full max-lg:gap-12 max-lg:px-6 md:rounded-[20px] lg:max-xl:rounded-none">
        <Referral />
      </div>
    </div>
  );
};

export default Miner;
