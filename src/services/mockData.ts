import type {
  Payment,
  PaymentStatus,
  PaymentAnalytics,
  RateLimitInfo,
} from "../types/payment";
import { generatePaymentId } from "../utils/helpers";

const mockPayments: Payment[] = [
  {
    id: "PAY-1703123456789-ABC123DEF",
    amount: 1500.0,
    currency: "USD",
    recipientName: "John Smith",
    recipientAccountNumber: "1234567890",
    status: "COMPLETED",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:32:15Z",
    processingTime: 135000,
    retryCount: 0,
  },
  {
    id: "PAY-1703123456790-DEF456GHI",
    amount: 2500.0,
    currency: "EUR",
    recipientName: "Maria Garcia",
    recipientAccountNumber: "0987654321",
    status: "IN_PROGRESS",
    createdAt: "2024-01-15T10:35:00Z",
    updatedAt: "2024-01-15T10:35:00Z",
    retryCount: 0,
  },
  {
    id: "PAY-1703123456791-GHI789JKL",
    amount: 500.0,
    currency: "BIRR",
    recipientName: "Abebe Kebede",
    recipientAccountNumber: "1122334455",
    status: "PENDING",
    createdAt: "2024-01-15T10:40:00Z",
    updatedAt: "2024-01-15T10:40:00Z",
    retryCount: 0,
  },
  {
    id: "PAY-1703123456792-JKL012MNO",
    amount: 3000.0,
    currency: "USD",
    recipientName: "Sarah Johnson",
    recipientAccountNumber: "5566778899",
    status: "FAILED",
    createdAt: "2024-01-15T10:25:00Z",
    updatedAt: "2024-01-15T10:26:30Z",
    errorMessage: "Insufficient funds in sender account",
    retryCount: 2,
  },
];

let currentTPS = 1.2;

export function getMockPayments(): Payment[] {
  return [...mockPayments];
}

export function addMockPayment(
  payment: Omit<Payment, "id" | "createdAt" | "updatedAt" | "retryCount">
): Payment {
  const newPayment: Payment = {
    ...payment,
    id: generatePaymentId(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    retryCount: 0,
  };

  mockPayments.unshift(newPayment);
  return newPayment;
}

export function updatePaymentStatus(
  paymentId: string,
  status: PaymentStatus,
  errorMessage?: string
): Payment | null {
  const payment = mockPayments.find((p) => p.id === paymentId);
  if (!payment) return null;

  payment.status = status;
  payment.updatedAt = new Date().toISOString();

  if (status === "COMPLETED" && !payment.processingTime) {
    const startTime = new Date(payment.createdAt).getTime();
    const endTime = new Date().getTime();
    payment.processingTime = endTime - startTime;
  }

  if (errorMessage) {
    payment.errorMessage = errorMessage;
  }

  return payment;
}

export function retryPayment(paymentId: string): Payment | null {
  const payment = mockPayments.find((p) => p.id === paymentId);
  if (!payment) return null;

  payment.retryCount = Math.min(payment.retryCount + 1, 3);
  payment.status = "PENDING";
  payment.updatedAt = new Date().toISOString();
  payment.errorMessage = undefined;

  return payment;
}

export function getMockAnalytics(): PaymentAnalytics {
  const statusCounts = mockPayments.reduce((acc, payment) => {
    acc[payment.status] = (acc[payment.status] || 0) + 1;
    return acc;
  }, {} as Record<PaymentStatus, number>);

  const completedPayments = mockPayments.filter(
    (p) => p.status === "COMPLETED" && p.processingTime
  );
  const averageProcessingTime =
    completedPayments.length > 0
      ? completedPayments.reduce((sum, p) => sum + (p.processingTime || 0), 0) /
        completedPayments.length
      : 0;

  return {
    statusCounts,
    averageProcessingTime,
    currentTPS,
    totalPayments: mockPayments.length,
  };
}

export function getMockRateLimitInfo(): RateLimitInfo {
  const isNearLimit = currentTPS >= 1.5;
  const isAtLimit = currentTPS >= 2.0;

  return {
    currentTPS,
    maxTPS: 2.0,
    isNearLimit,
    isAtLimit,
  };
}

// Simulate TPS fluctuations
setInterval(() => {
  currentTPS = Math.max(
    0.1,
    Math.min(2.5, currentTPS + (Math.random() - 0.5) * 0.3)
  );
}, 10000);

// Simulate payment status changes
setInterval(() => {
  const pendingPayments = mockPayments.filter((p) => p.status === "PENDING");
  if (pendingPayments.length > 0) {
    const randomPayment =
      pendingPayments[Math.floor(Math.random() * pendingPayments.length)];
    const newStatus: PaymentStatus =
      Math.random() > 0.3 ? "IN_PROGRESS" : "FAILED";
    updatePaymentStatus(
      randomPayment.id,
      newStatus,
      newStatus === "FAILED" ? "Network timeout" : undefined
    );
  }

  const inProgressPayments = mockPayments.filter(
    (p) => p.status === "IN_PROGRESS"
  );
  if (inProgressPayments.length > 0) {
    const randomPayment =
      inProgressPayments[Math.floor(Math.random() * inProgressPayments.length)];
    const newStatus: PaymentStatus =
      Math.random() > 0.2 ? "COMPLETED" : "FAILED";
    updatePaymentStatus(
      randomPayment.id,
      newStatus,
      newStatus === "FAILED" ? "Processing error" : undefined
    );
  }
}, 8000);
