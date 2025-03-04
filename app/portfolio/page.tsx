'use client';

import SectionCard from '@/components/section-card';
import PortfolioHeader from './portfolio-header';
import AssetTable from './asset-table';

const Portfolio = () => {
  return (
    <SectionCard className="flex flex-col gap-[55px] dark:bg-[var(--color-lambo-black)] max-lg:rounded-[20px] max-lg:border max-lg:border-[var(--color-stroke)] max-lg:px-4 max-lg:py-8">
      <PortfolioHeader />
      <AssetTable />
    </SectionCard>
  );
};

export default Portfolio;
