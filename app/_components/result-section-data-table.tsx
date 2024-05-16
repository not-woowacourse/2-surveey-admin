'use client';

import * as React from 'react';

import {
  type ColumnDef,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { format } from 'date-fns';

import { type ReadFormResponseDto } from '@/__generated__/data-contracts';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { capitalize } from '@/lib/utils';
import { type AnswerValue } from '@/types/answer-value';

export const columns: ColumnDef<ReadFormResponseDto>[] = [
  // {
  //   accessorKey: 'status',
  //   header: 'Status',
  //   cell: ({ row }) => (
  //     <div className="capitalize">{row.getValue('status')}</div>
  //   ),
  // },
  // {
  //   accessorKey: 'email',
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
  //       >
  //         Email
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     );
  //   },
  //   cell: ({ row }) => <div className="lowercase">{row.getValue('email')}</div>,
  // },
  // {
  //   accessorKey: 'amount',
  //   header: () => <div>Amount</div>,
  //   cell: ({ row }) => {
  //     const amount = parseFloat(row.getValue('amount'));
  //     // Format the amount as a dollar amount
  //     const formatted = new Intl.NumberFormat('en-US', {
  //       style: 'currency',
  //       currency: 'USD',
  //     }).format(amount);
  //     return <div className="font-medium">{formatted}</div>;
  //   },
  // },
  // {
  //   id: 'delete-action',
  //   enableHiding: false,
  //   cell: ({ row }) => {
  //     return <Trash className="h-4 w-4" />;
  //   },
  // },
];

type ResultSectionDataTableProps = {
  headers: string[];
  data: Record<string, AnswerValue>[];
};

const ResultSectionDataTable = ({
  headers,
  data,
}: ResultSectionDataTableProps) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const columns: ColumnDef<Record<string, AnswerValue>>[] = headers.map(
    (header) => {
      return {
        accessorKey: header,
        header: capitalize(header),
        cell: ({ row }) => {
          if (header === 'id') {
            return <div className="text-nowrap">{row.getValue(header)}</div>;
          }

          if (header === 'createdAt') {
            const createdAt = row.getValue(header) as Date;

            return (
              <div className="text-nowrap">
                {format(createdAt, 'yyyy-MM-dd HH:mm:ss')}
              </div>
            );
          }

          const value = row.getValue(header) as AnswerValue;

          if (value === null || value === undefined) {
            return <div className="text-nowrap text-gray-400">N/A</div>;
          }

          if (value instanceof Date) {
            return (
              <div className="text-nowrap">{format(value, 'yyyy-MM-dd')}</div>
            );
          }

          return <div className="text-nowrap">{value}</div>;
        },
      };
    },
  );

  // const columns: ColumnDef<ReadFormResponseDto>[] = Object.entries(data[0]).map(
  //   ([key, value]) => {
  //     return {
  //       accessorKey: key,
  //       header: key,
  //       cell: () => <div></div>,
  //     };
  //   },
  // );

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <Table className="rounded-md">
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead key={header.id}>
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
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && 'selected'}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
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
  );
};

export default ResultSectionDataTable;
