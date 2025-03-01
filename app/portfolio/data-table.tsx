'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  className?: string;
}

const DataTable = <TData, TValue>(props: DataTableProps<TData, TValue>) => {
  const { columns, data, className } = props;

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className={cn('overflow-hidden rounded-t-[14px] border', className)}>
      <Table>
        <TableHeader className="bg-[var(--color-off-white)]">
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id} className="">
              {headerGroup.headers.map(header => {
                return (
                  <TableHead
                    key={header.id}
                    className="h-11 px-6 text-base font-normal leading-[20.83px] text-[var(--color-gray)] 2xl:pl-[54.43px]"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="border-[#EAECF0]">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map(row => (
              <TableRow key={row.id} className="even:bg-[var(--color-bg)]">
                {row.getVisibleCells().map(cell => (
                  <TableCell
                    key={cell.id}
                    className="h-16 px-6 py-0 text-sm font-light leading-[18.23px] text-[#333333] 2xl:pl-[54.43px]"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default DataTable;
