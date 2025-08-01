import { useQuery } from "@tanstack/react-query";
import { REFRESH_INTERVAL } from "../utils/constants";
import { getAnalytics, getRateLimitInfo } from "../services/api";

export function useAnalytics() {
  return useQuery({
    queryKey: ["analytics"],
    queryFn: getAnalytics,
    refetchInterval: REFRESH_INTERVAL,
    staleTime: 1000,
  });
}

export function useRateLimit() {
  return useQuery({
    queryKey: ["rateLimit"],
    queryFn: getRateLimitInfo,
    refetchInterval: 2000, // More frequent updates for rate limit
    staleTime: 500,
  });
}