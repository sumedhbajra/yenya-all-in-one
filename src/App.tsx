import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Dashboard from "./pages/Dashboard";
import M2Week1 from "./pages/M2Week1";
import M2Week2 from "./pages/M2Week2";
import M2Week3 from "./pages/M2Week3";
import M2Week4 from "./pages/M2Week4";
import M1Week4 from "./pages/M1Week4";
import TableInfo from "./features/employee/TableInfo";
import FormLayout from "./features/employee/FormLayout";
import { useEffect, useState } from "react";
import { getAllEmployee } from "./services/apiEmployee";
import { useQuery } from "@tanstack/react-query";
import { useReactTable } from "@tanstack/react-table";


function App() {
  const [myData, setData] = useState([]);
  const [dataUpdate, setDataUpdate] = useState(0);



  const getAll = async () => {
    const data = await getAllEmployee();
    setData(data);
    // setGotData((e) => !e);

    return data;
  };

  // const { isLoading, error, data } = useQuery({ queryKey: 'employee' }
  //   , getAll
  // );


  const { isLoading, error, data } = useQuery({
    queryKey: ['employee'],
    queryFn: getAll
  })

  console.log({ isLoading });
  console.log({ error });
  console.log({ data });
  console.log({ myData });


  // useEffect(() => {
  //   getAll();
  // }, [dataUpdate]);

  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="m1-week4" element={<M1Week4 />} />
            <Route path="m2-week1" element={<M2Week1 />}>
              <Route index element={<Navigate replace to="table" />} />
              <Route
                path="table"
                element={
                  <TableInfo
                    myData={data ?? []}
                    setDataUpdate={setDataUpdate}
                  />
                }
              />
              <Route
                path="form"
                element={<FormLayout setDataUpdate={setDataUpdate} />}
              />
            </Route>
            <Route path="m2-week2" element={<M2Week2 />} />
            <Route path="m2-week3" element={<M2Week3 />} />
            <Route path="m2-week4" element={<M2Week4 />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
