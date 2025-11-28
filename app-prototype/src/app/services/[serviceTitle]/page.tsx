import { prisma } from "@/lib/prisma";
import Container from "@/components/layout/Container";
import ServiceDetailCard from "@/components/services/ServiceDetailCard";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

// Prevent static generation at build time
export async function generateStaticParams() {
  return [];
}

interface PageProps {
  params: Promise<{
    serviceTitle: string;
  }>;
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { serviceTitle } = await params;
  const decodedTitle = decodeURIComponent(serviceTitle);

  // Fetch all services with this title
  const services = await prisma.serviceOffering.findMany({
    where: {
      title: decodedTitle,
      active: true,
    },
    include: {
      provider: {
        select: {
          id: true,
          displayName: true,
          rating: true,
          imageUrl: true,
          shortBio: true,
        },
      },
    },
    orderBy: {
      price: "asc",
    },
  });

  if (services.length === 0) {
    notFound();
  }

  // Get average rating and price range
  const avgRating =
    services.reduce((sum, s) => sum + (s.provider.rating || 0), 0) /
    services.length;
  const minPrice = Math.min(...services.map((s) => s.price));
  const maxPrice = Math.max(...services.map((s) => s.price));

  return (
    <main className="min-h-screen">
      <div className="border-b bg-muted/30">
        <Container className="py-12">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight">{decodedTitle}</h1>
            <div className="mt-4 flex items-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="text-2xl">⭐</span>
                <span className="font-semibold text-foreground">
                  {avgRating.toFixed(1)}
                </span>
                <span>({services.length} providers)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">💰</span>
                <span className="font-semibold text-foreground">
                  ${(minPrice / 100).toFixed(2)} - ${(maxPrice / 100).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Available Options</h2>
          <p className="text-muted-foreground">
            Choose from {services.length} verified provider{services.length > 1 ? "s" : ""} offering {decodedTitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {services.map((service) => (
            <ServiceDetailCard key={service.id} service={service} />
          ))}
        </div>
      </Container>
    </main>
  );
}
