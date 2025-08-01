import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getPayments,
  createPayment,
  retryPaymentById,
  viewLogs,
} from '../services/api';
import { REFRESH_INTERVAL } from '../utils/constants';
import type { CreatePaymentRequest } from '../types/payment';

export function usePayments() {
  return useQuery({
    queryKey: ['payments'],
    queryFn: getPayments,
    refetchInterval: REFRESH_INTERVAL,
    staleTime: 1000,
  });
}

export function useCreatePayment() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (payment: CreatePaymentRequest) => createPayment(payment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments'] });
      queryClient.invalidateQueries({ queryKey: ['analytics'] });
    },
  });
}

export function useRetryPayment() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (paymentId: string) => retryPaymentById(paymentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments'] });
      queryClient.invalidateQueries({ queryKey: ['analytics'] });
    },
  });
}

export function useViewLogs() {
  return useMutation({
    mutationFn: (paymentId: string) => viewLogs(paymentId),
  });
}