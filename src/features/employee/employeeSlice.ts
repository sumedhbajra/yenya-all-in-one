interface EmployeeProp {
  id: number | string;
}

const initialState: EmployeeProp = { id: "" };

interface ActionProp {
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any;
}

export default function employeeReducer(
  state: EmployeeProp = initialState, // Provide default here
  action: ActionProp
) {
  switch (action.type) {
    case "employee/create":
      console.log("Employee Created !!");
      return state;
    case "employee/getAllEmployee":
      return state;
    case "employee/update":
      console.log("Employee Updated!!!");
      return state;
    case "employee/deleteEmployee":
      console.log("Employee Deleted!!!");
      return state;
    default:
      return state;
  }
}

// export function getAllEmployees() {
//   return {};
// }

export function createNewEmployee(id: number) {
  return { type: "employee/create", payload: id };
}

export function updateEmployee(id: number) {
  return { type: "employee/update", payload: id };
}

export function deleteEmployee(id: number) {
  return { type: "employee/delete", payload: id };
}
