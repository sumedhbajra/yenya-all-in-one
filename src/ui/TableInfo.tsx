import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  createColumnHelper,
} from "@tanstack/react-table";
import { useEffect } from "react";

export default function TableInfo() {
  const tableInstance = useReactTable({
    columns: [],
    data: [],
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    // etc i guess
  });

  const columns = [
    { accessorKey: "firstName", header: "First Name" },
    { accessorFn: (row) => row.lastName, header: () => <span>Last Name</span> },
  ];

  useEffect(function () {
    async function fetchData() {
      const res = await fetch("http://localhost:9000/employee");
      const data = await res.json();
      console.log(data[1]);
    }
    fetchData();
  });

  console.log(createColumnHelper);

  // const column = [columnHelper.accessor("firstName", {})];

  return <div className="h-full"></div>;
}

// Java: DSA
