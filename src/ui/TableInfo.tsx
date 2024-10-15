import { useEffect, useMemo, useState } from "react";
import { getAllEmployee } from "../services/apiEmployee";
import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import ShowTable from "../components/ShowTable";

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
      {
        header: "Change Stuff",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        cell: ({ row }: any) => {
          return (
            <div className="flex justify-between m-4 text-3xl font-bold text-gray-700">
              <span className="p-2 rounded-lg cursor-pointer">
                <MdEdit />
              </span>
              <button
                className=" p-2 rounded-lg 
                cursor-pointer"
                onClick={() => {
                  console.log(row.original);
                }}
              >
                <FaTrash />
              </button>
            </div>
          );
        },
      },
    ],
    []
  );

  return <ShowTable data={data} columns={columns} />;
};

// Java: DSA
