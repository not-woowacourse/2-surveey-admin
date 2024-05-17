'use client';

import { useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
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
import { ArrowUpDown, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

import { type ReadSchemaResponseDto } from '@/__generated__/data-contracts';
import { DataTableViewOptions } from '@/components/etc/data-table-view-options';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Toggle } from '@/components/ui/toggle';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { type FormValues } from '@/constants/form';
import { TOAST_MESSAGES } from '@/constants/messages';
import { QUERY_KEYS } from '@/constants/query-keys';
import { axiosBatchDeleteForm } from '@/lib/api-requests';
import { capitalize, cn } from '@/lib/utils';
import { type AnswerValue } from '@/types/answer-value';

type ResultSectionDataTableProps = {
  headers: string[];
  data: Record<string, AnswerValue>[];
  schema: ReadSchemaResponseDto;
  formValues: FormValues;
};

const ResultSectionDataTable = ({
  headers,
  data,
  schema,
  formValues,
}: ResultSectionDataTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [isSelectMode, setIsSelectMode] = useState(false);

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: axiosBatchDeleteForm,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.FORMS(formValues),
      });

      toast.success(TOAST_MESSAGES.FORM_DELETE_SUCCESS);

      setRowSelection({});
    },
    onError: () => {
      toast.error(TOAST_MESSAGES.FORM_DELETE_ERROR);
    },
  });

  const prefixColumns: ColumnDef<Record<string, AnswerValue>>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          className={cn('ml-4 mr-2 hidden', isSelectMode && 'block')}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          className={cn('ml-4 mr-2 hidden', isSelectMode && 'block')}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
  ];

  const dataColumns: ColumnDef<Record<string, AnswerValue>>[] = headers.map(
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

  const columns = [...prefixColumns, ...dataColumns];

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
    },
  });

  const toggleIsSelectMode = () => {
    if (isSelectMode) {
      setRowSelection({});
    }

    setIsSelectMode((isSelectMode) => !isSelectMode);
  };

  return (
    <div>
      <div className="flex h-10 items-center justify-between">
        <div className="flex items-center gap-2">
          <Toggle size="sm" onClick={toggleIsSelectMode}>
            Select
          </Toggle>
          {isSelectMode && (
            <p className="ml-2 text-sm text-neutral-700">
              {table.getFilteredSelectedRowModel().rows.length} of{' '}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          {isSelectMode && (
            <Button
              variant="destructive"
              size="icon"
              onClick={() =>
                mutate({
                  ...formValues,
                  ids: table
                    .getFilteredSelectedRowModel()
                    .rows.map((row) => row.original.id as number),
                })
              }
              disabled={
                table.getFilteredSelectedRowModel().rows.length === 0 ||
                isPending
              }
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
          {!isSelectMode && <DataTableViewOptions table={table} />}
        </div>
      </div>
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
