import { cn } from "@/lib/utils";

type CalcButtonVariant = "number" | "operator" | "function" | "equals";

interface CalcButtonProps {
  label: string;
  onClick: () => void;
  variant?: CalcButtonVariant;
  span?: number;
}

const variantClasses: Record<CalcButtonVariant, string> = {
  number: "bg-calc-number hover:bg-calc-number-hover text-foreground",
  operator: "bg-calc-operator hover:bg-calc-operator-hover text-primary-foreground font-semibold",
  function: "bg-calc-function hover:bg-calc-function-hover text-foreground",
  equals: "bg-calc-operator hover:bg-calc-operator-hover text-primary-foreground font-semibold",
};

export default function CalcButton({ label, onClick, variant = "number", span = 1 }: CalcButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-2xl text-xl font-medium select-none calc-btn-press",
        "flex items-center justify-center h-16 sm:h-[72px]",
        "shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        variantClasses[variant],
        span === 2 && "col-span-2"
      )}
    >
      {label}
    </button>
  );
}
