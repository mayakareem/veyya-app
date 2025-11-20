/**
 * ProviderCard Component Stories
 *
 * Example usage patterns for the ProviderCard component
 */

import ProviderCard from "./ProviderCard";

// Example 1: Full provider with all data
export const FullProvider = () => (
  <div className="max-w-sm">
    <ProviderCard
      id="p1"
      name="Lina Beauty Studio"
      rating={4.8}
      priceFrom={120}
      categories={["Beauty", "Nails", "Spa"]}
      nextSlotISO={new Date(Date.now() + 1000 * 60 * 60 * 6).toISOString()}
      imageUrl="https://picsum.photos/seed/beauty/400/225"
    />
  </div>
);

// Example 2: Minimal provider (only required fields)
export const MinimalProvider = () => (
  <div className="max-w-sm">
    <ProviderCard
      id="p2"
      name="Quick Clean Services"
    />
  </div>
);

// Example 3: Provider with no image
export const NoImage = () => (
  <div className="max-w-sm">
    <ProviderCard
      id="p3"
      name="Mobile Pet Grooming"
      rating={4.9}
      priceFrom={200}
      categories={["Pet Care", "Grooming"]}
      nextSlotISO={new Date(Date.now() + 1000 * 60 * 60 * 12).toISOString()}
    />
  </div>
);

// Example 4: Many categories (shows +N badge)
export const ManyCategories = () => (
  <div className="max-w-sm">
    <ProviderCard
      id="p4"
      name="All-in-One Services"
      rating={4.5}
      priceFrom={80}
      categories={["Beauty", "Nails", "Hair", "Makeup", "Wellness", "Massage"]}
      imageUrl="https://picsum.photos/seed/services/400/225"
    />
  </div>
);

// Example 5: Custom href
export const CustomHref = () => (
  <div className="max-w-sm">
    <ProviderCard
      id="p5"
      name="Premium Spa"
      rating={4.7}
      priceFrom={300}
      categories={["Wellness", "Spa"]}
      href="/featured/premium-spa"
      imageUrl="https://picsum.photos/seed/spa/400/225"
    />
  </div>
);

// Example 6: Grid of providers (typical search page layout)
export const GridLayout = () => (
  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl">
    <ProviderCard
      id="p1"
      name="Lina Beauty Studio"
      rating={4.8}
      priceFrom={120}
      categories={["Beauty", "Nails"]}
      nextSlotISO={new Date(Date.now() + 1000 * 60 * 60 * 6).toISOString()}
      imageUrl="https://picsum.photos/seed/beauty1/400/225"
    />
    <ProviderCard
      id="p2"
      name="Pawsitive Pet Care"
      rating={4.9}
      priceFrom={180}
      categories={["Pet Care"]}
      nextSlotISO={new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString()}
      imageUrl="https://picsum.photos/seed/pets/400/225"
    />
    <ProviderCard
      id="p3"
      name="Clean & Calm"
      rating={4.6}
      priceFrom={80}
      categories={["Cleaning"]}
      imageUrl="https://picsum.photos/seed/clean/400/225"
    />
  </div>
);

// Example 7: Compact variant (custom className)
export const CompactVariant = () => (
  <div className="max-w-sm">
    <ProviderCard
      id="p6"
      name="Express Service"
      rating={4.4}
      priceFrom={60}
      categories={["Quick Service"]}
      className="shadow-sm"
    />
  </div>
);

// Usage in a React component:
/*
import ProviderCard from "@/components/ProviderCard";

function SearchPage() {
  const providers = await listProviders();

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {providers.map((provider) => (
        <ProviderCard
          key={provider.id}
          id={provider.id}
          name={provider.name}
          rating={provider.rating}
          priceFrom={provider.basePrice}
          categories={provider.categories}
          nextSlotISO={provider.nextAvailableISO}
          imageUrl={provider.heroImage}
        />
      ))}
    </div>
  );
}
*/
