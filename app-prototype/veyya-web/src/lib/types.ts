/**
 * Core Type Definitions for Veyya Platform
 * Based on documents/data-model/00-data-model.md
 */

export type UserRole = 'CLIENT' | 'PROVIDER' | 'ADMIN';
export type Language = 'en' | 'th';

export interface User {
  id: string;
  email: string;
  phone: string;
  name: string;
  role: UserRole;
  language: Language;
  createdAt: Date;
  updatedAt: Date;
}

export type ProviderStatus = 'PENDING_APPROVAL' | 'APPROVED' | 'SUSPENDED' | 'REJECTED';

// UI-focused Provider type for listings and cards
export type Provider = {
  id: string;
  name: string;
  rating: number;
  basePrice: number;
  categories: string[];
  nextAvailableISO?: string;
  heroImage?: string;
  shortBio?: string;
};

// Full Provider type with all database fields
export interface ProviderFull {
  id: string;
  userId: string;
  name: string;
  bio: string;
  profilePhotoUrl: string | null;
  rating: number;
  reviewCount: number;
  responseRate: number;
  serviceRadius: number; // km
  status: ProviderStatus;
  verifiedAt: Date | null;
  languages: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Service {
  id: string;
  categoryId: string;
  title: {
    en: string;
    th: string;
  };
  description: {
    en: string;
    th: string;
  };
  basePrice: number; // in minor units (satang)
  durationMinutes: number;
  isActive: boolean;
}

export type BookingStatus =
  | 'PENDING_PROVIDER'
  | 'CONFIRMED'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'READY_FOR_PAYOUT'
  | 'PAID';

export interface Booking {
  id: string;
  clientId: string;
  providerId: string;
  serviceId: string;
  startAt: Date;
  endAt: Date;
  address: string;
  lat: number;
  lng: number;
  status: BookingStatus;
  totalAmount: number; // in minor units (satang)
  specialInstructions: string | null;
  cancellationReason: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export type TransactionStatus = 'HELD' | 'READY' | 'RELEASED';

export interface Transaction {
  id: string;
  bookingId: string;
  grossAmount: number;
  commission: number;
  netAmount: number;
  status: TransactionStatus;
  stripePaymentIntentId: string | null;
  omiseChargeId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Review {
  id: string;
  bookingId: string;
  providerId: string;
  clientId: string;
  rating: number; // 1-5
  comment: string | null;
  photos: string[];
  isModerated: boolean;
  moderatedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

// Search and filter types
export interface ProviderSearchFilters {
  category?: string;
  minRating?: number;
  maxDistance?: number;
  priceRange?: [number, number];
  languages?: string[];
  verified?: boolean;
  availability?: 'today' | 'tomorrow' | 'this_week';
}

export interface ProviderSearchResult {
  id: string;
  name: string;
  avatar: string | null;
  rating: number;
  reviewCount: number;
  distance: number; // km
  responseRate: number;
  services: string[];
  minPrice: number;
  verified: boolean;
  languages: string[];
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: {
    code: string;
    message: string;
  };
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
  };
}
