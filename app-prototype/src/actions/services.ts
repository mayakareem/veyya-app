"use server";

import { prisma } from "@/lib/prisma";
import { requireProvider } from "@/lib/auth-helpers";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const ServiceSchema = z.object({
  title: z.string().min(2),
  description: z.string().optional().default(""),
  durationMin: z.coerce.number().int().min(15).max(480),
  price: z.coerce.number().int().min(0),
  active: z.boolean().optional().default(true),
});

export async function createService(formData: FormData): Promise<void> {
  const user = await requireProvider();

  const provider = await prisma.providerProfile.findUnique({
    where: { userId: user.id },
    select: { id: true },
  });
  if (!provider) {
    console.error("No provider profile");
    return;
  }

  const parsed = ServiceSchema.safeParse({
    title: formData.get("title") || "",
    description: formData.get("description") || "",
    durationMin: formData.get("durationMin") || 60,
    price: formData.get("price") || 0,
    active: formData.get("active") === "true",
  });

  if (!parsed.success) {
    console.error("Validation error:", parsed.error.flatten().fieldErrors);
    return;
  }

  await prisma.serviceOffering.create({
    data: {
      providerId: provider.id,
      ...parsed.data,
    },
  });

  revalidatePath("/provider/services");
}

export async function updateService(serviceId: string, formData: FormData): Promise<void> {
  const user = await requireProvider();

  const provider = await prisma.providerProfile.findUnique({
    where: { userId: user.id },
    select: { id: true },
  });
  if (!provider) {
    console.error("No provider profile");
    return;
  }

  const parsed = ServiceSchema.safeParse({
    title: formData.get("title") || "",
    description: formData.get("description") || "",
    durationMin: formData.get("durationMin") || 60,
    price: formData.get("price") || 0,
    active: formData.get("active") === "true",
  });

  if (!parsed.success) {
    console.error("Validation error:", parsed.error.flatten().fieldErrors);
    return;
  }

  // Ensure service belongs to this provider
  await prisma.serviceOffering.updateMany({
    where: { id: serviceId, providerId: provider.id },
    data: parsed.data,
  });

  revalidatePath("/provider/services");
}

export async function deleteService(serviceId: string): Promise<void> {
  const user = await requireProvider();

  const provider = await prisma.providerProfile.findUnique({
    where: { userId: user.id },
    select: { id: true },
  });
  if (!provider) {
    console.error("No provider profile");
    return;
  }

  // Ensure service belongs to this provider
  await prisma.serviceOffering.deleteMany({
    where: { id: serviceId, providerId: provider.id },
  });

  revalidatePath("/provider/services");
}

export async function toggleServiceActive(serviceId: string): Promise<void> {
  const user = await requireProvider();

  const provider = await prisma.providerProfile.findUnique({
    where: { userId: user.id },
    select: { id: true },
  });
  if (!provider) {
    console.error("No provider profile");
    return;
  }

  const service = await prisma.serviceOffering.findFirst({
    where: { id: serviceId, providerId: provider.id },
  });

  if (service) {
    await prisma.serviceOffering.update({
      where: { id: serviceId },
      data: { active: !service.active },
    });
  }

  revalidatePath("/provider/services");
}
