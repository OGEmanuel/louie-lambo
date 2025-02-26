import SectionCard from '@/components/section-card';
import StakeTabs from './tabs';

const Stake = () => {
  return (
    <SectionCard className="border-none bg-[var(--color-bg)]">
      <StakeTabs />
    </SectionCard>
  );
};

export default Stake;
