'use client';

import Summary from './summary';
import MinerForm from './form';

const Deposit = () => {
  return (
    <div className="flex w-full gap-8">
      <MinerForm type="Deposit" />
      <Summary />
    </div>
  );
};

export default Deposit;
