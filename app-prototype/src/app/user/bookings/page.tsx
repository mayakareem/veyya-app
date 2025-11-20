import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth-helpers";
import { Badge } from "@/components/ui/badge";

export const dynamic = "force-dynamic";

export default async function UserBookingsPage() {
  const user = await requireUser();

  const bookings = await prisma.booking.findMany({
    where: { userId: user.id },
    include: {
      provider: { select: { displayName: true } },
      service: { select: { title: true, durationMin: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  const getStatusColor = (status: string) => {
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

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "PENDING":
        return "Pending Provider";
      case "CONFIRMED":
        return "Confirmed";
      case "COMPLETED":
        return "Completed";
      case "CANCELED":
        return "Canceled";
      case "REFUNDED":
        return "Refunded";
      default:
        return status;
    }
  };

  // Group bookings by status
  const upcoming = bookings.filter(
    (b) =>
      (b.status === "PENDING" || b.status === "CONFIRMED") &&
      new Date(b.start) > new Date()
  );
  const past = bookings.filter(
    (b) =>
      b.status === "COMPLETED" ||
      b.status === "CANCELED" ||
      b.status === "REFUNDED" ||
      new Date(b.start) <= new Date()
  );

  return (
    <main className="mx-auto max-w-5xl p-6 space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Your Bookings</h1>
        <p className="text-muted-foreground">
          View and track your service bookings
        </p>
      </div>

      {/* Upcoming Bookings */}
      <div className="space-y-4">
        <h2 className="text-xl font-medium">
          Upcoming ({upcoming.length})
        </h2>
        {upcoming.length === 0 ? (
          <div className="border rounded-lg p-8 text-center text-muted-foreground">
            No upcoming bookings.{" "}
            <a href="/search" className="underline">
              Find a provider
            </a>
          </div>
        ) : (
          <div className="space-y-3">
            {upcoming.map((booking) => (
              <div key={booking.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">
                        {booking.service?.title || "Service Booking"}
                      </h3>
                      <Badge variant={getStatusColor(booking.status)}>
                        {getStatusLabel(booking.status)}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Provider: {booking.provider.displayName}
                    </p>
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

                {booking.status === "PENDING" && (
                  <div className="text-xs text-muted-foreground pt-2 border-t">
                    Waiting for provider to confirm this booking
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Past Bookings */}
      {past.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-medium">
            Past ({past.length})
          </h2>
          <div className="space-y-3">
            {past.map((booking) => (
              <div
                key={booking.id}
                className="border rounded-lg p-4 space-y-2 opacity-75"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">
                        {booking.service?.title || "Service Booking"}
                      </h3>
                      <Badge variant={getStatusColor(booking.status)}>
                        {getStatusLabel(booking.status)}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Provider: {booking.provider.displayName}
                    </p>
                  </div>
                  {booking.price > 0 && (
                    <div className="text-sm font-medium">
                      ฿{(booking.price / 100).toFixed(2)}
                    </div>
                  )}
                </div>

                <div className="text-sm text-muted-foreground">
                  {new Date(booking.start).toLocaleDateString()}
                </div>

                {booking.status === "COMPLETED" && !booking.notes && (
                  <div className="pt-2 border-t">
                    <a
                      href={`/booking/${booking.id}/review`}
                      className="text-sm underline"
                    >
                      Leave a review →
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-4">
        <a className="underline text-sm" href="/search">
          Find providers →
        </a>
        <a className="underline text-sm" href="/user">
          ← Back to dashboard
        </a>
      </div>
    </main>
  );
}
