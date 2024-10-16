import { combineReducers, createStore } from "redux";
import employeeReducer from "./features/employee/employeeSlice";

const rootReducer = combineReducers({
  employee: employeeReducer,
});

const store = createStore(rootReducer);

export default store;
