import type { HistoryEntry } from "@/hooks/useCalculator";
import { Clock, Trash2, X } from "lucide-react";

interface CalcHistoryProps {
  history: HistoryEntry[];
  onClear: () => void;
  onClose: () => void;
}

export default function CalcHistory({ history, onClear, onClose }: CalcHistoryProps) {
  return (
    <div className="bg-calc-surface rounded-2xl p-4 shadow-lg w-full max-w-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-muted-foreground text-sm font-medium">
          <Clock size={16} />
          History
        </div>
        <div className="flex gap-1">
          {history.length > 0 && (
            <button onClick={onClear} className="p-1.5 rounded-lg hover:bg-accent text-muted-foreground" title="Clear history">
              <Trash2 size={14} />
            </button>
          )}
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-accent text-muted-foreground">
            <X size={14} />
          </button>
        </div>
      </div>
      {history.length === 0 ? (
        <p className="text-muted-foreground text-xs text-center py-6">No calculations yet</p>
      ) : (
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {history.map((entry, i) => (
            <div key={i} className="bg-calc-history-bg rounded-xl px-3 py-2">
              <div className="text-xs text-calc-expression font-mono truncate">{entry.expression}</div>
              <div className="text-sm font-mono font-semibold text-foreground truncate">= {entry.result}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
