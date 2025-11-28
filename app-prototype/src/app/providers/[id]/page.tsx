import { prisma } from "@/lib/prisma";
import { getProviderDisplayByPrismaId } from "@/lib/sanity";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

// Prevent static generation at build time
export async function generateStaticParams() {
  return [];
}

interface Props {
  params: { id: string };
}

export default async function ProviderProfilePage({ params }: Props) {
  const { id } = params;

  // Fetch transactional data from Prisma
  const provider = await prisma.providerProfile.findUnique({
    where: { id },
    include: {
      user: { select: { name: true, email: true } },
      services: { where: { active: true } },
      availability: {
        where: { start: { gte: new Date() } },
        orderBy: { start: "asc" },
        take: 5,
      },
    },
  });

  if (!provider) return notFound();

  // Fetch rich content from Sanity CMS
  const sanityData = await getProviderDisplayByPrismaId(provider.id);

  return (
    <main className="mx-auto max-w-5xl p-6 space-y-8">
      {/* Hero Section with Sanity Image */}
      {sanityData?.heroImage && (
        <div className="relative h-64 rounded-lg overflow-hidden">
          <Image
            src={sanityData.heroImage}
            alt={sanityData.name || provider.displayName}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Provider Header */}
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              {sanityData?.name || provider.displayName}
            </h1>
            {(sanityData?.rating || provider.rating) && (
              <div className="flex items-center gap-2 mt-2">
                <span className="text-lg">⭐</span>
                <span className="font-medium">
                  {(sanityData?.rating || provider.rating)?.toFixed(1)}
                </span>
              </div>
            )}
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">
              ฿{((sanityData?.basePrice || provider.basePrice || 0) / 100).toFixed(2)}
            </div>
            <div className="text-sm text-muted-foreground">Starting from</div>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {(sanityData?.categories || provider.categories)?.map((cat) => (
            <Badge key={cat} variant="secondary">
              {cat}
            </Badge>
          ))}
        </div>

        {/* Bio - prefer Sanity for rich content */}
        {(sanityData?.shortBio || provider.shortBio) && (
          <p className="text-muted-foreground">
            {sanityData?.shortBio || provider.shortBio}
          </p>
        )}
      </div>

      {/* Services */}
      {provider.services.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Services</h2>
          <div className="grid gap-3">
            {provider.services.map((service) => (
              <div key={service.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h3 className="font-medium">{service.title}</h3>
                    {service.description && (
                      <p className="text-sm text-muted-foreground">
                        {service.description}
                      </p>
                    )}
                    <div className="text-sm text-muted-foreground">
                      {service.durationMin} minutes
                    </div>
                  </div>
                  <div className="font-medium">
                    ฿{(service.price / 100).toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Next Available */}
      {sanityData?.nextAvailableISO && (
        <div className="border rounded-lg p-4 bg-muted/50">
          <h3 className="font-medium mb-1">Next Available</h3>
          <p className="text-sm">
            {new Date(sanityData.nextAvailableISO).toLocaleString()}
          </p>
        </div>
      )}

      {/* Upcoming Availability from Prisma */}
      {provider.availability.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Upcoming Availability</h2>
          <div className="space-y-2">
            {provider.availability.map((slot) => (
              <div
                key={slot.id}
                className="flex items-center justify-between border rounded-lg p-3 text-sm"
              >
                <div>
                  {new Date(slot.start).toLocaleString()} -{" "}
                  {new Date(slot.end).toLocaleString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
                <Badge variant="outline">{slot.capacity} spots</Badge>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-4">
        <a className="underline text-sm" href={`/booking/${provider.id}`}>
          Book this provider →
        </a>
        <a className="underline text-sm" href="/search">
          ← Back to search
        </a>
      </div>
    </main>
  );
}
