"use server";

import { prisma } from "@/lib/prisma";
import { requireProvider } from "@/lib/auth-helpers";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const OnboardSchema = z.object({
  displayName: z.string().min(2),
  shortBio: z.string().optional().default(""),
  categories: z.array(z.string()).optional().default([]),
  basePrice: z.coerce.number().int().min(0).default(0),
});

export async function upsertProviderProfile(formData: FormData): Promise<void> {
  const user = await requireProvider();

  const parsed = OnboardSchema.safeParse({
    displayName: formData.get("displayName") || "",
    shortBio: formData.get("shortBio") || "",
    categories: (formData.get("categories") || "")
      .toString()
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    basePrice: formData.get("basePrice") || 0,
  });

  if (!parsed.success) {
    console.error("Validation error:", parsed.error.flatten().fieldErrors);
    return;
  }

  const data = parsed.data;

  // create or update one-to-one profile
  await prisma.providerProfile.upsert({
    where: { userId: user.id },
    update: {
      displayName: data.displayName,
      shortBio: data.shortBio,
      categories: data.categories,
      basePrice: data.basePrice,
    },
    create: {
      userId: user.id,
      displayName: data.displayName,
      shortBio: data.shortBio,
      categories: data.categories,
      basePrice: data.basePrice,
    },
  });

  revalidatePath("/provider/onboarding");
}
