import { prisma } from "@/lib/prisma";
import FilterDrawer from "@/components/search/FilterDrawer";
import AnimatedProviderGrid from "@/components/search/AnimatedProviderGrid";
import ServicesGrid from "@/components/search/ServicesGrid";

export const dynamic = "force-dynamic";

interface SearchParams {
  q?: string;
  category?: string;
  maxPrice?: string;
  minRating?: string;
  instant?: string;
  sort?: string;
  view?: string;
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const q = params.q || "";
  const category = params.category || "";
  const maxPrice = Number(params.maxPrice ?? 10000);
  const minRating = Number(params.minRating ?? 0);
  const instant = params.instant === "1";
  const sort = params.sort || "rating-desc";

  // Available categories
  const allCategories = [
    "Beauty",
    "Nails",
    "Hair",
    "Makeup",
    "Pet Care",
    "Cleaning",
    "Wellness",
    "Fitness",
  ];

  // Build where clause
  const where: any = {
    ...(category && { categories: { has: category } }),
    ...(minRating && { rating: { gte: minRating } }),
  };

  // Add search filter
  if (q) {
    where.OR = [
      { displayName: { contains: q, mode: "insensitive" } },
      { shortBio: { contains: q, mode: "insensitive" } },
      {
        services: {
          some: {
            title: { contains: q, mode: "insensitive" },
            active: true,
          },
        },
      },
    ];
  }

  // Fetch providers
  const providers = await prisma.providerProfile.findMany({
    where,
    include: {
      services: {
        where: {
          active: true,
          ...(maxPrice && { price: { lte: maxPrice * 100 } }),
        },
        take: 3,
      },
      availability: {
        where: {
          start: { gte: new Date() },
          capacity: { gt: 0 },
        },
        orderBy: { start: "asc" },
        take: 1,
      },
      _count: { select: { services: true, bookings: true } },
    },
  });

  // Filter by instant book if needed
  let filteredProviders = providers;
  if (instant) {
    filteredProviders = providers.filter((p) => p.availability.length > 0);
  }

  // Sort providers
  const sortedProviders = filteredProviders.sort((a, b) => {
    switch (sort) {
      case "rating-desc":
        return (b.rating || 0) - (a.rating || 0);
      case "price-asc":
        const aPrice = a.services[0]?.price || a.basePrice || 0;
        const bPrice = b.services[0]?.price || b.basePrice || 0;
        return aPrice - bPrice;
      case "price-desc":
        const aPrice2 = a.services[0]?.price || a.basePrice || 0;
        const bPrice2 = b.services[0]?.price || b.basePrice || 0;
        return bPrice2 - aPrice2;
      case "soonest":
        const aHasSlot = a.availability.length > 0;
        const bHasSlot = b.availability.length > 0;
        if (aHasSlot && !bHasSlot) return -1;
        if (!aHasSlot && bHasSlot) return 1;
        if (aHasSlot && bHasSlot) {
          return (
            a.availability[0].start.getTime() -
            b.availability[0].start.getTime()
          );
        }
        return 0;
      default:
        return 0;
    }
  });

  // Fetch all services
  const serviceWhere: any = {
    active: true,
    ...(maxPrice && { price: { lte: maxPrice * 100 } }),
  };

  // Add search filter for services
  if (q) {
    serviceWhere.title = { contains: q, mode: "insensitive" };
  }

  // Add category filter for services
  if (category) {
    serviceWhere.provider = {
      categories: { has: category },
    };
  }

  // Add rating filter for services
  if (minRating) {
    serviceWhere.provider = {
      ...serviceWhere.provider,
      rating: { gte: minRating },
    };
  }

  const allServices = await prisma.serviceOffering.findMany({
    where: serviceWhere,
    include: {
      provider: {
        select: {
          id: true,
          displayName: true,
          rating: true,
        },
      },
    },
    orderBy: {
      price: sort === "price-asc" ? "asc" : sort === "price-desc" ? "desc" : undefined,
    },
  });

  return (
    <main className="grid md:grid-cols-[280px_1fr] gap-6 py-8">
      <FilterDrawer categories={allCategories} />
      <div className="space-y-8">
        <ServicesGrid services={allServices} />
        <div className="border-t pt-8">
          <h2 className="text-lg font-semibold mb-4">Providers</h2>
          <AnimatedProviderGrid providers={sortedProviders} />
        </div>
      </div>
    </main>
  );
}
