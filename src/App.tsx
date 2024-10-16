import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Dashboard from "./pages/Dashboard";
import M1Week4 from "./pages/m1week4";
import M2Week1 from "./pages/M2Week1";
import M2Week2 from "./pages/M2Week2";
import M2Week3 from "./pages/M2Week3";
import M2Week4 from "./pages/M2Week4";

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="m1-week4" element={<M1Week4 />} />
            <Route path="m2-week1" element={<M2Week1 />} />
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
