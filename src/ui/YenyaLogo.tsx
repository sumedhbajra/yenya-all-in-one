import { useSidebar } from "./AppLayout";

export default function YenyaLogo() {
  const { expanded } = useSidebar();
  return (
    <div className="flex justify-center text-center">
      <img
        className={`h-48  ${expanded ? "w-auto" : "w-0"}`}
        src="src\assets\yenya-logo.jpg"
        alt="yenya image"
      />
    </div>
  );
}
