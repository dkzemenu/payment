export type PaymentStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';

export interface Payment {
  id: string;
  amount: number;
  currency: string;
  recipientName: string;
  recipientAccountNumber: string;
  status: PaymentStatus;
  createdAt: string;
  updatedAt: string;
  errorMessage?: string;
  processingTime?: number; // in milliseconds
  retryCount: number;
}

export interface CreatePaymentRequest {
  paymentId: string;
  amount: number;
  currency: string;
  recipientName: string;
  recipientAccountNumber: string;
}

export interface PaymentAnalytics {
  statusCounts: Record<PaymentStatus, number>;
  averageProcessingTime: number;
  currentTPS: number;
  totalPayments: number;
}

export interface RateLimitInfo {
  currentTPS: number;
  maxTPS: number;
  isNearLimit: boolean;
  isAtLimit: boolean;
} 