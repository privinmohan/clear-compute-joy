import { useState } from "react";
import { useCalculator } from "@/hooks/useCalculator";
import { useTheme } from "@/hooks/useTheme";
import CalcDisplay from "./CalcDisplay";
import CalcButton from "./CalcButton";
import CalcHistory from "./CalcHistory";
import { Sun, Moon, History } from "lucide-react";

export default function Calculator() {
  const calc = useCalculator();
  const { dark, toggle } = useTheme();
  const [showHistory, setShowHistory] = useState(false);

  const buttons = [
    { label: "C", action: calc.clear, variant: "function" as const },
    { label: "⌫", action: calc.deleteLast, variant: "function" as const },
    { label: "%", action: () => calc.inputOperator("%"), variant: "function" as const },
    { label: "÷", action: () => calc.inputOperator("÷"), variant: "operator" as const },

    { label: "7", action: () => calc.inputDigit("7") },
    { label: "8", action: () => calc.inputDigit("8") },
    { label: "9", action: () => calc.inputDigit("9") },
    { label: "×", action: () => calc.inputOperator("×"), variant: "operator" as const },

    { label: "4", action: () => calc.inputDigit("4") },
    { label: "5", action: () => calc.inputDigit("5") },
    { label: "6", action: () => calc.inputDigit("6") },
    { label: "-", action: () => calc.inputOperator("-"), variant: "operator" as const },

    { label: "1", action: () => calc.inputDigit("1") },
    { label: "2", action: () => calc.inputDigit("2") },
    { label: "3", action: () => calc.inputDigit("3") },
    { label: "+", action: () => calc.inputOperator("+"), variant: "operator" as const },

    { label: "0", action: () => calc.inputDigit("0"), span: 2 },
    { label: ".", action: calc.inputDecimal },
    { label: "=", action: calc.calculate, variant: "equals" as const },
  ];

  return (
    <div className="min-h-screen bg-calc-bg flex items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-4">
        {/* Top bar */}
        <div className="flex items-center justify-between px-1">
          <h1 className="text-lg font-semibold text-foreground">Calc</h1>
          <div className="flex gap-1">
            <button
              onClick={() => setShowHistory((s) => !s)}
              className="p-2 rounded-xl hover:bg-accent text-muted-foreground transition-colors"
              title="History"
            >
              <History size={18} />
            </button>
            <button
              onClick={toggle}
              className="p-2 rounded-xl hover:bg-accent text-muted-foreground transition-colors"
              title="Toggle theme"
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>

        {/* History panel */}
        {showHistory && (
          <CalcHistory
            history={calc.history}
            onClear={calc.clearHistory}
            onClose={() => setShowHistory(false)}
          />
        )}

        {/* Display */}
        <CalcDisplay expression={calc.expression} display={calc.display} />

        {/* Button grid */}
        <div className="grid grid-cols-4 gap-3">
          {buttons.map((btn) => (
            <CalcButton
              key={btn.label}
              label={btn.label}
              onClick={btn.action}
              variant={btn.variant || "number"}
              span={btn.span}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
