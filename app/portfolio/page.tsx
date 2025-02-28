import SectionCard from '@/components/section-card';
import PortfolioHeader from './portfolio-header';
import AssetTable from './asset-table';

const Portfolio = () => {
  return (
    <SectionCard className="flex flex-col gap-[55px]">
      <PortfolioHeader />
      <AssetTable />
    </SectionCard>
  );
};

export default Portfolio;
