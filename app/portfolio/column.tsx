import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';

export type Assets = {
  id: string;
  asset: string;
  staked: string;
  date: string;
  duration: string;
  timeRemaining: string;
  mined: string;
  apy: string;
};

export const columns: ColumnDef<Assets>[] = [
  {
    accessorKey: 'asset',
    header: 'Asset',
  },
  {
    accessorKey: 'staked',
    header: 'Staked',
  },
  {
    accessorKey: 'date',
    header: 'Date',
  },
  {
    accessorKey: 'duration',
    header: 'Duration',
  },
  {
    accessorKey: 'timeRemaining',
    header: 'Time Remaining',
  },
  {
    accessorKey: 'mined',
    header: 'Mined',
  },
  {
    accessorKey: 'apy',
    header: 'APY (%)',
  },
];
