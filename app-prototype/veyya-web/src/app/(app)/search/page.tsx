import { listProviders } from "@/lib/cms";
import ProviderCard from "@/components/ProviderCard";

export default async function SearchPage() {
  const providers = await listProviders();

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight mb-2">
          Find Service Providers
        </h1>
        <p className="text-muted-foreground">
          Discover trusted professionals near you
        </p>
      </div>

      {/* Providers Grid */}
      {providers.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="text-lg font-medium mb-2">No providers found</h3>
          <p className="text-muted-foreground">
            Try adjusting your filters or check back later
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {providers.map((p) => (
            <ProviderCard
              key={p.id}
              id={p.id}
              name={p.name}
              rating={p.rating}
              priceFrom={p.basePrice}
              categories={p.categories}
              nextSlotISO={p.nextAvailableISO}
              imageUrl={p.heroImage}
            />
          ))}
        </div>
      )}

      {/* Results Count */}
      {providers.length > 0 && (
        <div className="mt-8 text-center text-sm text-muted-foreground">
          Showing {providers.length} provider{providers.length !== 1 ? "s" : ""}
        </div>
      )}
    </main>
  );
}
