const BASEURL: string = "http://localhost:9000";
// Get All Employee
export async function getAllEmployee() {
  try {
    const res = await fetch(`${BASEURL}/employee`);
    if (!res.ok) throw new Error("Data isn't fetched.");

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
}

export function createEmployee() {}

// Get One Employee
export function getEmployee() {
  return;
}

// Update Employee
export function updateEmployee() {
  return;
}

// Delete Employee
export function deleteEmployee() {
  return;
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
