"use client";

import Link from "next/link";
import Image from "next/image";
import { Clock } from "lucide-react";

type Service = {
  id: string;
  title: string;
  price: number;
  durationMin: number;
  provider: {
    id?: string;
    displayName: string;
    rating: number | null;
  };
};

type Props = {
  services: Service[];
  allProviders?: {
    id: string;
    displayName: string;
    rating: number | null;
    services: { id: string; title: string; price: number; durationMin: number }[];
  }[];
};

// Map service titles to unique images
const getServiceImage = (title: string): string => {
  const lowerTitle = title.toLowerCase();

  // Massage services
  if (lowerTitle.includes("deep tissue massage")) {
    return "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&q=80";
  }
  if (lowerTitle.includes("thai massage")) {
    return "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=400&q=80";
  }
  if (lowerTitle.includes("swedish massage")) {
    return "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=400&q=80";
  }
  if (lowerTitle.includes("hot stone massage")) {
    return "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&q=80";
  }
  if (lowerTitle.includes("aromatherapy")) {
    return "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&q=80";
  }

  // Hair services
  if (lowerTitle.includes("haircut")) {
    return "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&q=80";
  }
  if (lowerTitle.includes("hair color") || lowerTitle.includes("hair colour")) {
    return "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&q=80";
  }
  if (lowerTitle.includes("balayage")) {
    return "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80";
  }
  if (lowerTitle.includes("hair treatment")) {
    return "https://images.unsplash.com/photo-1595475884562-073c30d45670?w=400&q=80";
  }
  if (lowerTitle.includes("hair styling")) {
    return "https://images.unsplash.com/photo-1633681926035-ec1ac984418a?w=400&q=80";
  }

  // Makeup services
  if (lowerTitle.includes("bridal makeup")) {
    return "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&q=80";
  }
  if (lowerTitle.includes("event makeup")) {
    return "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400&q=80";
  }
  if (lowerTitle.includes("makeup lesson")) {
    return "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&q=80";
  }

  // Beauty services
  if (lowerTitle.includes("facial")) {
    return "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&q=80";
  }
  if (lowerTitle.includes("waxing")) {
    return "https://images.unsplash.com/photo-1516914943479-89db7d9ae7f2?w=400&q=80";
  }
  if (lowerTitle.includes("eyebrow")) {
    return "https://images.unsplash.com/photo-1516914943479-89db7d9ae7f2?w=400&q=80";
  }
  if (lowerTitle.includes("eyelash")) {
    return "https://images.unsplash.com/photo-1583001308730-78cb364ef9b6?w=400&q=80";
  }

  // Nail services
  if (lowerTitle.includes("manicure")) {
    return "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&q=80";
  }
  if (lowerTitle.includes("pedicure")) {
    return "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=400&q=80";
  }
  if (lowerTitle.includes("gel nail")) {
    return "https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=400&q=80";
  }
  if (lowerTitle.includes("nail extension")) {
    return "https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=400&q=80";
  }
  if (lowerTitle.includes("nail art")) {
    return "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&q=80";
  }

  // Fitness services
  if (lowerTitle.includes("personal training")) {
    return "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80";
  }
  if (lowerTitle.includes("yoga")) {
    return "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&q=80";
  }
  if (lowerTitle.includes("pilates")) {
    return "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&q=80";
  }
  if (lowerTitle.includes("nutrition")) {
    return "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&q=80";
  }

  // Pet services
  if (lowerTitle.includes("dog grooming")) {
    return "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80";
  }
  if (lowerTitle.includes("cat grooming")) {
    return "https://images.unsplash.com/photo-1573865526739-10c1dd7340b8?w=400&q=80";
  }
  if (lowerTitle.includes("pet walking") || lowerTitle.includes("dog walking")) {
    return "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&q=80";
  }
  if (lowerTitle.includes("pet sitting")) {
    return "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=400&q=80";
  }

  // Cleaning services
  if (lowerTitle.includes("house cleaning")) {
    return "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&q=80";
  }
  if (lowerTitle.includes("deep cleaning")) {
    return "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&q=80";
  }
  if (lowerTitle.includes("office cleaning")) {
    return "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=400&q=80";
  }
  if (lowerTitle.includes("cleaning")) {
    return "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=400&q=80";
  }

  // Default wellness image
  return "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&q=80";
};

export default function ServicesGrid({ services, allProviders = [] }: Props) {
  if (services.length === 0) {
    return (
      <div className="border rounded-lg p-8 text-center text-muted-foreground">
        No services found. Try adjusting your filters.
      </div>
    );
  }

  // Get unique service titles
  const uniqueServices = services.reduce((acc, service) => {
    if (!acc.find((s) => s.title === service.title)) {
      acc.push(service);
    }
    return acc;
  }, [] as Service[]);

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Available Services</h2>
          <span className="text-sm text-muted-foreground">
            {uniqueServices.length} service types
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {uniqueServices.map((service) => {
            const providerCount = services.filter(
              (s) => s.title === service.title
            ).length;
            const imageUrl = getServiceImage(service.title);

            return (
              <Link
                key={service.title}
                href={`/services/${encodeURIComponent(service.title)}`}
                className="group border rounded-xl overflow-hidden hover:shadow-xl hover:border-primary/50 transition-all block bg-card"
              >
                {/* Service Image */}
                <div className="relative h-48 w-full overflow-hidden bg-muted">
                  <Image
                    src={imageUrl}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-3 right-3 bg-background/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-semibold text-primary shadow-md">
                    from ${(service.price / 100).toFixed(2)}
                  </div>
                </div>

                {/* Service Info */}
                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors line-clamp-1">
                      {service.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{service.durationMin} mins</span>
                      </div>
                      <span>•</span>
                      <span>{providerCount} provider{providerCount > 1 ? "s" : ""}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t">
                    <div className="text-sm font-medium text-primary group-hover:underline">
                      View providers →
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
