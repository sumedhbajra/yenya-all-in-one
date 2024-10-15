import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { getAllEmployee } from "../services/apiEmployee";

export default function TableInfo() {
  return (
    <div className="h-full">
      <MyComponent />
    </div>
  );
}

const MyComponent = () => {
  // Sample data
  const [myData, setData] = useState();
  const data = useMemo(() => myData, [myData]);

  const getAll = async () => {
    const data = await getAllEmployee();
    setData(data);
  };

  useEffect(() => {
    getAll();
  }, []);

  // Define columns
  const columns = useMemo(
    () => [
      { header: "ID", accessorKey: "id" },
      { header: "Name", accessorKey: "fullName" },
      { header: "Age", accessorKey: "age" },
      { header: "University", accessorKey: "university" },
      { header: "D.O.B", accessorKey: "dob" },
      { header: "E-mail", accessorKey: "email" },
      { header: "Gender", accessorKey: "gender" },
      { header: "Role", accessorKey: "role" },
      { header: "Position", accessorKey: "position" },
      { header: "Contact No.", accessorKey: "contactNo" },
      { header: "Change Stuff" },
    ],
    []
  );
   
  // // Pagination state
  // const [pageIndex, setPageIndex] = useState(0);
  // const [pageSize, setPageSize] = useState(10);

  // Create table instance using `useReactTable`
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      // pagination: { pageIndex, pageSize },
    },
    // onPaginationChange: (updater) => {
    //   setPageIndex((prev) => {
    //     const newState =
    //       typeof updater === "function"
    //         ? updater({
    //             pageIndex: prev,
    //             pageSize: 0,
    //           }).pageIndex
    //         : updater.pageIndex;
    //     return newState;
    //   });

    // setPageSize((prev) => {
    //   const newState =
    //     typeof updater === "function"
    //       ? updater({
    //           pageSize: prev,
    //           pageIndex: 0,
    //         }).pageSize
    //       : updater.pageSize;
    //   return newState;
    // });
  });
  console.log(table);
  console.log(table.getHeaderGroups());
  if (!data) return <div>No data</div>;

  return (
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
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="border px-4 py-2">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// Java: DSA
