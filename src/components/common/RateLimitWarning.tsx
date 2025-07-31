import { AlertTriangle, AlertCircle } from 'lucide-react';
import { cn } from '../../utils/helpers';
import type { RateLimitInfo } from '../../types/payment';

interface RateLimitWarningProps {
  rateLimitInfo: RateLimitInfo;
  className?: string;
}

export function RateLimitWarning({ rateLimitInfo, className }: RateLimitWarningProps) {
  if (!rateLimitInfo.isNearLimit && !rateLimitInfo.isAtLimit) {
    return null;
  }

  const isAtLimit = rateLimitInfo.isAtLimit;
  const Icon = isAtLimit ? AlertCircle : AlertTriangle;
  
  return (
    <div className={cn(
      'flex items-center gap-2 p-3 rounded-lg border',
      isAtLimit 
        ? 'bg-red-50 border-red-200 text-red-800' 
        : 'bg-yellow-50 border-yellow-200 text-yellow-800',
      className
    )}>
      <Icon className="w-5 h-5 flex-shrink-0" />
      <div className="flex-1">
        <p className="font-medium">
          {isAtLimit ? 'Rate Limit Reached' : 'Approaching Rate Limit'}
        </p>
        <p className="text-sm opacity-90">
          Current TPS: {rateLimitInfo.currentTPS.toFixed(1)} / {rateLimitInfo.maxTPS}
        </p>
      </div>
    </div>
  );
} 