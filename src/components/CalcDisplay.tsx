import { useRef, useEffect } from "react";

interface CalcDisplayProps {
  expression: string;
  display: string;
}

export default function CalcDisplay({ expression, display }: CalcDisplayProps) {
  const displayRef = useRef<HTMLDivElement>(null);

  // Auto-shrink text when display overflows
  useEffect(() => {
    const el = displayRef.current;
    if (!el) return;
    const len = display.length;
    if (len > 16) el.style.fontSize = "1.5rem";
    else if (len > 12) el.style.fontSize = "2rem";
    else if (len > 8) el.style.fontSize = "2.5rem";
    else el.style.fontSize = "";
  }, [display]);

  return (
    <div className="bg-calc-display rounded-2xl p-5 sm:p-6 min-h-[120px] flex flex-col justify-end shadow-inner">
      <div className="text-calc-expression text-sm font-mono text-right min-h-[1.25rem] truncate">
        {expression}
      </div>
      <div
        ref={displayRef}
        className="text-calc-display-text text-4xl sm:text-5xl font-mono font-semibold text-right truncate mt-1"
      >
        {display}
      </div>
    </div>
  );
}
