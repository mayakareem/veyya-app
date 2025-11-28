import { prisma } from "@/lib/prisma";
import BookingForm from "@/components/BookingForm";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

// Prevent static generation at build time
export async function generateStaticParams() {
  return [];
}

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ serviceId?: string }>;
};

export default async function BookingPage({ params, searchParams }: Props) {
  const { id: providerId } = await params;
  const { serviceId } = await searchParams;

  const [services, slots] = await Promise.all([
    prisma.serviceOffering.findMany({
      where: { providerId, active: true },
      orderBy: { price: "asc" },
    }),
    prisma.availabilitySlot.findMany({
      where: { providerId, start: { gte: new Date() }, capacity: { gt: 0 } },
      orderBy: { start: "asc" },
      take: 50,
    }),
  ]);

  if (services.length === 0) {
    return <main className="p-10">No active services available.</main>;
  }
  if (slots.length === 0) {
    return (
      <main className="p-10">
        No available slots. Please check back later.
      </main>
    );
  }

  const defaultServiceId =
    serviceId && services.some((s) => s.id === serviceId)
      ? serviceId
      : services[0].id;

  return (
    <main className="mx-auto max-w-2xl px-6 py-10 space-y-6">
      <h1 className="text-2xl font-semibold">Book a service</h1>

      <BookingForm
        providerId={providerId}
        services={services}
        slots={slots}
        defaultServiceId={defaultServiceId}
      />

      <Link className="underline text-sm" href={`/providers/${providerId}`}>
        ← Back to provider
      </Link>
    </main>
  );
}
