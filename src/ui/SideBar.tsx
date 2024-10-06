import YenyaLogo from "./YenyaLogo";
import MainNav from "./MainNav";

export default function SideBar() {
  return (
    <div className="flex flex-col row-span-full px-12 py-10 border-r-2 border-grey gap-6">
      <YenyaLogo />
      <MainNav />
    </div>
  );
}
