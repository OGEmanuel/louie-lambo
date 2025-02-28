'use client';

import { Referral } from '../referral';
import CalculatorForm from './form';

const Miner = () => {
  return (
    <div className="flex w-full gap-8">
      <CalculatorForm />
      <MinerSummary />
    </div>
  );
};

export default Miner;

const MinerSummary = () => {
  return (
    <div className="flex w-[36.4705882353%] flex-col gap-8 rounded-[20px] bg-white p-12">
      <div className="flex flex-col gap-[18px] rounded-[20px] border border-[var(--color-stroke)] px-[46px] pb-[47.5px] pt-[48.25px] text-center font-medium">
        <div className="flex flex-col gap-2">
          <p className="leading-[20.83px]">Expected rewards</p>
          <p className="leading-[20.83px] text-[var(--color-gray)]">
            You will receive (in stake)
          </p>
        </div>
        <div className="flex flex-col gap-6">
          <p className="text-[28px] leading-[36.46px]">150 XRP</p>
          <p className="leading-[24.83px] text-[var(--color-gray)]">
            After 6 months
          </p>
        </div>
      </div>
      <hr />
      <Referral />
    </div>
  );
};
