import { NavLink } from "react-router-dom";
import { AiOutlineTool, AiOutlineUser } from "react-icons/ai";
import { useSidebar } from "./AppLayout";

export default function MainNav() {
  const { expanded }: { expanded: boolean } = useSidebar();

  const navLinkClass: string = `
    flex items-center justify-start gap-3 
    text-gray-600 
    p-6 transition-all 
    hover:text-gray-800 hover:bg-gray-50 
    hover:rounded-md
    text-3xl
    mx-5
    rounded-lg
    ${expanded ? "justify-start" : "justify-center"}
    hover:bg-orange-50
  `;

  const activeClass: string = `
    bg-gradient-to-tr from-orange-200 to-orange-100 text-orange-800
  `;

  const hoverClass: string = `hover:bg-orange-50 text-gray-600`;

  const activeNavClass: string = `overflow-hidden transition-all ${
    expanded ? "w-52 ml-3" : "hidden"
  }`;

  {
    /* <li
      className={`relative flex items-center 
    font-medium rounded-md cursor-pointer transition-colors py-2 px-3 my-10
    ${
      active
        ? "bg-gradient-to-tr from-orange-200 to-orange-100 text-orange-800"
        : "hover:bg-orange-50 text-gray-600"
    }`}
    >
      {icon}
  
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-orange-400
          ${expanded ? "" : "top-2"}
          `}
        ></div>
      )}

      {!expanded && (
        <div
          className={`absolute left-full rounded-md px-2 py-1 ml-6
             bg-orange-100 text-orange-800 text-base invisible opacity-20 
             -translate-x-3 transition-all group-hover:visible
              group-hover:opacity-100 group-hover:translate-x-0`}
        >
          {text}
        </div>
      )}
    </li> */
  }

  return (
    <nav>
      <ul className="flex flex-col gap-3.5">
        <li>
          <NavLink
            className={({ isActive }) =>
              `${navLinkClass} ${isActive ? activeClass : hoverClass} `
            }
            to={"/dashboard"}
          >
            <AiOutlineUser />
            <span className={activeNavClass}>My Profile</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            className={({ isActive }) =>
              `${navLinkClass} ${isActive ? activeClass : hoverClass}`
            }
            to={"/m1-week4"}
          >
            <AiOutlineTool />
            <span className={activeNavClass}>M1 Week 4</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            className={({ isActive }) =>
              `${navLinkClass} ${isActive ? activeClass : hoverClass}`
            }
            to={"/m2-week1"}
          >
            <AiOutlineTool />
            <span className={activeNavClass}>M2 Week 1</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            className={({ isActive }) =>
              `${navLinkClass} ${isActive ? activeClass : hoverClass}`
            }
            to={"/m2-week2"}
          >
            <AiOutlineTool />
            <span className={activeNavClass}>M2 Week 2</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            className={({ isActive }) =>
              `${navLinkClass} ${isActive ? activeClass : hoverClass}`
            }
            to={"/m2-week3"}
          >
            <AiOutlineTool />
            <span className={activeNavClass}>M2 Week 3</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            className={({ isActive }) =>
              `${navLinkClass} ${isActive ? activeClass : hoverClass}`
            }
            to={"/m2-week4"}
          >
            <AiOutlineTool />
            <span className={activeNavClass}>M2 Week 4</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
