import { NavLink } from "react-router-dom";
import { AiOutlineTool, AiOutlineUser } from "react-icons/ai";

export default function MainNav() {
  const navLinkClass: string = `
    flex items-center gap-3 
    text-gray-600 
    p-6 transition-all 
    hover:text-gray-800 hover:bg-gray-50 
    hover:rounded-md
    text-3xl
  `;

  const activeClass: string = `
    text-gray-800 bg-gray-50 rounded-md
  `;

  return (
    <nav>
      <ul className="flex flex-col gap-3.5">
        <li>
          <NavLink
            className={({ isActive }) =>
              `${navLinkClass} ${isActive ? activeClass : ""}`
            }
            to={"/"}
          >
            <AiOutlineUser />
            <span>My Profile</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            className={({ isActive }) =>
              `${navLinkClass} ${isActive ? activeClass : ""}`
            }
            to={"/m1-week4"}
          >
            <AiOutlineTool />
            <span>M1 Week 4</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            className={({ isActive }) =>
              `${navLinkClass} ${isActive ? activeClass : ""}`
            }
            to={"/m2-week1"}
          >
            <AiOutlineTool />
            <span>M2 Week 1</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            className={({ isActive }) =>
              `${navLinkClass} ${isActive ? activeClass : ""}`
            }
            to={"/m2-week2"}
          >
            <AiOutlineTool />
            <span>M2 Week 2</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            className={({ isActive }) =>
              `${navLinkClass} ${isActive ? activeClass : ""}`
            }
            to={"/m2-week3"}
          >
            <AiOutlineTool />
            <span>M2 Week 3</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            className={({ isActive }) =>
              `${navLinkClass} ${isActive ? activeClass : ""}`
            }
            to={"/m2-week4"}
          >
            <AiOutlineTool />
            <span>M2 Week 4</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
