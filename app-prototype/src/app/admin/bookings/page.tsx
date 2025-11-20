import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-helpers";
import { Badge } from "@/components/ui/badge";

export const dynamic = "force-dynamic";

type BookingStatus = "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELED" | "REFUNDED";

export default async function AdminBookingsPage() {
  await requireAdmin();

  const bookings = await prisma.booking.findMany({
    include: {
      user: { select: { name: true, email: true } },
      provider: { select: { displayName: true } },
      service: { select: { title: true, durationMin: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 100, // Limit for performance
  });

  // Calculate stats
  const stats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === "PENDING").length,
    confirmed: bookings.filter((b) => b.status === "CONFIRMED").length,
    completed: bookings.filter((b) => b.status === "COMPLETED").length,
    canceled: bookings.filter((b) => b.status === "CANCELED").length,
    totalRevenue: bookings
      .filter((b) => b.status === "COMPLETED")
      .reduce((sum, b) => sum + b.price, 0),
  };

  const getStatusColor = (status: BookingStatus) => {
    switch (status) {
      case "PENDING":
        return "secondary";
      case "CONFIRMED":
        return "default";
      case "COMPLETED":
        return "default";
      case "CANCELED":
        return "destructive";
      case "REFUNDED":
        return "destructive";
      default:
        return "secondary";
    }
  };

  // Group by status
  const byStatus: Record<BookingStatus, typeof bookings> = {
    PENDING: bookings.filter((b) => b.status === "PENDING"),
    CONFIRMED: bookings.filter((b) => b.status === "CONFIRMED"),
    COMPLETED: bookings.filter((b) => b.status === "COMPLETED"),
    CANCELED: bookings.filter((b) => b.status === "CANCELED"),
    REFUNDED: bookings.filter((b) => b.status === "REFUNDED"),
  };

  return (
    <main className="mx-auto max-w-7xl p-6 space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Bookings Management</h1>
        <p className="text-muted-foreground">
          Monitor and manage all platform bookings
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="border rounded-lg p-4">
          <div className="text-2xl font-bold">{stats.total}</div>
          <div className="text-sm text-muted-foreground">Total</div>
        </div>
        <div className="border rounded-lg p-4">
          <div className="text-2xl font-bold">{stats.pending}</div>
          <div className="text-sm text-muted-foreground">Pending</div>
        </div>
        <div className="border rounded-lg p-4">
          <div className="text-2xl font-bold">{stats.confirmed}</div>
          <div className="text-sm text-muted-foreground">Confirmed</div>
        </div>
        <div className="border rounded-lg p-4">
          <div className="text-2xl font-bold">{stats.completed}</div>
          <div className="text-sm text-muted-foreground">Completed</div>
        </div>
        <div className="border rounded-lg p-4">
          <div className="text-2xl font-bold">{stats.canceled}</div>
          <div className="text-sm text-muted-foreground">Canceled</div>
        </div>
        <div className="border rounded-lg p-4">
          <div className="text-2xl font-bold">
            ฿{(stats.totalRevenue / 100).toFixed(0)}
          </div>
          <div className="text-sm text-muted-foreground">Revenue</div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="space-y-4">
        <h2 className="text-xl font-medium">Recent Bookings</h2>

        {bookings.length === 0 ? (
          <div className="border rounded-lg p-8 text-center text-muted-foreground">
            No bookings yet
          </div>
        ) : (
          <div className="space-y-3">
            {bookings.slice(0, 50).map((booking) => (
              <div key={booking.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">
                        {booking.service?.title || "Service Booking"}
                      </h3>
                      <Badge variant={getStatusColor(booking.status as BookingStatus)}>
                        {booking.status}
                      </Badge>
                    </div>
                    <div className="text-sm space-y-0.5">
                      <div className="text-muted-foreground">
                        <span className="font-medium">Customer:</span>{" "}
                        {booking.user.name || booking.user.email}
                      </div>
                      <div className="text-muted-foreground">
                        <span className="font-medium">Provider:</span>{" "}
                        {booking.provider.displayName}
                      </div>
                      <div className="text-muted-foreground">
                        <span className="font-medium">ID:</span>{" "}
                        <code className="text-xs">{booking.id}</code>
                      </div>
                    </div>
                  </div>
                  <div className="text-right text-sm">
                    {booking.price > 0 && (
                      <div className="font-medium">
                        ฿{(booking.price / 100).toFixed(2)}
                      </div>
                    )}
                    {booking.service && (
                      <div className="text-muted-foreground">
                        {booking.service.durationMin} min
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="font-medium">Start:</span>{" "}
                    {new Date(booking.start).toLocaleString()}
                  </div>
                  <div>
                    <span className="font-medium">End:</span>{" "}
                    {new Date(booking.end).toLocaleString()}
                  </div>
                </div>

                {booking.address && (
                  <div className="text-sm">
                    <span className="font-medium">Location:</span>{" "}
                    {booking.address}
                  </div>
                )}

                {booking.notes && (
                  <div className="text-sm">
                    <span className="font-medium">Notes:</span> {booking.notes}
                  </div>
                )}

                <div className="pt-2 border-t text-xs text-muted-foreground">
                  Created: {new Date(booking.createdAt).toLocaleString()}
                  {booking.paymentIntent && (
                    <span> • Payment: {booking.paymentIntent}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {bookings.length > 50 && (
          <div className="text-sm text-muted-foreground text-center pt-4">
            Showing 50 of {bookings.length} bookings
          </div>
        )}
      </div>

      {/* Status Groups */}
      <div className="space-y-6">
        <h2 className="text-xl font-medium">By Status</h2>

        {(Object.keys(byStatus) as BookingStatus[]).map((status) => {
          const list = byStatus[status];
          if (list.length === 0) return null;

          return (
            <div key={status} className="space-y-2">
              <h3 className="font-medium flex items-center gap-2">
                <Badge variant={getStatusColor(status)}>{status}</Badge>
                <span className="text-sm text-muted-foreground">
                  ({list.length})
                </span>
              </h3>
              <div className="grid gap-2 text-sm">
                {list.slice(0, 5).map((booking) => (
                  <div
                    key={booking.id}
                    className="border rounded p-3 flex items-center justify-between"
                  >
                    <div>
                      <div>{booking.service?.title || "Service"}</div>
                      <div className="text-xs text-muted-foreground">
                        {booking.user.email} → {booking.provider.displayName}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(booking.start).toLocaleDateString()}
                    </div>
                  </div>
                ))}
                {list.length > 5 && (
                  <div className="text-xs text-muted-foreground text-center">
                    +{list.length - 5} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex gap-4">
        <a className="underline text-sm" href="/admin">
          ← Back to admin
        </a>
      </div>
    </main>
  );
}
