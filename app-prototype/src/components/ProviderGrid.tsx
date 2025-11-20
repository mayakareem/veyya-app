"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

type Provider = {
  id: string;
  displayName: string;
  rating: number | null;
  basePrice: number | null;
  shortBio: string | null;
  categories: string[];
  services: { title: string; price: number; id: string }[];
  _count: { services: number; bookings: number };
  imageUrl?: string | null;
  availability?: { start: Date; capacity: number }[];
};

export default function ProviderGrid({ providers }: { providers: Provider[] }) {
  return (
    <motion.ul
      initial="hidden"
      animate="show"
      variants={{
        hidden: { opacity: 0, y: 8 },
        show: { opacity: 1, y: 0, transition: { staggerChildren: 0.05 } },
      }}
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      {providers.map((provider) => (
        <motion.li
          key={provider.id}
          variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
        >
          <Link
            href={`/providers/${provider.id}`}
            className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow block h-full"
          >
            <div className="space-y-3">
              {/* Image */}
              {provider.imageUrl && (
                <div className="relative w-full aspect-[4/3] bg-muted">
                  <Image
                    src={provider.imageUrl}
                    alt={provider.displayName}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                </div>
              )}

              <div className="p-4 space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h3 className="font-semibold text-lg">
                    {provider.displayName}
                  </h3>
                  {provider.rating && (
                    <div className="flex items-center gap-1 text-sm">
                      <span>⭐</span>
                      <span className="font-medium">
                        {provider.rating.toFixed(1)}
                      </span>
                      <span className="text-muted-foreground">
                        ({provider._count.bookings})
                      </span>
                    </div>
                  )}
                </div>
                {(provider.services[0]?.price || provider.basePrice) && (
                  <div className="text-right">
                    <div className="font-semibold">
                      ฿
                      {((provider.services[0]?.price || provider.basePrice!) / 100).toFixed(
                        0
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">from</div>
                  </div>
                )}
              </div>

              {/* Next Available */}
              {provider.availability && provider.availability.length > 0 && (
                <div className="text-sm">
                  <span className="text-muted-foreground">Next available: </span>
                  <span className="font-medium text-green-600">
                    {new Date(provider.availability[0].start).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                      }
                    )}
                  </span>
                </div>
              )}
              {provider.availability && provider.availability.length === 0 && (
                <div className="text-sm text-muted-foreground">
                  No available slots
                </div>
              )}

              {/* Bio */}
              {provider.shortBio && (
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {provider.shortBio}
                </p>
              )}

              {/* Categories */}
              <div className="flex flex-wrap gap-1">
                {provider.categories.slice(0, 3).map((cat) => (
                  <Badge key={cat} variant="secondary" className="text-xs">
                    {cat}
                  </Badge>
                ))}
                {provider.categories.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{provider.categories.length - 3} more
                  </Badge>
                )}
              </div>

              {/* Services Preview */}
              {provider.services.length > 0 && (
                <div className="text-sm text-muted-foreground">
                  {provider.services.map((s) => s.title).join(" • ")}
                  {provider._count.services > 3 && (
                    <span> • +{provider._count.services - 3} more</span>
                  )}
                </div>
              )}
              </div>
            </div>
          </Link>
        </motion.li>
      ))}
    </motion.ul>
  );
}
