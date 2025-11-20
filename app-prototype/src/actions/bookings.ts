"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function createBooking(data: {
  providerId: string;
  serviceId?: string;
  startISO: string;
  endISO: string;
  address?: string;
  notes?: string;
}) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const booking = await prisma.booking.create({
    data: {
      userId: session.user.id,
      providerId: data.providerId,
      serviceId: data.serviceId,
      start: new Date(data.startISO),
      end: new Date(data.endISO),
      address: data.address,
      notes: data.notes,
      price: 0,
    },
  });

  return { id: booking.id };
}

export async function createBookingAction(payload: {
  providerId: string;
  serviceId: string;
  slotId: string;
  address?: string;
  notes?: string;
}) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  // Fetch service & slot to compute time/price and ensure availability
  const [service, slot] = await Promise.all([
    prisma.serviceOffering.findFirst({
      where: { id: payload.serviceId, providerId: payload.providerId, active: true },
    }),
    prisma.availabilitySlot.findFirst({
      where: { id: payload.slotId, providerId: payload.providerId },
    }),
  ]);

  if (!service) throw new Error("Invalid service");
  if (!slot) throw new Error("Invalid slot");

  // Capacity check
  if (slot.capacity <= 0) throw new Error("Slot is full");

  // Derive booking times (use slot start; end = start + duration)
  const start = slot.start;
  const end = new Date(start.getTime() + service.durationMin * 60 * 1000);

  const booking = await prisma.$transaction(async (tx) => {
    // Decrement slot capacity
    await tx.availabilitySlot.update({
      where: { id: slot.id },
      data: { capacity: { decrement: 1 } },
    });

    // Create booking
    return tx.booking.create({
      data: {
        userId: session.user.id,
        providerId: payload.providerId,
        serviceId: service.id,
        start,
        end,
        address: payload.address || null,
        notes: payload.notes || null,
        price: service.price,
        status: "PENDING",
      },
      select: { id: true },
    });
  });

  revalidatePath(`/booking/${payload.providerId}`);
  revalidatePath(`/user/bookings`);
  return { ok: true, bookingId: booking.id };
}
