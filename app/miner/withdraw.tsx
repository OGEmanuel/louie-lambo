'use client';

import Summary from './summary';
import MinerForm from './form';

const Withdraw = () => {
  return (
    <div className="flex w-full gap-8">
      <MinerForm type="Withdraw" />
      <Summary />
    </div>
  );
};

export default Withdraw;
