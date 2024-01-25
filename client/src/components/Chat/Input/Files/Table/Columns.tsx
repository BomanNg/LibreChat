import { FileSources } from 'librechat-data-provider';
import { ArrowUpDown, MoreHorizontal, Database } from 'lucide-react';
import type { ColumnDef } from '@tanstack/react-table';
import type { TFile } from 'librechat-data-provider';
import {
  Button,
  Checkbox,
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from '~/components/ui';
import { OpenAIMinimalIcon } from '~/components/svg';
import { SortFilterHeader } from './SortFilterHeader';
import ImagePreview from '~/components/Chat/Input/Files/ImagePreview';
import FilePreview from '~/components/Chat/Input/Files/FilePreview';
import { formatDate, getFileType } from '~/utils';

export const columns: ColumnDef<TFile>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="flex"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="flex"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'filename',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const file = row.original;
      if (file.type?.startsWith('image')) {
        return (
          <div className="flex gap-2">
            <ImagePreview
              url={file.filepath}
              className="h-10 w-10 shrink-0 overflow-hidden rounded-md"
            />
            <span className="self-center truncate">{file.filename}</span>
          </div>
        );
      }

      const fileType = getFileType(file.type);
      return (
        <div className="flex gap-2">
          {fileType && <FilePreview fileType={fileType} />}
          <span className="self-center truncate">{file.filename}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'updatedAt',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => formatDate(row.original.updatedAt),
  },
  {
    accessorKey: 'source',
    header: ({ column }) => {
      return (
        <SortFilterHeader
          column={column}
          title="Storage"
          filters={{
            Storage: Object.values(FileSources).filter(
              (value) => value === FileSources.local || value === FileSources.openai,
            ),
          }}
          valueMap={{
            [FileSources.openai]: 'OpenAI',
            [FileSources.local]: 'Host',
          }}
        />
      );
    },
    cell: ({ row }) => {
      const { source } = row.original;
      if (source === FileSources.openai) {
        return (
          <div className="flex flex-wrap items-center gap-2">
            <OpenAIMinimalIcon className="icon-sm text-green-600/50" />
            {'OpenAI'}
          </div>
        );
      }
      return (
        <div className="flex flex-wrap items-center gap-2">
          <Database className="icon-sm text-cyan-700" />
          {'Host'}
        </div>
      );
    },
  },
  {
    accessorKey: 'bytes',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Size
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const suffix = ' MB';
      const value = Number((Number(row.original.bytes) / 1024 / 1024).toFixed(2));
      if (value < 0.01) {
        return '< 0.01 MB';
      }

      return `${value}${suffix}`;
    },
  },
  {
    id: 'actions',
    header: () => 'Actions',
    cell: ({ row }) => {
      const file = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="z-[1001]">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(file.file_id)}>
              Copy file ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Delete File</DropdownMenuItem>
            {/* <DropdownMenuItem>View details</DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
