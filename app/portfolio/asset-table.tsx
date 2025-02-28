import { faker } from '@faker-js/faker';
import DataTable from './data-table';
import { columns } from './column';

const AssetTable = () => {
  const data = [];

  for (let i = 0; i < 10; i++) {
    data.push({
      id: faker.string.uuid(),
      asset: 'Lambo Token',
      staked: '250',
      date: '2025-02-24',
      duration: '6 months',
      timeRemaining: '5 mos 17 days',
      mined: '250 XRP',
      apy: '4.33',
    });
  }

  return (
    <div className="flex flex-col gap-8">
      <p className="text-2xl leading-[31.25px] text-[var(--color-black)]">
        Asset Table
      </p>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default AssetTable;
