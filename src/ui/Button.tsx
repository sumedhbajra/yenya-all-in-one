type Size = "small" | "medium" | "large";
type Variation = "primary" | "secondary" | "danger";

function getSizeClasses(size: Size) {
  switch (size) {
    case "small":
      return "text-xl px-2 py-1 font-semibold uppercase text-center";
    case "medium":
      return "text-2xl px-4 py-3 font-medium";
    case "large":
      return "text-3xl px-6 py-3 font-medium";
    default:
      return "text-base px-4 py-3 font-medium";
  }
}

function getVariationClasses(variation: Variation) {
  switch (variation) {
    case "primary":
      return "text-brand-50 bg-brand-600 hover:bg-brand-700";
    case "secondary":
      return "text-gray-600 bg-gray-50 border border-gray-200 hover:bg-gray-100";
    case "danger":
      return "text-red-100 bg-red-700 hover:bg-red-800";
    default:
      return "text-brand-50 bg-brand-600 hover:bg-brand-700";
  }
}
export interface ButtonProps
  extends React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    React.AriaAttributes {}

export default function Button({
  size = "medium",
  variation = "primary",
  text,
  ...props
}: {
  size?: Size;
  variation?: Variation;
  text: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  //   const { ...rest } = props;
  const sizeClasses: string = getSizeClasses(size);
  const variationClasses: string = getVariationClasses(variation);

  return (
    <button
      className={`rounded-md shadow-sm ${sizeClasses} ${variationClasses} border-none`}
      {...props}
    >
      {text}
    </button>
  );
}
