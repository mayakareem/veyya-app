import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { Users, Briefcase, Calendar } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function SimpleAdminDashboard() {
  try {
    const [totalUsers, totalProviders, totalBookings] = await Promise.all([
      prisma.user.count(),
      prisma.providerProfile.count(),
      prisma.booking.count(),
    ]);

    return (
      <main className="mx-auto max-w-7xl p-6 space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard (Simple)</h1>
          <p className="text-muted-foreground mt-1">Platform overview</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Users</p>
                  <p className="text-3xl font-bold">{totalUsers}</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Providers</p>
                  <p className="text-3xl font-bold">{totalProviders}</p>
                </div>
                <Briefcase className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Bookings</p>
                  <p className="text-3xl font-bold">{totalBookings}</p>
                </div>
                <Calendar className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-700">Database Connected!</CardTitle>
            <CardDescription>All systems working</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-4">This dashboard proves database connectivity works perfectly on Vercel.</p>
            <Link href="/hub">
              <Button>Go to Navigation Hub</Button>
            </Link>
          </CardContent>
        </Card>
      </main>
    );
  } catch (error) {
    return (
      <main className="mx-auto max-w-7xl p-6">
        <Card className="border-red-200">
          <CardHeader>
            <CardTitle>Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error instanceof Error ? error.message : "Unknown error"}</p>
          </CardContent>
        </Card>
      </main>
    );
  }
}
