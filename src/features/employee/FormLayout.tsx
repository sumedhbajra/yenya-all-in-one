import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import {
  createNewEmployee,
  EmployeeType,
  updateEmployee,
} from "./employeeSlice";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export interface EmployeeProp {
  employeeId?: string;
  fullName?: string;
  age?: number;
  university?: string;
  dob?: string;
  email?: string;
  gender?: "male" | "female";
  role?: "front-end" | "back-end" | "database" | "figma" | "qa";
  position?: "intern" | "trainee" | "junior" | "mid" | "senior";
  contactNo?: string;
  id?: string;
}

export default function FormLayout({
  employee,
  close,
  setDataUpdate,
}: {
  employee?: EmployeeProp | null | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  close?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setDataUpdate: any;
}) {
  const dispatch = useDispatch();

  const formik = useFormik<EmployeeType>({
    initialValues: {
      employeeId: employee?.employeeId || uuidv4(),
      fullName: employee?.fullName || "",
      age: employee?.age || 0,
      university: employee?.university || "",
      dob: employee?.dob || new Date().toISOString(),
      email: employee?.email || "",
      gender: employee?.gender || "male",
      role: employee?.role || "front-end",
      position: employee?.position || "intern",
      contactNo: employee?.contactNo || "",
      id: employee?.id || "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .min(3, "Name cannot contain only 3 letters.")
        .required("Please provide the name."),
      age: Yup.number()
        .max(105, "Invalid Age")
        .min(18, "Invalid Age, must be above 18")
        .required("Please provide the age."),
      university: Yup.string(),

      dob: Yup.date()
        .required("Please provide the date of birth.")
        .max(new Date(), "Date of birth cannot be in the future."),

      email: Yup.string()
        .email("Invalid email address")
        .required("Please provide an email address."),

      gender: Yup.string()
        .oneOf(["male", "female"], "Invalid gender selection")
        .required("Please select a gender."),

      role: Yup.string()
        .oneOf(
          ["front-end", "back-end", "database", "figma", "qa"],
          "Invalid role selection"
        )
        .required("Please select a role."),

      position: Yup.string()
        .oneOf(
          ["intern", "trainee", "junior", "mid", "senior"],
          "Invalid position selection"
        )
        .required("Please select a position."),

      contactNo: Yup.string()
        .matches(/^[0-9]+$/, "Contact number must contain only digits.")
        .min(7, "Contact number must be at least 7 digits.")
        .max(15, "Contact number cannot exceed 15 digits.")
        .required("Please provide a contact number."),
    }),
    onSubmit: (values) => {
      if (employee) {
        dispatch(updateEmployee(values));
        setDataUpdate((e: number) => e + 1);
        close();
      } else {
        dispatch(createNewEmployee({ ...values, id: uuidv4() }));
        setDataUpdate((e: number) => e + 1);
        navigate("/m2-week1/table");
      }
    },
  });

  const navigate = useNavigate();

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
    isSubmitting,
  } = formik;
  const errorcss: string = "text-red-700 mt-1 block";
  return (
    <div className="h-full">
      <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-8 p-4">
        {/* Full Name */}
        <div className="col-span-8">
          <label htmlFor="fullName" className="block font-medium">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            id="fullName"
            value={values.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            onBlur={handleBlur}
            disabled={isSubmitting}
            className="w-full border border-gray-300 bg-gray-50 
            rounded shadow-sm p-3 mt-1"
          />
          {touched.fullName && errors.fullName && (
            <span className={errorcss}>{errors.fullName}</span>
          )}
        </div>

        {/* Age */}
        <div className="col-span-4">
          <label htmlFor="age" className="block font-medium">
            Age
          </label>
          <input
            type="number"
            name="age"
            id="age"
            value={values.age}
            onChange={handleChange}
            placeholder="Age"
            onBlur={handleBlur}
            disabled={isSubmitting}
            className="w-full border border-gray-300 bg-gray-50 rounded shadow-sm p-3 mt-1"
          />
          {touched.age && errors.age && (
            <span className={errorcss}>{errors.age}</span>
          )}
        </div>

        {/* Email */}
        <div className="col-span-4">
          <label htmlFor="email" className="block font-medium">
            E-mail
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="abc@gmail.com"
            disabled={isSubmitting}
            className="w-full border border-gray-300 bg-gray-50 shadow-sm p-3 mt-1"
          />
          {touched.email && errors.email && (
            <span className={errorcss}>
              {errors.email} {touched.email}
            </span>
          )}
        </div>

        {/* University */}
        <div className="col-span-4">
          <label htmlFor="university" className="block font-medium">
            University
          </label>
          <input
            type="text"
            name="university"
            id="university"
            value={values.university}
            onChange={handleChange}
            placeholder="University"
            onBlur={handleBlur}
            disabled={isSubmitting}
            className="w-full border border-gray-300 bg-gray-50 rounded shadow-sm p-3 mt-1"
          />
          {touched.university && errors.university && (
            <span className={errorcss}>{errors.university}</span>
          )}
        </div>

        {/* Date of Birth */}
        <div className="col-span-4">
          <label htmlFor="dob" className="block font-medium">
            Date of Birth
          </label>
          <input
            type="date"
            name="dob"
            id="dob"
            value={values.dob}
            onChange={handleChange}
            placeholder="Date of Birth"
            onBlur={handleBlur}
            disabled={isSubmitting}
            className="w-full border border-gray-300 bg-gray-50 rounded shadow-sm p-3 mt-1"
          />
          {touched.dob && errors.dob && (
            <span className={errorcss}>{errors.dob}</span>
          )}
        </div>

        {/* Gender */}
        <div className="col-span-4">
          <label className="block font-medium">Gender</label>
          <div className="flex items-center gap-4 mt-1">
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={values.gender === "male"}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isSubmitting}
                className="mr-1"
              />
              Male
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={values.gender === "female"}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isSubmitting}
                className="mr-1"
              />
              Female
            </label>
          </div>
          {touched.gender && errors.gender && (
            <span className={errorcss}>{errors.gender}</span>
          )}
        </div>

        {/* Contact Number */}
        <div className="col-span-4">
          <label htmlFor="contactNo" className="block font-medium">
            Contact Number
          </label>
          <input
            type="text"
            name="contactNo"
            id="contactNo"
            value={values.contactNo}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Contact Number"
            disabled={isSubmitting}
            className="w-full border border-gray-300 bg-gray-50 rounded shadow-sm p-3 mt-1"
          />
          {touched.contactNo && errors.contactNo && (
            <span className={errorcss}>{errors.contactNo}</span>
          )}
        </div>

        {/* Role */}
        <div className="col-span-4">
          <label htmlFor="role" className="block font-medium">
            Role
          </label>
          <input
            type="text"
            name="role"
            id="role"
            onBlur={handleBlur}
            value={values.role}
            onChange={handleChange}
            placeholder="Role"
            disabled={isSubmitting}
            className="w-full border border-gray-300 bg-gray-50 rounded shadow-sm p-3 mt-1"
          />
          {touched.role && errors.role && (
            <span className={errorcss}>{errors.role}</span>
          )}
        </div>

        {/* Position */}
        <div className="col-span-4">
          <label htmlFor="position" className="block font-medium">
            Position
          </label>
          <input
            type="text"
            name="position"
            id="position"
            value={values.position}
            onChange={handleChange}
            placeholder="Position"
            onBlur={handleBlur}
            disabled={isSubmitting}
            className="w-full border border-gray-300 bg-gray-50 rounded shadow-sm p-3 mt-1"
          />
          {touched.position && errors.position && (
            <span className={errorcss}>{errors.position}</span>
          )}
        </div>

        {/* Submit Button */}
        <div className="col-span-12 flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-orange-600 text-white
           border-0 rounded-md font-medium text-3xl px-3 py-2 
          hover:bg-orange-700
          disabled:bg-orange-600 transition-color duration-300"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

/**
 * 1. Radio
 * 2. Input
 * 3. datepicker
 * 4. checkbox
 */

/**
 * Employee ID
 * Full Name
 * Age
 * University
 * DOB (datepicker)
 * Gender
 * e-mail
 * Role (enum)
 * Position
 * Contact No.
 */
// YenyaSoft Employees
