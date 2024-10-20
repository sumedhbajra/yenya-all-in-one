type Size = "small" | "medium" | "large";

export default function Header({
  title,
  children,
  size = "small",
}: {
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children?: any;
  size?: Size;
}) {
  return (
    <div className="px-5 py-10 border-b-4 border-grey-500 flex justify-between items-center ">
      <h1
        className={`text-${
          size === "small" ? "2xl" : size === "medium" ? "3xl" : "4xl"
        }`}
      >
        {title}
      </h1>
      <span>{children}</span>
    </div>
  );
}
