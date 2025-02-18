import { useMemo, useState } from "react";
import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import ShowTable from "../../components/ShowTable";
import Modal from "../../ui/Modal";
import FormLayout, { EmployeeProp } from "./FormLayout";
import Button from "../../ui/Button";
import { useDispatch } from "react-redux";
import { deleteEmployee } from "./employeeSlice";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function TableInfo({ myData, setDataUpdate }: any) {
  const data = useMemo(() => myData, [myData]);
  console.log(data?.length, "HAHA");
  console.log(data, "HAHA");

  return (
    <div className="h-full">
      <MyComponent data={data} setDataUpdate={setDataUpdate} />
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MyComponent = ({ data, setDataUpdate }: any) => {
  const [currentEmployee, setCurrentEmployee] = useState<EmployeeProp | null>();


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
                  setCurrentEmployee(row.original);
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
          <EditUser
            currentEmployee={currentEmployee}
            close={close}
            setDataUpdate={setDataUpdate}
          />
        </Modal.Window>
        <Modal.Window name="delete">
          <DeleteUser
            close={close}
            currentEmployeeId={currentEmployee?.id}
            setDataUpdate={setDataUpdate}
          />
        </Modal.Window>
      </Modal>
    </>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function DeleteUser({ close, currentEmployeeId, setDataUpdate }: any) {
  const dispatch = useDispatch();
  return (
    <div>
      <div>
        <h1>Warning: Delete User</h1>
        <p>Are you sure you want to delete this user.</p>
        <strong></strong>
        <Button
          variation="danger"
          text="Delete"
          onClick={() => {
            dispatch(deleteEmployee(currentEmployeeId));
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            setDataUpdate((e: any) => e + 1);
            close();
          }}
        />
        <Button variation="secondary" text="Cancel" onClick={close} />
      </div>
    </div>
  );
}

function EditUser({
  currentEmployee,
  close,
  setDataUpdate,
}: {
  currentEmployee: EmployeeProp | null | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  close: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setDataUpdate: any;
}) {
  return (
    <div>
      <FormLayout
        employee={currentEmployee}
        close={close}
        setDataUpdate={setDataUpdate}
      />
    </div>
  );
}

// Java: DSA
