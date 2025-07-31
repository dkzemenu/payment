import { useState } from "react";
import { RefreshCw, AlertCircle } from "lucide-react";
import { cn } from "../../utils/helpers";

interface RetryButtonProps {
  onRetry: () => Promise<void>;
  disabled?: boolean;
  className?: string;
}

export function RetryButton({
  onRetry,
  disabled,
  className,
}: RetryButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleRetry = async () => {
    setIsLoading(true);
    try {
      await onRetry();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleRetry}
      disabled={disabled || isLoading}
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
        "bg-orange-100 text-orange-700 hover:bg-orange-200 disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
    >
      {isLoading ? (
        <RefreshCw className="w-4 h-4 animate-spin" />
      ) : (
        <AlertCircle className="w-4 h-4" />
      )}
      {isLoading ? "Retrying..." : "Retry Payment"}
    </button>
  );
}
