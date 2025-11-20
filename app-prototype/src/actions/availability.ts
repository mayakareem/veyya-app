"use server";

import { prisma } from "@/lib/prisma";
import { requireProvider } from "@/lib/auth-helpers";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const SlotSchema = z.object({
  startISO: z.string().datetime(),
  endISO: z.string().datetime(),
  capacity: z.coerce.number().int().min(1).max(10).default(1),
});

export async function createSlot(formData: FormData) {
  const user = await requireProvider();

  const parsed = SlotSchema.safeParse({
    startISO: String(formData.get("startISO") || ""),
    endISO: String(formData.get("endISO") || ""),
    capacity: formData.get("capacity") || 1,
  });
  if (!parsed.success) {
    return { ok: false, error: parsed.error.flatten().fieldErrors };
  }

  const provider = await prisma.providerProfile.findUnique({
    where: { userId: user.id },
    select: { id: true },
  });
  if (!provider) return { ok: false, error: { provider: ["No provider profile"] } };

  const { startISO, endISO, capacity } = parsed.data;
  const start = new Date(startISO);
  const end = new Date(endISO);
  if (end <= start) return { ok: false, error: { endISO: ["End must be after start"] } };

  await prisma.availabilitySlot.create({
    data: { providerId: provider.id, start, end, capacity },
  });

  revalidatePath("/provider/calendar");
  return { ok: true };
}

export async function deleteSlot(slotId: string) {
  const user = await requireProvider();

  const provider = await prisma.providerProfile.findUnique({
    where: { userId: user.id },
    select: { id: true },
  });
  if (!provider) return { ok: false };

  // ensure slot belongs to this provider
  await prisma.availabilitySlot.deleteMany({
    where: { id: slotId, providerId: provider.id },
  });

  revalidatePath("/provider/calendar");
  return { ok: true };
}
