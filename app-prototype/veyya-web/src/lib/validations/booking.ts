/**
 * Booking Form Validation Schemas
 * Using Zod for type-safe validation
 */

import { z } from "zod";

export const bookingDateSchema = z.object({
  date: z.string().min(1, "Please select a date"),
});

export const bookingTimeSchema = z.object({
  timeSlot: z.string().min(1, "Please select a time slot"),
});

export const bookingDetailsSchema = z.object({
  serviceId: z.string().min(1, "Please select a service"),
  address: z.string().min(10, "Please enter a complete address"),
  lat: z.number().optional(),
  lng: z.number().optional(),
  specialInstructions: z
    .string()
    .max(500, "Instructions must be 500 characters or less")
    .optional(),
});

export const bookingReviewSchema = z.object({
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and cancellation policy",
  }),
  paymentMethod: z.enum(["card", "promptpay"], {
    message: "Please select a payment method",
  }),
});

// Combined schema for final submission
export const completeBookingSchema = bookingDateSchema
  .merge(bookingTimeSchema)
  .merge(bookingDetailsSchema)
  .merge(bookingReviewSchema);

export type BookingDateData = z.infer<typeof bookingDateSchema>;
export type BookingTimeData = z.infer<typeof bookingTimeSchema>;
export type BookingDetailsData = z.infer<typeof bookingDetailsSchema>;
export type BookingReviewData = z.infer<typeof bookingReviewSchema>;
export type CompleteBookingData = z.infer<typeof completeBookingSchema>;
