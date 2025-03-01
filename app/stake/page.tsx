import SectionCard from '@/components/section-card';
import StakeTabs from './tabs';

const Stake = () => {
  return (
    <SectionCard
      className="border-none bg-[var(--color-bg)] max-lg:rounded-none max-lg:pb-0 lg:max-xl:px-0"
      wrapperClassName="max-lg:px-0"
    >
      <StakeTabs />
    </SectionCard>
  );
};

export default Stake;
