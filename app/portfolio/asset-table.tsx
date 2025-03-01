import { faker } from '@faker-js/faker';
import DataTable from './data-table';
import { Assets, columns } from './column';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

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
    <div className="flex flex-col gap-6 lg:gap-8">
      <p className="text-lg leading-[23.44px] text-[var(--color-black)] lg:text-2xl lg:leading-[31.25px]">
        Asset Table
      </p>
      <DataTable columns={columns} data={data} className="max-sm:hidden" />
      <AssetTableMobile data={data} />
    </div>
  );
};

export default AssetTable;

const AssetTableMobile = (props: { data: Assets[] }) => {
  return (
    <div className="block sm:hidden">
      <div className="flex justify-between rounded-t-lg bg-[var(--color-off-white)] p-3 leading-[20.83px] text-[var(--color-gray)]">
        <p>Asset</p>
        <p>Staked</p>
      </div>
      <Accordion type="single" collapsible className="w-full">
        {props.data.map(asset => (
          <AccordionItem value={asset.id} key={asset.id} className="border-b-0">
            <AccordionTrigger className="flex items-center bg-[var(--color-bg)] px-3 text-sm font-medium uppercase leading-[18.23px] text-[var-(--color-black)] hover:no-underline">
              {asset.asset}
              <span className="font-normal">{asset.staked}</span>
            </AccordionTrigger>
            <AccordionContent className="bg-[var(--color-off-white)] px-3 pb-0">
              <ul className="text-sm leading-[18.23px] text-[var(--color-gray)] [&>li>span]:font-medium [&>li>span]:text-[var(--color-black)] [&>li]:flex [&>li]:items-center [&>li]:justify-between [&>li]:py-4">
                <li>
                  Duration
                  <span>{asset.duration}</span>
                </li>
                <li>
                  Time remaining
                  <span>{asset.timeRemaining}</span>
                </li>
                <li>
                  Mined
                  <span>{asset.mined}</span>
                </li>
                <li>
                  APY (%)
                  <span>{asset.apy}</span>
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};
