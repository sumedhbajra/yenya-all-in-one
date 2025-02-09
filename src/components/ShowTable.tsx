/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
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

  const queryClient = useQueryClient();

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

  console.log(data?.length);

  const mutatation = useMutation({
    mutationFn: async (data: any) => {
      alert('hello world');
      console.log(data, "MYDATAaaas");
      // queryClient.invalidateQueries({ queryKey: ['employee'] });
    },
    onSuccess: () => {
      alert('success triggered');
      // queryClient.invalidateQueries({ queryKey: ['employee'] });
    }
  }, queryClient);

  if (data?.length === 0)
    return (
      <div>
        No data or else may be empty [Please go on the terminal & hit "npm run
        server"]
      </div>
    );

  return (
    <>
      <div className="overflow-hidden rounded-lg shadow-md">


        <button onClick={() => {
          mutatation.mutate({ myKey: "myData" });
        }}>Click here!</button>


        <table className="table-auto w-full bg-white">
          <thead className="bg-gray-100">
            {table.getHeaderGroups().map((headerGroup, key) => (
              <tr key={key} className="text-left">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-2xl font-semibold text-gray-600 border-b"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
        </table>
        <div className="max-h-96 overflow-y-auto">
          <table className="table-auto w-full bg-white">
            <tbody>
              {table.getRowModel().rows.map((row, key) => (
                <tr
                  key={key}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-6 py-3 border-b text-gray-700 text-2xl"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

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
