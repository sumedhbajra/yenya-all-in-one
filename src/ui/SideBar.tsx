import MainNav from "./MainNav";

import { ChevronFirst, ChevronLast, MoreVertical } from "lucide-react";
import YenyaLogo from "./YenyaLogo";
import { SidebarContextProp, useSidebar } from "./AppLayout";

export default function SideBar() {
  const { expanded, setExpanded }: SidebarContextProp = useSidebar();
  return (
    <div className="row-span-full">
      <aside className="h-screen">
        <nav className="h-full flex flex-col justify-between bg-white border-r shadow-sm">
          <div>
            <div className="p-4 pb-2 flex justify-between items-center">
              <YenyaLogo />
              <button
                className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
                onClick={() => setExpanded((curr: boolean) => !curr)}
              >
                {expanded ? <ChevronFirst /> : <ChevronLast />}
              </button>
            </div>
            <MainNav />
          </div>
          <div className={`border-t flex p-3 ${expanded ? "" : "w-0"}`}>
            <YenyaLogo />
            <div
              className={`flex justify-between items-center overflow-hidden transition-all ${
                expanded ? "w-52 ml-3" : "w-0"
              }`}
            >
              <div className="leading-4">
                <h4 className="font-semibold">Sumedh R. Bajracharya</h4>
                <span className="text-xs text-gray-600">sumedh@gmail.com</span>
              </div>
              <MoreVertical size={20} />
            </div>
          </div>
        </nav>
      </aside>
    </div>
  );
}

// export default function SideBar1({ children }) {
//   const { expanded, setExpanded } = useSidebar();

//   return (
//     <div className={`row-span-full`}>
//       <aside className="h-screen">
//         <nav className="h-full flex flex-col bg-white border-r shadow-sm">
//           <div className="p-4 pb-2 flex justify-between items-center">
//             <img
//               className={`h-48 w-auto overflow-hidden transition-all ${
//                 expanded ? "w-48" : "w-0"
//               }`}
//               src="src\assets\yenya-logo.jpg"
//               alt="yenya image"
//             />
//             <button
//               className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
//               onClick={() => setExpanded((curr) => !curr)}
//             >
//               {expanded ? <ChevronFirst /> : <ChevronLast />}
//             </button>
//           </div>

//           <ul className="flex-1 px-3">{children}</ul>

//           <div className={`border-t flex p-3 ${expanded ? "" : "w-0"}`}>
//             <YenyaLogo />
//             <div
//               className={`flex justify-between items-center overflow-hidden transition-all ${
//                 expanded ? "w-52 ml-3" : "w-0"
//               }`}
//             >
//               <div className="leading-4">
//                 <h4 className="font-semibold">Sumedh R. Bajracharya</h4>
//                 <span className="text-xs text-gray-600">sumedh@gmail.com</span>
//               </div>
//               <MoreVertical size={20} />
//             </div>
//           </div>
//         </nav>
//       </aside>
//     </div>
//   );
// }

/**
 * <SideBar>
 *  <SidebarItem icon={<Home size={20}/>} text="Home" alert or active />
 *  <SidebarItem />
 *  <SidebarItem />
 * <hr className="my-3" />
 *  <SidebarItem />
 * </SideBar />
 */

// export function SidebarItem({ icon, text, active, alert }) {
//   const { expanded } = useSidebar();
//   return (
//     <li
//       className={`relative flex items-center
//     font-medium rounded-md cursor-pointer transition-colors py-2 px-3 my-10
//     ${
//       active
//         ? "bg-gradient-to-tr from-orange-200 to-orange-100 text-orange-800"
//         : "hover:bg-orange-50 text-gray-600"
//     }`}
//     >
//       {icon}
//
//       {alert && (
//         <div
//           className={`absolute right-2 w-2 h-2 rounded bg-orange-400
//           ${expanded ? "" : "top-2"}
//           `}
//         ></div>
//       )}

//       {!expanded && (
//         <div
//           className={`absolute left-full rounded-md px-2 py-1 ml-6
//              bg-orange-100 text-orange-800 text-base invisible opacity-20
//              -translate-x-3 transition-all group-hover:visible
//               group-hover:opacity-100 group-hover:translate-x-0`}
//         >
//           {text}
//         </div>
//       )}
//     </li>
//   );
// }
