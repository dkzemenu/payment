export type PaymentStatus = "PENDING" | "COMPLETED" | "FAILED" | "IN_PROGRESS";
export interface Payment {
  id: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  createdAt: Date;
  updatedAt: Date;
  recipientName: string;
  recipentAccountNumber: string;
  errorMessage?: string;
  processingTime?: number; // in millisecond
  retryCount?: number; // number of retries if applicable
}

export interface CreatePaymentRequest {
  paymentId: string;
  amount: number;
  currency: string;
  recipientName: string;
  recipientAccountNumber: string;
}
export interface PaymentAnaytics {
  statusCount: Record<PaymentStatus, number>;
  averageProcessingTime: number; // in milliseconds
  totalPayments: number;
  currentTPS: number; // Transactions Per Second
}
export interface RateLimitInfo {
  currentTPS: number; // Current Transactions Per Second
  maxTPS: number; // Maximum Transactions Per Second allowed
  isNearLimit: boolean; // Whether the current TPS is near the limit
  isAtLimit: boolean; // Whether the current TPS has reached the limit
}
