'use client';

import Product from '@/types/Product';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Icons } from '@/components/icons';
import { ChevronDownIcon } from '@radix-ui/react-icons';

import Image from 'next/image';
import { Trash2, Pencil } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useDebouncedCallback } from 'use-debounce';
import DeleteProductModal from './DeleteProductModal';
import { Noto_Sans_Tamil_Supplement } from 'next/font/google';

export type ProductsListingProps = {};
function ProductsListing({}: ProductsListingProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1');
  const sortBy = searchParams.get('sortBy') || 'createdAt';
  const order = searchParams.get('order') || 'asc';
  const search = searchParams.get('search') || '';

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [limit] = useState(10);
  const [searchInput, setSearchInput] = useState(search);

  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const debouncedSearch = useDebouncedCallback((value) => {
    const newParams = new URLSearchParams(window.location.search);
    newParams.set('search', value);
    router.replace(`?${newParams.toString()}`);
  }, 500);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `/api/products?page=${page}&limit=${limit}&sortBy=${sortBy}&order=${order}&search=${search}`
      );

      const data: { products: Product[]; totalCount: number; page: number } =
        await res.json();

      setProducts(data.products);
      setTotalCount(data.totalCount);
    } catch (error) {
      console.error('Failed to fetch products', error);
    } finally {
      setLoading(false);
    }
  }, [page, sortBy, order, search, limit]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: 'id',
      header: 'Id',
    },
    {
      accessorKey: 'image',
      header: 'Image',
      cell: () => {
        return (
          <Image
            src="https://picsum.photos/60"
            alt="Product"
            width={50}
            height={50}
            className="rounded-md"
          />
        );
      },
    },
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'description',
      header: 'Description',
    },
    {
      accessorKey: 'stock',
      header: 'Stock',
    },
    {
      accessorKey: 'price',
      header: 'Price',
    },
    {
      accessorKey: 'id',
      header: 'Actions',
      cell: (param) => {
        return (
          <>
            <Button className="px-2 mr-1" variant="default">
              <Pencil size={18} />
            </Button>

            <Button
              className="px-2"
              variant="destructive"
              onClick={() => {
                setProductToDelete(param.row.original);
              }}
            >
              <Trash2 size={18} />
            </Button>
          </>
        );
      },
    },
  ];

  const table = useReactTable({
    rowCount: totalCount,
    data: products,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualFiltering: true,
  });

  return (
    <>
      <div className="flex items-center py-4">
        <Input
          placeholder="Search..."
          value={searchInput}
          onChange={(event) => {
            setSearchInput(event.target.value);
            debouncedSearch(event.target.value);
          }}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="pl-3">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <div className="flex justify-center">
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              <>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && 'selected'}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="pl-3">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
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
              </>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {products.length || 0} of {totalCount} row(s)
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>

          {table.getPageOptions()}
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
      {productToDelete !== null ? (
        <DeleteProductModal
          open={Boolean(productToDelete)}
          product={productToDelete}
          onClose={() => setProductToDelete(null)}
          onDelete={() => {
            fetchProducts();
          }}
        />
      ) : null}
    </>
  );
}

export default ProductsListing;
