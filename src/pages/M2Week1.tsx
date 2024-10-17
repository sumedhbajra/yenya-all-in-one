import { NavLink, Outlet, useSearchParams } from "react-router-dom";

interface OptionProp {
  value: string;
  label: string;
}

interface FilterProp {
  filterField: string;
  options: OptionProp[];
}

export default function M2Week1() {
  return (
    <>
      <div className="flex justify-between ">
        <h2>CRUD Operation & Table</h2>
        <div>
          <TableOperation />
        </div>
      </div>
      {/* <div className="h-full">{element}</div> */}
      <div className="h-full">
        <Outlet />
      </div>
    </>
  );
}

function TableOperation() {
  return (
    <div>
      <Filter
        filterField="show"
        options={[
          { value: "table", label: "Table" },
          { value: "form", label: "Form" },
        ]}
      />
    </div>
  );
}

function Filter({ filterField, options }: FilterProp) {
  const [searchParams, setSearchParams] = useSearchParams();
  const show = searchParams.get(filterField) || options[0].value;

  return (
    <div className="flex gap-10 border-2 bg-gray-50 shadow-sm shadow-stale-500 rounded-md p-1.5 px-3">
      {options.map((option, key) => (
        <NavLink to={option.value}>
          <button
            className={`${
              show === option.value ? "bg-orange-600 text-white" : ""
            } border-0 rounded-md font-medium text-2xl px-3 py-2 
          hover:bg-orange-600 hover:text-white
          disabled:bg-orange-600 transition-color duration-300
          `}
            key={key}
            onClick={() => {
              searchParams.set(filterField, option.value);
              setSearchParams(searchParams);
            }}
            disabled={option.value === show}
          >
            {option.label}
          </button>
        </NavLink>
      ))}
    </div>
  );
}
