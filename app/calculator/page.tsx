import SectionCard from '@/components/section-card';
import CalculatorTabs from './tabs';

const Calculator = () => {
  return (
    <SectionCard className="border-none bg-[var(--color-bg)]">
      <CalculatorTabs />
    </SectionCard>
  );
};

export default Calculator;
