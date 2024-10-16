import { useEffect, useMemo, useState } from "react";
import { getAllEmployee } from "../../services/apiEmployee";
import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import ShowTable from "../../components/ShowTable";
import Modal from "../../ui/Modal";
import FormLayout, { EmployeeProp } from "./FormLayout";
import Button from "../../ui/Button";

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
  const [currentEmployee, setCurrentEmployee] = useState<EmployeeProp | null>();

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
      { header: "ID", accessorKey: "employeeId" },
      {
        header: "Name",
        accessorKey: "fullName",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        cell: (info: { getValue: () => any }) => info.getValue(),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        footer: (props: any) => props.column.id,
      },
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
            <div className="flex justify-between m-4">
              <button
                className="rounded-lg 
                cursor-pointer"
                onClick={() => {
                  setCurrentEmployee(row.original);
                }}
              >
                <span className="rounded-lg cursor-pointer text-3xl font-bold text-gray-700">
                  <Modal.Open opens="edit">
                    <MdEdit />
                  </Modal.Open>
                </span>
              </button>
              <button
                className="p-2 rounded-lg 
                cursor-pointer"
                onClick={() => {
                  console.log(row.original, "HAHAHA");
                }}
              >
                <Modal.Open opens="delete">
                  <FaTrash />
                </Modal.Open>
              </button>
            </div>
          );
        },
      },
    ],
    []
  );

  return (
    <>
      <Modal>
        <ShowTable data={data} columns={columns} />

        {/* Can be defined anywhere but within Modal Component. */}
        <Modal.Window name="edit">
          <EditUser currentEmployee={currentEmployee} />
        </Modal.Window>
        <Modal.Window name="delete">
          <DeleteUser close={close} />
        </Modal.Window>
      </Modal>
    </>
  );
};

function EditUser({
  currentEmployee,
}: {
  currentEmployee: EmployeeProp | null | undefined;
}) {
  return (
    <div>
      <FormLayout employee={currentEmployee} />
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function DeleteUser({ close }: any) {
  return (
    <div>
      <div>
        <h1>Warning: Delete User</h1>
        <p>Are you sure you want to delete this user.</p>
        <strong></strong>
        <Button variation="danger" text="Delete" />
        <Button variation="secondary" text="Cancel" onClick={close} />
      </div>
    </div>
  );
}

// Java: DSA
