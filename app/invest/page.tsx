'use client';

import SectionCard from '@/components/section-card';
import MinerTabs from './tabs';
import { AppContext } from '@/context/AppContext';
import { useContext } from 'react';
// import { useRouter } from 'next/navigation';

const Miner = () => {
  const appContext = useContext(AppContext);
  // const router = useRouter();

  if (!appContext.activeStake) {
    // router.push('/');
    // return null;
  }

  return (
    <SectionCard
      className="border-none bg-[var(--color-bg)] max-lg:rounded-none max-lg:pb-0 lg:max-xl:px-0"
      wrapperClassName="max-lg:px-0"
    >
      <MinerTabs />
    </SectionCard>
  );
};

export default Miner;
