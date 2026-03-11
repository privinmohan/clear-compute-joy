import { useState, useCallback, useEffect } from "react";

export interface HistoryEntry {
  expression: string;
  result: string;
}

export function useCalculator() {
  const [display, setDisplay] = useState("0");
  const [expression, setExpression] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [hasResult, setHasResult] = useState(false);

  const evaluate = useCallback((expr: string): string => {
    try {
      // Replace display operators with JS operators
      const sanitized = expr
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/[^0-9+\-*/.() ]/g, "");

      if (!sanitized) return "0";

      // Check for division by zero
      if (/\/\s*0(?!\.)/.test(sanitized) && !/\/\s*0\./.test(sanitized)) {
        return "Error";
      }

      // Use Function constructor for safe eval
      const result = new Function(`"use strict"; return (${sanitized})`)();

      if (!isFinite(result)) return "Error";
      
      // Format result
      const num = parseFloat(result.toPrecision(12));
      return String(num);
    } catch {
      return "Error";
    }
  }, []);

  const inputDigit = useCallback((digit: string) => {
    if (hasResult) {
      setDisplay(digit);
      setExpression("");
      setHasResult(false);
      return;
    }
    setDisplay((prev) => (prev === "0" && digit !== "." ? digit : prev + digit));
  }, [hasResult]);

  const inputDecimal = useCallback(() => {
    if (hasResult) {
      setDisplay("0.");
      setExpression("");
      setHasResult(false);
      return;
    }
    // Find the last number segment
    const parts = display.split(/[+\-×÷]/);
    const lastPart = parts[parts.length - 1];
    if (!lastPart.includes(".")) {
      setDisplay((prev) => prev + ".");
    }
  }, [display, hasResult]);

  const inputOperator = useCallback((op: string) => {
    setHasResult(false);
    const lastChar = display.slice(-1);
    if (["+", "-", "×", "÷"].includes(lastChar)) {
      setDisplay((prev) => prev.slice(0, -1) + op);
    } else {
      setDisplay((prev) => prev + op);
    }
  }, [display]);

  const calculate = useCallback(() => {
    const result = evaluate(display);
    setExpression(display + " =");
    setHistory((prev) => [{ expression: display, result }, ...prev].slice(0, 20));
    setDisplay(result);
    setHasResult(true);
  }, [display, evaluate]);

  const clear = useCallback(() => {
    setDisplay("0");
    setExpression("");
    setHasResult(false);
  }, []);

  const deleteLast = useCallback(() => {
    if (hasResult) {
      clear();
      return;
    }
    setDisplay((prev) => (prev.length === 1 ? "0" : prev.slice(0, -1)));
  }, [hasResult, clear]);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  // Keyboard support
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key >= "0" && e.key <= "9") inputDigit(e.key);
      else if (e.key === ".") inputDecimal();
      else if (e.key === "+") inputOperator("+");
      else if (e.key === "-") inputOperator("-");
      else if (e.key === "*") inputOperator("×");
      else if (e.key === "/") { e.preventDefault(); inputOperator("÷"); }
      else if (e.key === "Enter" || e.key === "=") calculate();
      else if (e.key === "Backspace") deleteLast();
      else if (e.key === "Escape") clear();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [inputDigit, inputDecimal, inputOperator, calculate, deleteLast, clear]);

  return {
    display,
    expression,
    history,
    inputDigit,
    inputDecimal,
    inputOperator,
    calculate,
    clear,
    deleteLast,
    clearHistory,
  };
}
