import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-helpers";
import { Badge } from "@/components/ui/badge";

export const dynamic = "force-dynamic";

export default async function AdminProvidersPage() {
  await requireAdmin();

  const providers = await prisma.providerProfile.findMany({
    include: {
      user: { select: { name: true, email: true } },
      _count: {
        select: {
          services: true,
          bookings: true,
          availability: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const stats = {
    total: providers.length,
    withServices: providers.filter((p) => p._count.services > 0).length,
    withBookings: providers.filter((p) => p._count.bookings > 0).length,
    avgRating:
      providers.filter((p) => p.rating !== null).reduce((sum, p) => sum + (p.rating || 0), 0) /
        providers.filter((p) => p.rating !== null).length || 0,
  };

  return (
    <main className="mx-auto max-w-7xl p-6 space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Provider Management</h1>
        <p className="text-muted-foreground">
          Manage provider profiles and monitor platform activity
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="border rounded-lg p-4">
          <div className="text-2xl font-bold">{stats.total}</div>
          <div className="text-sm text-muted-foreground">Total Providers</div>
        </div>
        <div className="border rounded-lg p-4">
          <div className="text-2xl font-bold">{stats.withServices}</div>
          <div className="text-sm text-muted-foreground">With Services</div>
        </div>
        <div className="border rounded-lg p-4">
          <div className="text-2xl font-bold">{stats.withBookings}</div>
          <div className="text-sm text-muted-foreground">With Bookings</div>
        </div>
        <div className="border rounded-lg p-4">
          <div className="text-2xl font-bold">
            {stats.avgRating ? stats.avgRating.toFixed(1) : "N/A"}
          </div>
          <div className="text-sm text-muted-foreground">Avg Rating</div>
        </div>
      </div>

      {/* Providers List */}
      <div className="space-y-3">
        <h2 className="text-xl font-medium">All Providers</h2>
        {providers.length === 0 ? (
          <div className="border rounded-lg p-8 text-center text-muted-foreground">
            No providers registered yet
          </div>
        ) : (
          <div className="space-y-3">
            {providers.map((provider) => (
              <div key={provider.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between gap-4">
                  {/* Provider Info */}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg">
                        {provider.displayName}
                      </h3>
                      {provider.rating && (
                        <span className="text-sm text-muted-foreground">
                          ⭐ {provider.rating.toFixed(1)}
                        </span>
                      )}
                    </div>

                    <div className="text-sm space-y-1">
                      <div className="text-muted-foreground">
                        <span className="font-medium">Email:</span>{" "}
                        {provider.user.email}
                      </div>
                      {provider.user.name && (
                        <div className="text-muted-foreground">
                          <span className="font-medium">Name:</span>{" "}
                          {provider.user.name}
                        </div>
                      )}
                      <div className="text-muted-foreground">
                        <span className="font-medium">ID:</span>{" "}
                        <code className="text-xs">{provider.id}</code>
                      </div>
                    </div>

                    {provider.shortBio && (
                      <p className="text-sm text-muted-foreground">
                        {provider.shortBio}
                      </p>
                    )}

                    {/* Categories */}
                    {provider.categories.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {provider.categories.map((cat) => (
                          <Badge key={cat} variant="secondary" className="text-xs">
                            {cat}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="text-right space-y-2">
                    {provider.basePrice && (
                      <div>
                        <div className="font-semibold">
                          ฿{(provider.basePrice / 100).toFixed(2)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          base price
                        </div>
                      </div>
                    )}
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div>{provider._count.services} services</div>
                      <div>{provider._count.bookings} bookings</div>
                      <div>{provider._count.availability} slots</div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-3 pt-3 border-t flex gap-2 text-sm">
                  <a
                    href={`/providers/${provider.id}`}
                    className="underline"
                  >
                    View Profile
                  </a>
                  <span className="text-muted-foreground">•</span>
                  <a
                    href={`/admin/providers/${provider.id}`}
                    className="underline"
                  >
                    Edit
                  </a>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">
                    Joined {new Date(provider.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-4">
        <a className="underline text-sm" href="/admin">
          ← Back to admin
        </a>
      </div>
    </main>
  );
}
