/**
 * Application Constants
 * Based on data model and FRD specifications
 */

export const BOOKING_STATUS = {
  PENDING_PROVIDER: 'PENDING_PROVIDER',
  CONFIRMED: 'CONFIRMED',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
  READY_FOR_PAYOUT: 'READY_FOR_PAYOUT',
  PAID: 'PAID',
} as const;

export type BookingStatus = typeof BOOKING_STATUS[keyof typeof BOOKING_STATUS];

export const TRANSACTION_STATUS = {
  HELD: 'HELD',
  READY: 'READY',
  RELEASED: 'RELEASED',
} as const;

export type TransactionStatus = typeof TRANSACTION_STATUS[keyof typeof TRANSACTION_STATUS];

export const PROVIDER_STATUS = {
  PENDING_APPROVAL: 'PENDING_APPROVAL',
  APPROVED: 'APPROVED',
  SUSPENDED: 'SUSPENDED',
  REJECTED: 'REJECTED',
} as const;

export type ProviderStatus = typeof PROVIDER_STATUS[keyof typeof PROVIDER_STATUS];

export const USER_ROLE = {
  CLIENT: 'CLIENT',
  PROVIDER: 'PROVIDER',
  ADMIN: 'ADMIN',
} as const;

export type UserRole = typeof USER_ROLE[keyof typeof USER_ROLE];

export const LANGUAGE = {
  EN: 'en',
  TH: 'th',
} as const;

export type Language = typeof LANGUAGE[keyof typeof LANGUAGE];

// Timeout values (from FRD)
export const PROVIDER_ACCEPTANCE_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes
export const REVIEW_WINDOW_HOURS = 24;

// Commission and payout
export const PLATFORM_COMMISSION_RATE = 0.275; // 25-30% average
export const PROVIDER_NET_RATE = 0.70; // 70% to provider

// Performance SLAs (from FRD)
export const PERFORMANCE_SLA = {
  SEARCH_RESULTS_MS: 1500,
  API_P95_MS: 300,
  NOTIFICATION_DELIVERY_SEC: 30,
  AVAILABILITY_CHECK_MS: 200,
  DASHBOARD_LOAD_MS: 1500,
  BOOKING_COMPLETION_MIN: 3,
  REBOOK_COMPLETION_SEC: 30,
};

// Distance and location
export const DEFAULT_SERVICE_RADIUS_KM = 15;
export const MAX_SERVICE_RADIUS_KM = 50;

// Pagination
export const DEFAULT_PAGE_SIZE = 20;

// File upload limits
export const MAX_PORTFOLIO_PHOTOS = 12;
export const MAX_REVIEW_PHOTOS = 3;
export const MAX_FILE_SIZE_MB = 5;
export const MAX_DOCUMENT_SIZE_MB = 10;

// Currency
export const SUPPORTED_CURRENCIES = ['THB', 'USD', 'AED'] as const;
export type SupportedCurrency = typeof SUPPORTED_CURRENCIES[number];
export const DEFAULT_CURRENCY: SupportedCurrency = 'THB';

// Ranking algorithm weights (from FRD R-DISCOVERY-002)
export const PROVIDER_RANKING_WEIGHTS = {
  DISTANCE: 0.4,
  RATING: 0.4,
  RESPONSE_RATE: 0.2,
};

// Review weighting
export const REVIEW_WEIGHTING = {
  RECENT_5: 0.6,
  OLDER: 0.4,
};
