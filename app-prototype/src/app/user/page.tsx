import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, Ticket, Package, Sparkles, Repeat, Gift, TrendingUp } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function UserDashboard() {
  const session = await auth();

  // Redirect to login if not authenticated
  if (!session?.user) {
    redirect("/api/auth/signin?callbackUrl=/user");
  }

  const user = session.user;

  // Fetch user's bookings
  const bookings = await prisma.booking.findMany({
    where: { userId: user.id },
    include: {
      provider: { select: { displayName: true } },
      service: { select: { title: true, durationMin: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 10,
  });

  // Separate upcoming and past bookings
  const upcomingBookings = bookings.filter(
    (b) =>
      (b.status === "PENDING" || b.status === "CONFIRMED") &&
      new Date(b.start) > new Date()
  ).slice(0, 3);

  const pastBookings = bookings.filter(
    (b) =>
      b.status === "COMPLETED" ||
      new Date(b.start) <= new Date()
  ).slice(0, 5);

  // Mock vouchers (in production, fetch from database)
  const vouchers = [
    { id: "1", code: "WELCOME20", discount: 20, type: "percentage", minSpend: 500, expiresAt: new Date("2025-12-31"), used: false },
    { id: "2", code: "FIRST500", discount: 500, type: "fixed", minSpend: 2000, expiresAt: new Date("2025-12-15"), used: false },
    { id: "3", code: "BEAUTY15", discount: 15, type: "percentage", minSpend: 1000, expiresAt: new Date("2025-12-25"), used: false },
  ];

  // Mock bundle deals
  const bundles = [
    {
      id: "1",
      name: "Beauty Package",
      description: "Facial + Manicure + Pedicure",
      originalPrice: 2500,
      bundlePrice: 1999,
      savings: 501,
      services: ["Facial Treatment", "Gel Manicure", "Spa Pedicure"],
    },
    {
      id: "2",
      name: "Wellness Retreat",
      description: "Thai Massage + Aromatherapy",
      originalPrice: 2800,
      bundlePrice: 2199,
      savings: 601,
      services: ["Thai Massage 90min", "Aromatherapy Session"],
    },
    {
      id: "3",
      name: "Hair Transformation",
      description: "Cut + Color + Treatment",
      originalPrice: 4500,
      bundlePrice: 3599,
      savings: 901,
      services: ["Haircut", "Full Color", "Keratin Treatment"],
    },
  ];

  return (
    <main className="mx-auto max-w-7xl p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {session?.user?.name || "Guest"}!</h1>
          <p className="text-muted-foreground mt-1">Manage your bookings, vouchers, and discover new deals</p>
        </div>
        <Link href="/search">
          <Button size="lg">
            <Sparkles className="w-4 h-4 mr-2" />
            Book New Service
          </Button>
        </Link>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{upcomingBookings.length}</p>
                <p className="text-sm text-muted-foreground">Upcoming</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{pastBookings.length}</p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                <Ticket className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{vouchers.filter(v => !v.used).length}</p>
                <p className="text-sm text-muted-foreground">Vouchers</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                <Package className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{bundles.length}</p>
                <p className="text-sm text-muted-foreground">Bundles</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Upcoming Bookings */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Upcoming Bookings</CardTitle>
                  <CardDescription>Your scheduled appointments</CardDescription>
                </div>
                <Link href="/user/bookings">
                  <Button variant="ghost" size="sm">View All</Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              {upcomingBookings.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p className="mb-4">No upcoming bookings</p>
                  <Link href="/search">
                    <Button variant="outline">Find a Service</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {upcomingBookings.map((booking) => (
                    <div key={booking.id} className="border rounded-lg p-4 hover:border-primary transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold">{booking.service?.title || "Service"}</h3>
                          <p className="text-sm text-muted-foreground">{booking.provider.displayName}</p>
                        </div>
                        <Badge variant={booking.status === "CONFIRMED" ? "default" : "secondary"}>
                          {booking.status === "CONFIRMED" ? "Confirmed" : "Pending"}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(booking.start).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {new Date(booking.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        {booking.price > 0 && (
                          <span className="font-semibold text-foreground">
                            ฿{(booking.price / 100).toFixed(0)}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Rebook from Past Bookings */}
          {pastBookings.length > 0 && (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Repeat className="w-5 h-5 text-primary" />
                  <div>
                    <CardTitle>Book Again</CardTitle>
                    <CardDescription>Quick rebooking from your past services</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {pastBookings.slice(0, 4).map((booking) => (
                    <div key={booking.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow group">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-medium text-sm">{booking.service?.title || "Service"}</h4>
                          <p className="text-xs text-muted-foreground">{booking.provider.displayName}</p>
                        </div>
                        {booking.price > 0 && (
                          <span className="text-sm font-semibold">฿{(booking.price / 100).toFixed(0)}</span>
                        )}
                      </div>
                      <Link href={`/services/${booking.service?.title || 'booking'}`}>
                        <Button size="sm" className="w-full" variant="outline">
                          <Repeat className="w-3 h-3 mr-1" />
                          Book Again
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Bundle Deals */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-primary" />
                <div>
                  <CardTitle>Bundle Deals</CardTitle>
                  <CardDescription>Save more when you book together</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {bundles.map((bundle) => (
                  <div key={bundle.id} className="border rounded-lg p-4 hover:border-primary transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{bundle.name}</h3>
                          <Badge variant="secondary" className="bg-green-100 text-green-700">
                            Save ฿{bundle.savings}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{bundle.description}</p>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {bundle.services.map((service, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {service}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-muted-foreground line-through">
                          ฿{bundle.originalPrice}
                        </span>
                        <span className="text-xl font-bold text-primary">
                          ฿{bundle.bundlePrice}
                        </span>
                      </div>
                      <Link href="/search">
                        <Button size="sm">
                          Book Bundle
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Vouchers */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Ticket className="w-5 h-5 text-primary" />
                <div>
                  <CardTitle>My Vouchers</CardTitle>
                  <CardDescription>Available discounts</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {vouchers.filter(v => !v.used).map((voucher) => (
                <div key={voucher.id} className="border-2 border-dashed border-primary/50 rounded-lg p-4 bg-primary/5">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Gift className="w-5 h-5 text-primary" />
                      <span className="font-mono font-bold text-lg">{voucher.code}</span>
                    </div>
                    <Badge variant="secondary">
                      {voucher.type === "percentage" ? `${voucher.discount}% OFF` : `฿${voucher.discount} OFF`}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    Min. spend: ฿{voucher.minSpend}
                  </p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">
                      Expires: {new Date(voucher.expiresAt).toLocaleDateString()}
                    </span>
                    <button className="text-primary font-medium hover:underline">
                      Copy Code
                    </button>
                  </div>
                </div>
              ))}
              {vouchers.filter(v => !v.used).length === 0 && (
                <div className="text-center py-6 text-muted-foreground">
                  <Ticket className="w-10 h-10 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No vouchers available</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Trending Services */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <CardTitle className="text-base">Trending Services</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { name: "Thai Massage", price: 1000, trend: "+25%" },
                { name: "Gel Manicure", price: 500, trend: "+18%" },
                { name: "Bridal Makeup", price: 3500, trend: "+32%" },
              ].map((service, idx) => (
                <Link key={idx} href="/search" className="flex items-center justify-between p-2 hover:bg-muted rounded-lg transition-colors">
                  <div>
                    <p className="font-medium text-sm">{service.name}</p>
                    <p className="text-xs text-muted-foreground">฿{service.price}</p>
                  </div>
                  <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                    {service.trend}
                  </Badge>
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
