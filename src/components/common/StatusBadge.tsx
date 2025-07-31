import { PAYMENT_STATUS_CONFIG } from "../../utils/constants";
import { Clock, Loader2, CheckCircle, XCircle } from "lucide-react";
import { cn } from "../../utils/helpers";
import type { PaymentStatus } from "../../types/payment";

interface StatusBadgeProps {
  status: PaymentStatus;
  className?: string;
}

const statusIcons = {
  PENDING: Clock,
  IN_PROGRESS: Loader2,
  COMPLETED: CheckCircle,
  FAILED: XCircle,
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = PAYMENT_STATUS_CONFIG[status];
  const Icon = statusIcons[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border",
        config.color,
        className
      )}
    >
      <Icon className="w-3 h-3" />
      {config.label}
    </span>
  );
}
