export const RATE_LIMIT = {
  MAX_TPS: 2,
  WARNING_THRESHOLD: 1.5, // 75% of max TPS
};

export const PAYMENT_STATUS_CONFIG = {
  PENDING: {
    label: "Pending",
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
    icon: "clock",
  },
  IN_PROGRESS: {
    label: "In Progress",
    color: "bg-blue-100 text-blue-800 border-blue-200",
    icon: "loader-2",
  },
  COMPLETED: {
    label: "Completed",
    color: "bg-green-100 text-green-800 border-green-200",
    icon: "check-circle",
  },
  FAILED: {
    label: "Failed",
    color: "bg-red-100 text-red-800 border-red-200",
    icon: "x-circle",
  },
} as const;

export const CURRENCIES = [
  { code: "USD", name: "US Dollar" },
  { code: "EUR", name: "Euro" },
  { code: "GBP", name: "British Pound" },
  { code: "JPY", name: "Japanese Yen" },
  { code: "CAD", name: "Canadian Dollar" },
  { code: "AUD", name: "Australian Dollar" },
  { code: "CHF", name: "Swiss Franc" },
  { code: "CNY", name: "Chinese Yuan" },
  { code: "ETB", name: "Ethiopian Birr" },
];

export const REFRESH_INTERVAL = 5000; // 5 seconds
export const MAX_RETRY_COUNT = 3;
