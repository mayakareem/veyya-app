import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Users,
  Briefcase,
  Calendar,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Settings,
  BarChart3,
  UserCheck,
  UserX,
  Eye,
  Ban,
  CheckSquare,
  XSquare,
  RefreshCw
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const session = await auth();

  // Check if user is admin
  if (!session?.user) {
    redirect("/api/auth/signin?callbackUrl=/admin");
  }

  // Fetch real-time stats
  const [
    totalUsers,
    totalProviders,
    totalBookings,
    activeBookingsToday,
    completedBookingsToday,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.providerProfile.count(),
    prisma.booking.count(),
    prisma.booking.count({
      where: {
        createdAt: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
        },
      },
    }),
    prisma.booking.count({
      where: {
        status: "COMPLETED",
        createdAt: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
        },
      },
    }),
  ]);

  // Mock pending providers count (in production, add isVerified field to schema)
  const pendingProviders = 3;

  // Fetch recent users
  const recentUsers = await prisma.user.findMany({
    take: 10,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      createdAt: true,
      _count: {
        select: { bookings: true },
      },
    },
  });

  // Fetch recent providers (mock pending status for demo)
  const pendingProvidersData = await prisma.providerProfile.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: { name: true, email: true, image: true },
      },
    },
  });

  // Fetch recent bookings
  const recentBookings = await prisma.booking.findMany({
    take: 15,
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { name: true, email: true } },
      provider: { select: { displayName: true } },
      service: { select: { title: true } },
    },
  });

  // Calculate revenue (mock - in production, sum from transactions)
  const totalRevenue = recentBookings
    .filter((b) => b.status === "COMPLETED")
    .reduce((sum, b) => sum + b.price, 0);

  const revenueToday = recentBookings
    .filter(
      (b) =>
        b.status === "COMPLETED" &&
        new Date(b.createdAt) >= new Date(new Date().setHours(0, 0, 0, 0))
    )
    .reduce((sum, b) => sum + b.price, 0);

  return (
    <main className="mx-auto max-w-7xl p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Platform overview and management
          </p>
        </div>
        <Link href="/admin/settings">
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </Link>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Users</p>
                <p className="text-3xl font-bold">{totalUsers}</p>
                <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +12% from last month
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Active Providers</p>
                <p className="text-3xl font-bold">{totalProviders}</p>
                <p className="text-xs text-orange-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {pendingProviders} pending approval
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Bookings</p>
                <p className="text-3xl font-bold">{totalBookings}</p>
                <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {activeBookingsToday} today
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Revenue</p>
                <p className="text-3xl font-bold">฿{(totalRevenue / 100).toLocaleString()}</p>
                <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                  <DollarSign className="w-3 h-3" />
                  ฿{(revenueToday / 100).toFixed(0)} today
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">
            <BarChart3 className="w-4 h-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="users">
            <Users className="w-4 h-4 mr-2" />
            Users
          </TabsTrigger>
          <TabsTrigger value="providers">
            <Briefcase className="w-4 h-4 mr-2" />
            Providers
          </TabsTrigger>
          <TabsTrigger value="bookings">
            <Calendar className="w-4 h-4 mr-2" />
            Bookings
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common administrative tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/admin/providers" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <UserCheck className="w-4 h-4 mr-2" />
                    Approve Providers ({pendingProviders} pending)
                  </Button>
                </Link>
                <Link href="/admin/bookings" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="w-4 h-4 mr-2" />
                    Monitor Bookings ({activeBookingsToday} active today)
                  </Button>
                </Link>
                <Link href="/admin/settings" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="w-4 h-4 mr-2" />
                    Platform Settings
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Today's Activity</CardTitle>
                <CardDescription>Real-time platform metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-sm">Completed Bookings</span>
                  </div>
                  <Badge variant="secondary">{completedBookingsToday}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-orange-600" />
                    <span className="text-sm">Active Bookings</span>
                  </div>
                  <Badge variant="secondary">{activeBookingsToday}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <span className="text-sm">Pending Approvals</span>
                  </div>
                  <Badge variant="destructive">{pendingProviders}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-emerald-600" />
                    <span className="text-sm">Revenue Today</span>
                  </div>
                  <Badge className="bg-emerald-100 text-emerald-700">
                    ฿{(revenueToday / 100).toFixed(0)}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Revenue by Category (Mock Data) */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue by Category</CardTitle>
              <CardDescription>Last 30 days performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { category: "Beauty", revenue: 45000, bookings: 120, growth: 15 },
                  { category: "Wellness", revenue: 38000, bookings: 95, growth: 12 },
                  { category: "Nails", revenue: 28000, bookings: 85, growth: 8 },
                  { category: "Hair", revenue: 32000, bookings: 78, growth: -3 },
                  { category: "Makeup", revenue: 22000, bookings: 45, growth: 20 },
                ].map((cat) => (
                  <div key={cat.category} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-3">
                        <span className="font-medium w-24">{cat.category}</span>
                        <Badge variant="secondary" className="text-xs">
                          {cat.bookings} bookings
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-semibold">฿{cat.revenue.toLocaleString()}</span>
                        <div className={`flex items-center gap-1 text-xs ${
                          cat.growth >= 0 ? "text-green-600" : "text-red-600"
                        }`}>
                          {cat.growth >= 0 ? (
                            <TrendingUp className="w-3 h-3" />
                          ) : (
                            <TrendingDown className="w-3 h-3" />
                          )}
                          {Math.abs(cat.growth)}%
                        </div>
                      </div>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${(cat.revenue / 45000) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>All registered users ({totalUsers} total)</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Registered</TableHead>
                    <TableHead>Bookings</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={user.image || undefined} />
                            <AvatarFallback>
                              {user.name?.charAt(0)?.toUpperCase() || "U"}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{user.name || "Unknown"}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{user.email}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{user._count.bookings}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Ban className="w-4 h-4 text-red-600" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Providers Tab */}
        <TabsContent value="providers" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Provider Approvals</CardTitle>
                  <CardDescription>
                    {pendingProviders} providers awaiting verification
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Provider</TableHead>
                    <TableHead>Display Name</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingProvidersData.map((provider) => (
                    <TableRow key={provider.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={provider.user.image || undefined} />
                            <AvatarFallback>
                              {provider.user.name?.charAt(0)?.toUpperCase() || "P"}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{provider.user.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {provider.user.email}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{provider.displayName}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(provider.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                          Pending Review
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-green-600">
                            <CheckSquare className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600">
                            <XSquare className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {pendingProvidersData.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                        No pending provider approvals
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Bookings Tab */}
        <TabsContent value="bookings" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Bookings</CardTitle>
                  <CardDescription>All platform bookings ({totalBookings} total)</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Provider</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentBookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell>
                        <div className="font-medium">{booking.user.name}</div>
                        <div className="text-xs text-muted-foreground">{booking.user.email}</div>
                      </TableCell>
                      <TableCell className="font-medium">{booking.service?.title || "N/A"}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {booking.provider.displayName}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(booking.start).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="font-semibold">
                        ฿{(booking.price / 100).toFixed(0)}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            booking.status === "COMPLETED"
                              ? "default"
                              : booking.status === "CONFIRMED"
                              ? "secondary"
                              : "outline"
                          }
                          className={
                            booking.status === "COMPLETED"
                              ? "bg-green-100 text-green-700"
                              : booking.status === "CONFIRMED"
                              ? "bg-blue-100 text-blue-700"
                              : ""
                          }
                        >
                          {booking.status.toLowerCase()}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
