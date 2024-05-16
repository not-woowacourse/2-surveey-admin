'use client';

import { useState } from 'react';

import {
  type ColumnDef,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { format } from 'date-fns';
import { ArrowUpDown } from 'lucide-react';

import { type ReadSchemaResponseDto } from '@/__generated__/data-contracts';
import { DataTableViewOptions } from '@/components/etc/data-table-view-options';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { capitalize } from '@/lib/utils';
import { type AnswerValue } from '@/types/answer-value';

type ResultSectionDataTableProps = {
  headers: string[];
  data: Record<string, AnswerValue>[];
  schema: ReadSchemaResponseDto;
};

const ResultSectionDataTable = ({
  headers,
  data,
  schema,
}: ResultSectionDataTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const columns: ColumnDef<Record<string, AnswerValue>>[] = headers.map(
    (header) => {
      return {
        accessorKey: header,
        header: ({ column }) => {
          if (header === 'id' || header === 'createdAt') {
            return (
              <Button
                variant="ghost"
                className="w-full"
                onClick={() =>
                  column.toggleSorting(column.getIsSorted() === 'asc')
                }
              >
                {capitalize(header)}
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            );
          }

          const question = schema.questions.find(
            (question) => question.key === header,
          );

          if (question === undefined) {
            throw new Error(`Question not found: ${header}`);
          }

          return (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                  }
                >
                  {capitalize(header)}
                  {!question.isOptional && <p className="text-red-400">*</p>}
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {question.type}
                {question.isArray && '[]'}
              </TooltipContent>
            </Tooltip>
          );
        },
        cell: ({ row }) => {
          if (header === 'id') {
            return (
              <div className="text-nowrap text-center">
                {row.getValue(header)}
              </div>
            );
          }

          if (header === 'createdAt') {
            const createdAt = row.getValue(header) as Date;

            return (
              <div className="text-nowrap text-center">
                {format(createdAt, 'yyyy-MM-dd HH:mm:ss')}
              </div>
            );
          }

          const value = row.getValue(header) as AnswerValue;

          if (value === null || value === undefined) {
            return (
              <div className="text-nowrap text-center text-gray-400">N/A</div>
            );
          }

          if (value instanceof Date) {
            return (
              <div className="text-nowrap text-center">
                {format(value, 'yyyy-MM-dd')}
              </div>
            );
          }

          return <div className="text-nowrap text-center">{value}</div>;
        },
      };
    },
  );

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnVisibility,
    },
  });

  return (
    <div>
      <DataTableViewOptions table={table} />
      <div className="mt-2 rounded-md bg-white shadow-sm">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="px-1">
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
                    <TableCell key={cell.id} className="px-1">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ResultSectionDataTable;
