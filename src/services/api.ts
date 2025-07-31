import type {
  Payment,
  CreatePaymentRequest,
  PaymentAnalytics,
  RateLimitInfo,
} from "../types/payment";
import {
  getMockPayments,
  addMockPayment,
  retryPayment,
  getMockAnalytics,
  getMockRateLimitInfo,
} from "./mockData";

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getPayments(): Promise<Payment[]> {
  await delay(300);
  return getMockPayments();
}

export async function createPayment(payment: CreatePaymentRequest): Promise<Payment> {
  await delay(500);

  const newPayment = addMockPayment({
    amount: payment.amount,
    currency: payment.currency,
    recipientName: payment.recipientName,
    recipientAccountNumber: payment.recipientAccountNumber,
    status: "PENDING",
  });

  return newPayment;
}

export async function retryPaymentById(paymentId: string): Promise<Payment> {
  await delay(400);

  const payment = retryPayment(paymentId);
  if (!payment) {
    throw new Error("Payment not found");
  }

  return payment;
}

export async function getAnalytics(): Promise<PaymentAnalytics> {
  await delay(200);
  return getMockAnalytics();
}

export async function getRateLimitInfo(): Promise<RateLimitInfo> {
  await delay(100);
  return getMockRateLimitInfo();
}

export async function viewLogs(paymentId: string): Promise<string[]> {
  await delay(300);

  // Mock logs
  return [
    `[${new Date().toISOString()}] Payment ${paymentId} initiated`,
    `[${new Date().toISOString()}] Validating payment details`,
    `[${new Date().toISOString()}] Processing payment through gateway`,
    `[${new Date().toISOString()}] Payment ${paymentId} completed successfully`,
  ];
}