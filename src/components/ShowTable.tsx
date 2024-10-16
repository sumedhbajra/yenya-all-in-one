/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

export default function ShowTable({
  data,
  columns,
}: {
  data: any;
  columns: any;
}) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const table = useReactTable({
    data,
    columns,

    // Below are complex as well as important for constructing stable Table.
    debugTable: true, // idk what this does
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: false,

    // Paginations
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: { pagination },
  });

  if (!data)
    return (
      <div>No data [Please go on the terminal & hit "npm run server"]</div>
    );

  return (
    <>
      <table className="table-auto w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="px-4 py-2">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <>
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="border px-4 py-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            </>
          ))}
        </tbody>
      </table>
      <TableOperations table={table} />
    </>
  );
}

function TableOperations({ table }: { table: any }) {
  const buttonStyle: string = `text-3xl bg-slate-500 text-gray-50 p-2 rounded-lg shadow-lg
          hover:bg-slate-600 hover:shadow-2xl active:bg-slate-700`;

  return (
    <div className="h-2 m-5">
      {/* Table Operation Buttons */}
      <div className="flex items-center gap-5">
        {/* Buttons For Pagination */}
        <button
          className={buttonStyle}
          onClick={() => table.firstPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<<"}
        </button>
        <button
          className={buttonStyle}
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </button>
        {/* Display Page Position */}
        <span className="mx-10 border-2 border-opacity-20 border-slate-600 py-1 px-10 ">
          <h2>Page</h2>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>
        </span>
        <button
          className={buttonStyle}
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </button>
        <button
          className={buttonStyle}
          onClick={() => table.lastPage()}
          disabled={!table.getCanNextPage()}
        >
          {">>"}
        </button>
        <span className="flex gap-2 items-center">
          <h1>Go to page:</h1>
          <input
            className="border-2 w-20 h-14 text-center"
            type="number"
            min={1}
            max={table.getPageCount()}
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              if (
                Number(e.target.value) > table.getState().pagination.pageSize
              ) {
                return;
              } else {
                const page: number = e.target.value
                  ? Number(e.target.value) - 1
                  : 0;
                table.setPageIndex(page);
              }
            }}
          />
        </span>

        <div>
          Showing {table.getRowModel().rows.length.toLocaleString()} of{" "}
          {table.getRowCount().toLocaleString()} Rows
        </div>
        <select
          className="bg-gray-200 p-2 rounded-md"
          value={table.getState().pagination.pageSize}
          onChange={(e) => table.setPageSize(Number(e.target.value))}
        >
          {[2, 5, 7, 10, 15].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
