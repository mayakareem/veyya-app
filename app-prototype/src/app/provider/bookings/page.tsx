import { prisma } from "@/lib/prisma";
import { requireProvider } from "@/lib/auth-helpers";
import { Badge } from "@/components/ui/badge";

export const dynamic = "force-dynamic";

export default async function ProviderBookingsPage() {
  const user = await requireProvider();

  const provider = await prisma.providerProfile.findUnique({
    where: { userId: user.id },
    select: { id: true },
  });

  const bookings = provider
    ? await prisma.booking.findMany({
        where: { providerId: provider.id },
        include: {
          user: { select: { name: true, email: true } },
          service: { select: { title: true, durationMin: true } },
        },
        orderBy: { start: "desc" },
      })
    : [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING": return "secondary";
      case "CONFIRMED": return "default";
      case "COMPLETED": return "default";
      case "CANCELED": return "destructive";
      case "REFUNDED": return "destructive";
      default: return "secondary";
    }
  };

  return (
    <main className="mx-auto max-w-5xl p-6 space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Bookings</h1>
        <p className="text-muted-foreground">
          View and manage your bookings.
        </p>
      </div>

      {bookings.length === 0 ? (
        <p className="text-sm text-muted-foreground">No bookings yet.</p>
      ) : (
        <div className="space-y-3">
          {bookings.map((booking) => (
            <div key={booking.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">
                      {booking.service?.title || "Service"}
                    </h3>
                    <Badge variant={getStatusColor(booking.status)}>
                      {booking.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Customer: {booking.user.name || booking.user.email}
                  </p>
                </div>
                <div className="text-right text-sm">
                  <div className="font-medium">{(booking.price / 100).toFixed(2)}</div>
                  {booking.service && (
                    <div className="text-muted-foreground">{booking.service.durationMin} min</div>
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
                  <span className="font-medium">Address:</span> {booking.address}
                </div>
              )}

              {booking.notes && (
                <div className="text-sm">
                  <span className="font-medium">Notes:</span> {booking.notes}
                </div>
              )}

              {booking.paymentIntent && (
                <div className="text-xs text-muted-foreground">
                  Payment: {booking.paymentIntent}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <a className="underline text-sm" href="/provider">← Back to provider dashboard</a>
    </main>
  );
}
