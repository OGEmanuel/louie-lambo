import SectionCard from '@/components/section-card';
import MinerTabs from './tabs';

const Miner = () => {
  return (
    <SectionCard className="border-none bg-[var(--color-bg)]">
      <MinerTabs />
    </SectionCard>
  );
};

export default Miner;
