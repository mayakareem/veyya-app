/**
 * Mock Data for Development
 * Replace with real API calls in production
 */

import type { Provider, Service, Booking, Review } from "./types";

export const MOCK_PROVIDERS: Provider[] = [
  {
    id: "p1",
    name: "Lina Beauty Studio",
    rating: 4.8,
    basePrice: 120,
    categories: ["Beauty", "Nails"],
    nextAvailableISO: new Date(Date.now() + 1000*60*60*6).toISOString(),
    heroImage: "https://picsum.photos/seed/veyyya/1200/600",
    shortBio: "Premium beauty at-home services with hygiene-first standards."
  },
  {
    id: "p2",
    name: "Clean & Calm",
    rating: 4.6,
    basePrice: 80,
    categories: ["Cleaning"],
    nextAvailableISO: new Date(Date.now() + 1000*60*60*12).toISOString(),
    heroImage: "https://picsum.photos/seed/veyyya2/1200/600",
    shortBio: "Trusted home cleaning specialists with flexible hours."
  }
];

export const mockServices: Service[] = [
  {
    id: 'service-1',
    categoryId: 'beauty',
    title: {
      en: 'Gel Manicure',
      th: 'ทาเล็บเจล',
    },
    description: {
      en: 'Professional gel manicure with long-lasting results',
      th: 'บริการทาเล็บเจลแบบมืออาชีพ ติดทนนาน',
    },
    basePrice: 50000, // ฿500 in satang
    durationMinutes: 60,
    isActive: true,
  },
  {
    id: 'service-2',
    categoryId: 'beauty',
    title: {
      en: 'Gel Pedicure',
      th: 'ทาเล็บเท้าเจล',
    },
    description: {
      en: 'Relaxing pedicure with gel polish',
      th: 'บริการเพดิคัวร์พร้อมทาเล็บเจล',
    },
    basePrice: 55000, // ฿550 in satang
    durationMinutes: 60,
    isActive: true,
  },
  {
    id: 'service-3',
    categoryId: 'pet-care',
    title: {
      en: 'Dog Grooming (Small)',
      th: 'อาบน้ำตัดขนสุนัขขนาดเล็ก',
    },
    description: {
      en: 'Full grooming service for small dogs (up to 10kg)',
      th: 'บริการอาบน้ำตัดขนสุนัขขนาดเล็ก (น้ำหนักไม่เกิน 10 กก.)',
    },
    basePrice: 80000, // ฿800 in satang
    durationMinutes: 90,
    isActive: true,
  },
];

export const mockBookings: Booking[] = [
  {
    id: 'booking-1',
    clientId: 'client-1',
    providerId: '1',
    serviceId: 'service-1',
    startAt: new Date('2024-12-25T14:00:00'),
    endAt: new Date('2024-12-25T15:00:00'),
    address: '123 Sukhumvit Road, Bangkok',
    lat: 13.7563,
    lng: 100.5018,
    status: 'CONFIRMED',
    totalAmount: 50000,
    specialInstructions: 'Please bring nail polish remover',
    cancellationReason: null,
    createdAt: new Date('2024-12-20'),
    updatedAt: new Date('2024-12-20'),
  },
];

export const mockReviews: Review[] = [
  {
    id: 'review-1',
    bookingId: 'booking-1',
    providerId: '1',
    clientId: 'client-1',
    rating: 5,
    comment: 'Excellent service! Very professional and my nails look amazing. Will definitely book again.',
    photos: [],
    isModerated: true,
    moderatedAt: new Date('2024-12-21'),
    createdAt: new Date('2024-12-21'),
    updatedAt: new Date('2024-12-21'),
  },
  {
    id: 'review-2',
    bookingId: 'booking-2',
    providerId: '1',
    clientId: 'client-2',
    rating: 5,
    comment: 'Super talented! The nail art was exactly what I wanted. Very friendly and punctual.',
    photos: [],
    isModerated: true,
    moderatedAt: new Date('2024-12-18'),
    createdAt: new Date('2024-12-18'),
    updatedAt: new Date('2024-12-18'),
  },
];

// Helper functions
export function getProviderById(id: string): Provider | undefined {
  return MOCK_PROVIDERS.find(p => p.id === id);
}

export function getServiceById(id: string): Service | undefined {
  return mockServices.find(s => s.id === id);
}

export function getBookingById(id: string): Booking | undefined {
  return mockBookings.find(b => b.id === id);
}

export function getReviewsByProviderId(providerId: string): Review[] {
  return mockReviews.filter(r => r.providerId === providerId);
}

export function formatPrice(amountInSatang: number, currency: 'THB' | 'USD' = 'THB'): string {
  const amount = amountInSatang / 100;
  if (currency === 'THB') {
    return `฿${amount.toFixed(0)}`;
  }
  return `$${amount.toFixed(2)}`;
}
