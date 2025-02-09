import { MutationFunction, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Modal from "../ui/Modal";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import NewContent from './M2Week3.css';



export default function M2Week3() {

  const { data, error } = useQuery({ queryKey: ['student'], queryFn: getData });

  async function getData() {
    const res = await fetch('http://localhost:9000/student');
    const data = await res;
    if (data.status === 404) throw new Error('Data not found.');
    console.log(data.status, "STUDENT STATUS");
    return data.json();
  }

  function editData(id: string): Promise<unknown> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (id) {
          try {
            resolve(`Data with id ${id} updated`);
          } catch (error) {
            reject(new Error("Something went wrong."));
          }
        } else {
          reject(new Error('Id is required.'))
        }
      }, 1000);
    });
  }

  function deleteData(id: string): Promise<unknown> {
    alert(id)
    return new Promise((resolve, reject) => {
      if (id) {
        try {
          fetch('', {

          })
        } catch (error: any) {
          reject(error.message)
        }
      } else {
        alert('No ID provided.')
      }
    });
  }

  const mutationEdit = useMutation({
    mutationFn: editData,
    onSuccess: () => {
      alert("Mutation succeeded");
    },
    onError: (error: Error) => {
      alert(`Mutation failed: ${error.message}`);
    },
  });

  const mutationDelete = useMutation({
    mutationFn: deleteData,
    onSuccess: () => {
      alert("data has been deleted successfully");
    },
    onError: (error: Error) => {
      alert(`There was problem deleting data: ${error.message}`);
    }
  })

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: 'studentId',
      header: 'Student ID',
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: 'fullName',
      header: 'Full Name',
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: 'age',
      header: 'Age',
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: 'university',
      header: 'University',
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: 'dob',
      header: 'Date of Birth',
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: 'email',
      header: 'Email',
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: 'gender',
      header: 'Gender',
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: 'fieldOfStudy',
      header: 'Field of Study',
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: 'level',
      header: 'Level',
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: 'contactNo',
      header: 'Contact Number',
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: 'city',
      header: 'City',
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: 'country',
      header: 'Country',
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: 'action',
      header: "Actions",
      cell: (info) => {
        console.log(info.row.original.id, "NEWID")
        return <div className="flex gap-3">
          <div>
            <button className="bg-orange-500 hover:bg-orange-600 
            active:bg-orange-700 px-2 py-1 rounded-lg 
            text-white text-xl" onClick={() => {
                mutationEdit.mutate(info.row.original.id);
              }}>Edit</button>
          </div>
          <div>
            <button className="bg-red-500 hover:bg-red-600 
            active:bg-red-700 px-2 py-1 rounded-lg 
            text-white text-xl" onClick={() => {
                mutationDelete.mutate(info.row.original.id);
              }}>Delete</button>
          </div>
        </div>
      }
    }
  ];

  return (
    <>
      <h1>Life is good</h1>
      <div>M2Week3 Hello</div>

      <AddStudent />
      {data &&
        <NewTable data={data} columns={columns} />}
    </>
  )
}

function AddStudent() {

  // Initialize useFormik with validation schema

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: setData,
    onSuccess: () => {
      alert('success');
      queryClient.invalidateQueries({ queryKey: ['student'] })
    },
    onError: (err: any) => {
      alert(`Error: ${err}`);
    }
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      studentId: 'S12345',  // default student ID
      fullName: 'John Doe',  // default name
      age: '20',  // default age
      university: 'University of Example',  // default university name
      dob: '2004-01-01',  // default date of birth (yyyy-mm-dd format)
      email: 'johndoe@example.com',  // default email address
      gender: 'male',  // default gender (you can change this to 'female' or other if needed)
      fieldOfStudy: 'Computer Science',  // default field of study
      level: 'Undergraduate',  // default level (e.g., 'Undergraduate', 'Graduate')
      contactNo: '9876543210',  // default contact number
      city: 'Kathmandu',  // default city
      country: 'Nepal',  // default country
    },

    validationSchema: Yup.object({
      studentId: Yup.string().required('Student ID is required'),
      fullName: Yup.string().required('Full Name is required'),
      age: Yup.number().required('Age is required').positive().integer(),
      university: Yup.string().required('University is required'),
      dob: Yup.date().required('Date of Birth is required'),
      email: Yup.string().email('Invalid email format').required('Email is required'),
      gender: Yup.string().required('Gender is required'),
      fieldOfStudy: Yup.string().required('Field of Study is required'),
      level: Yup.string().required('Level is required'),
      contactNo: Yup.string().required('Contact Number is required'),
      city: Yup.string().required('City is required'),
      country: Yup.string().required('Country is required'),
    }),

    onSubmit: (values: any) => {

      console.log('Form data submitted:', values);
      mutation.mutate(values);

    },
  });


  async function setData(value: any) {
    try {
      const res = await fetch('http://localhost:9000/student', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(value)
      });

      const data = await res.status;
      if (data === 404) throw new Error('Failed to insert data');

      console.log(data, "NODATA");
    } catch (error: any) {
      throw new Error(error);
    }
  }

  return (
    <>
      <Modal>
        <Modal.Open opens="student">
          <div

            className="flex justify-end"
          >
            <button className="bg-orange-400 hover:bg-orange-500 active:bg-orange-600 p-3 rounded-lg text-white">Add Student</button>
          </div>
        </Modal.Open>

        <Modal.Window name="student">
          <>
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Add New Student</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              formik.handleSubmit();
              close();
            }} className="grid grid-cols-12 gap-4">
              <div className="col-span-12 md:col-span-6">
                <label className="block text-lg font-medium text-gray-700">Student ID:</label>
                <input
                  type="text"
                  name="studentId"
                  value={formik.values.studentId}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                />
                {formik.touched.studentId && formik.errors.studentId && (
                  <div className="mt-1 text-sm text-red-500">{formik.errors.studentId}</div>
                )}
              </div>

              <div className="col-span-12 md:col-span-6">
                <label className="block text-lg font-medium text-gray-700">Full Name:</label>
                <input
                  type="text"
                  name="fullName"
                  value={formik.values.fullName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                />
                {formik.touched.fullName && formik.errors.fullName && (
                  <div className="mt-1 text-sm text-red-500">{formik.errors.fullName}</div>
                )}
              </div>

              <div className="col-span-12 md:col-span-6">
                <label className="block text-lg font-medium text-gray-700">Age:</label>
                <input
                  type="number"
                  name="age"
                  value={formik.values.age}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                />
                {formik.touched.age && formik.errors.age && (
                  <div className="mt-1 text-sm text-red-500">{formik.errors.age}</div>
                )}
              </div>

              <div className="col-span-12 md:col-span-6">
                <label className="block text-lg font-medium text-gray-700">University:</label>
                <input
                  type="text"
                  name="university"
                  value={formik.values.university}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                />
                {formik.touched.university && formik.errors.university && (
                  <div className="mt-1 text-sm text-red-500">{formik.errors.university}</div>
                )}
              </div>

              <div className="col-span-12 md:col-span-6">
                <label className="block text-lg font-medium text-gray-700">Date of Birth:</label>
                <input
                  type="date"
                  name="dob"
                  value={formik.values.dob}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                />
                {formik.touched.dob && formik.errors.dob && (
                  <div className="mt-1 text-sm text-red-500">{formik.errors.dob}</div>
                )}
              </div>

              <div className="col-span-12 md:col-span-6">
                <label className="block text-lg font-medium text-gray-700">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="mt-1 text-sm text-red-500">{formik.errors.email}</div>
                )}
              </div>

              <div className="col-span-12 md:col-span-6">
                <label className="block text-lg font-medium text-gray-700">Gender:</label>
                <select
                  name="gender"
                  value={formik.values.gender}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                {formik.touched.gender && formik.errors.gender && (
                  <div className="mt-1 text-sm text-red-500">{formik.errors.gender}</div>
                )}
              </div>

              <div className="col-span-12 md:col-span-6">
                <label className="block text-lg font-medium text-gray-700">Field of Study:</label>
                <input
                  type="text"
                  name="fieldOfStudy"
                  value={formik.values.fieldOfStudy}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                />
                {formik.touched.fieldOfStudy && formik.errors.fieldOfStudy && (
                  <div className="mt-1 text-sm text-red-500">{formik.errors.fieldOfStudy}</div>
                )}
              </div>

              <div className="col-span-12 md:col-span-6">
                <label className="block text-lg font-medium text-gray-700">Level:</label>
                <input
                  type="text"
                  name="level"
                  value={formik.values.level}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                />
                {formik.touched.level && formik.errors.level && (
                  <div className="mt-1 text-sm text-red-500">{formik.errors.level}</div>
                )}
              </div>

              <div className="col-span-12 md:col-span-6">
                <label className="block text-lg font-medium text-gray-700">Contact No:</label>
                <input
                  type="text"
                  name="contactNo"
                  value={formik.values.contactNo}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                />
                {formik.touched.contactNo && formik.errors.contactNo && (
                  <div className="mt-1 text-sm text-red-500">{formik.errors.contactNo}</div>
                )}
              </div>

              <div className="col-span-12 md:col-span-6">
                <label className="block text-lg font-medium text-gray-700">City:</label>
                <input
                  type="text"
                  name="city"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                />
                {formik.touched.city && formik.errors.city && (
                  <div className="mt-1 text-sm text-red-500">{formik.errors.city}</div>
                )}
              </div>

              <div className="col-span-12 md:col-span-6">
                <label className="block text-lg font-medium text-gray-700">Country:</label>
                <input
                  type="text"
                  name="country"
                  value={formik.values.country}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                />
                {formik.touched.country && formik.errors.country && (
                  <div className="mt-1 text-sm text-red-500">{formik.errors.country}</div>
                )}
              </div>
              <div className="bg-red-300  col-span-6">
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md 
                hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 
                focus:ring-opacity-50"

                >
                  Add Student
                </button>
              </div>
            </form>
          </>
        </Modal.Window>
      </Modal>
    </>

  );
}

function NewTable({ data, columns }: any) {

  // if (!table || !table?.getHeaderGroups || !table?.getRowModel) {
  //   alert('true')
  //   return <div className="text-red-500">Invalid table data</div>;
  // }

  // console.log(table, "TABLEDATA");

  // console.log(table?.getRowModel(), "NE", "TABLEDATA")
  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() });

  return (

    <div className="w-full bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center p-6 border-b border-gray-200">
        <div className="flex items-center gap-2">

          <h1 className="text-2xl font-semibold text-gray-800">My Table</h1>

          <span className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-full">
            Active
          </span>

        </div>
      </div>
      {/* {JSON.stringify(data)} */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 shadow-md rounded-lg">

          <thead className="bg-gray-50">
            {table?.getHeaderGroups()?.map((headerGroup: any) => (
              <tr key={headerGroup?.id} className="border-b border-gray-200">
                {headerGroup?.headers?.map((header: any) => (
                  <th
                    key={header?.id}
                    className="p-4 text-left font-medium text-gray-700 text-base"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>

            {table.getRowModel().rows.map((row: any) => (
              <tr
                key={row.id} // Ensure row.id is unique and valid
                className="border-b border-gray-200 hover:bg-gray-100 hover:shadow"
              >
                {row.getVisibleCells().map((cell: any) => (
                  <td
                    key={cell.id} // Ensure cell.id is unique and valid
                    className="p-4 text-gray-800 text-base"
                  >
                    {flexRender(
                      cell.column.columnDef.cell, // Ensure columnDef.cell exists
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

  );
}