"use server";

import { createBookingAction } from "@/actions/bookings";
import { redirect } from "next/navigation";

export async function createBooking(payload: {
  providerId: string;
  serviceId: string;
  slotId: string;
  address?: string;
  notes?: string;
}) {
  await createBookingAction(payload);
  redirect("/user/bookings");
}
