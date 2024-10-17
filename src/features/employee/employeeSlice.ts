import {
  createEmployee,
  deleteEmployeeAPI,
  updateEmployeeAPI,
} from "../../services/apiEmployee";

interface EmployeeProp {
  id: number | string;
}

const initialState: EmployeeProp[] = [];

interface ActionProp {
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any;
}

export default async function employeeReducer(
  state: EmployeeProp[] = initialState, // Provide default here
  action: ActionProp
) {
  switch (action.type) {
    case "employee/create":
      createEmployee(action.payload);
      console.log("Employee Created !!");
      return state;
    case "employee/update":
      updateEmployeeAPI(action.payload);
      console.log("Employee Updated!!!");
      return state;
    case "employee/delete":
      deleteEmployeeAPI(action.payload);
      console.log("Employee Deleted!!!");
      return state;
    default:
      return state;
  }
}

export function getAllEmployees() {
  return { type: "employee/getAllEmployee" };
}

export type EmployeeType = {
  employeeId: string;
  fullName: string;
  age: number;
  university: string;
  dob: string;
  email: string;
  gender: "male" | "female"; // Only male or female
  role: "front-end" | "back-end" | "database" | "figma" | "qa";
  position: "intern" | "trainee" | "junior" | "mid" | "senior";
  contactNo: string;
  id: string;
};

export function createNewEmployee(newObj: EmployeeType) {
  return { type: "employee/create", payload: newObj };
}

export function updateEmployee(newObj: EmployeeType) {
  console.log(newObj);
  return { type: "employee/update", payload: newObj };
}

export function deleteEmployee(id: string) {
  return { type: "employee/delete", payload: id };
}
