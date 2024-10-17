import { EmployeeType } from "../features/employee/employeeSlice";

const BASEURL: string = "http://localhost:9000";

// Get All Employee
export function getAllEmployee() {
  try {
    async function getData() {
      const res = await fetch(`${BASEURL}/employee`);
      if (!res.ok) throw new Error("Data isn't fetched.");

      const data = await res.json();

      return data;
    }

    return getData();
  } catch (error) {
    console.log(error);
  }
}

export async function createEmployee(data: EmployeeType) {
  try {
    const res = await fetch(`${BASEURL}/employee`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }
  } catch (error) {
    console.log(error);
  }
}

// Get One Employee
// export async function getEmployee(data: EmployeeType) {
//   try {
//     const res = await fetch(`${BASEURL}/employee`, {
//       method: "PATCH",
//       body: JSON.stringify(data),
//     });
//   } catch (error) {
//     console.log(error);
//   }
// }

// Update Employee
export function updateEmployeeAPI(data: EmployeeType) {
  try {
    async function getData() {
      const response = await fetch(`${BASEURL}/employee/${data.id}`, {
        method: "PUT", // Use PATCH for partial updates
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      console.log(response);

      if (response.ok) {
        getAllEmployee();
        const data = await response.json();
        console.log("Employee updated successfully:", data);
      } else {
        console.error("Failed to update employee");
      }
    }
    getData();
  } catch (error) {
    console.error("Error updating employee:", error);
  }
}

// Delete Employee
export function deleteEmployeeAPI(id: string) {
  try {
    async function deleteData() {
      const res = await fetch(`${BASEURL}/employee/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      }
    }
    deleteData();
  } catch (error) {
    console.error("Error while deleting employee:", error);
  }
}

// async function fetchEmployee() {
//     dispatch({ type: "loading" });
//     try {
//       const res = await fetch(`${BASEURL}/cities`, {
//         // signal: controller,
//       });

//       if (!res.ok) {
//         console.log("Error loading data");
//         throw new Error("Data isn't fetched.");
//       }
//       const data = await res.json();

//       dispatch({ type: "cities/loaded", payload: data });
//       console.log(data[1]);
//     } catch (error) {
//       dispatch({
//         type: "rejected",
//         payload: "There was an error loading data...",
//       });
//     }
//   }

//   async function getCity(id) {
//     if (Number(id) === currentCity.id) return;
//     dispatch({ type: "loading" });
//     try {
//       const res = await fetch(`${BASEURL}/cities/${id}`);

//       if (!res.ok) {
//         console.log("Error loading data");
//         throw new Error("Data isn't fetched.");
//       }
//       const data = await res.json();
//       dispatch({ type: "city/loaded", payload: data });
//     } catch (error) {
//       dispatch({ type: "rejected", payload: "There was an error" });
//       alert(error);
//     }
//   }

//   async function createCity(newCity) {
//     dispatch({ type: "loading" });
//     try {
//       const res = await fetch(`${BASEURL}/cities`, {
//         method: "POST",
//         body: JSON.stringify(newCity),
//         headers: {
//           "Content-Type": "application.json",
//         },
//       });
//       const data = res.json();
//       dispatch({ type: "city/created", payload: data });
//       fetchCities();
//     } catch (error) {
//       dispatch({
//         type: "rejected",
//         payload: "There was an error creating city.",
//       });
//     }
//   }

//   async function deleteCity(id) {
//     dispatch({ type: "loading" });
//     try {
//       await fetch(`${BASEURL}/cities/${id}`, {
//         method: "DELETE",
//       });

//       dispatch({ type: "city/deleted", payload: id });
//     } catch (error) {
//       dispatch({
//         type: "rejected",
//         payload: "There was an error creating city.",
//       });
//     }
//   }
