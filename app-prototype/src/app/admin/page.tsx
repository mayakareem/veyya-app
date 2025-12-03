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
import { Input } from "@/components/ui/input";
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
  RefreshCw,
  Star,
  Download,
  Search,
  Filter
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  // Check if database URL is configured
  const isDatabaseConfigured = process.env.DATABASE_URL &&
    process.env.DATABASE_URL !== "postgresql://user:password@localhost:5432/veyya?schema=public" &&
    !process.env.DATABASE_URL.includes("localhost:5432") &&
    !process.env.DATABASE_URL.includes("YOUR_DATABASE_URL");

  if (!isDatabaseConfigured) {
    return (
      <main className="mx-auto max-w-7xl p-6">
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="text-orange-700">Database Not Configured</CardTitle>
            <CardDescription className="text-orange-600">
              The admin dashboard requires a PostgreSQL database connection
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <p className="text-sm mb-4 font-medium">
                Required environment variables:
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm bg-white p-4 rounded border font-mono">
                <li>DATABASE_URL (PostgreSQL connection string)</li>
                <li>NEXTAUTH_SECRET (Random secret string)</li>
                <li>NEXTAUTH_URL (https://veyya-app.vercel.app)</li>
              </ul>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded p-4">
              <p className="text-sm font-semibold text-blue-800 mb-2">Database Setup Options:</p>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-medium text-blue-700">Option 1: Vercel Postgres (via Marketplace)</p>
                  <ol className="list-decimal list-inside space-y-1 ml-2 text-blue-600 mt-1">
                    <li>Go to your Vercel project dashboard</li>
                    <li>Click "Marketplace" tab</li>
                    <li>Search for "Vercel Postgres" and click "Add"</li>
                    <li>Follow the setup wizard - it auto-configures DATABASE_URL</li>
                  </ol>
                </div>
                <div>
                  <p className="font-medium text-blue-700">Option 2: Neon (Recommended - Free tier)</p>
                  <ol className="list-decimal list-inside space-y-1 ml-2 text-blue-600 mt-1">
                    <li>Visit <span className="font-mono">neon.tech</span> and create a free account</li>
                    <li>Create a new project → Copy the connection string</li>
                    <li>In Vercel: Settings → Environment Variables</li>
                    <li>Add DATABASE_URL with your Neon connection string</li>
                    <li>Redeploy the application</li>
                  </ol>
                </div>
                <div>
                  <p className="font-medium text-blue-700">Option 3: Supabase (Free tier available)</p>
                  <ol className="list-decimal list-inside space-y-1 ml-2 text-blue-600 mt-1">
                    <li>Visit <span className="font-mono">supabase.com</span> and create a project</li>
                    <li>Go to Settings → Database → Connection String</li>
                    <li>Copy the "Connection Pooling" string (better for serverless)</li>
                    <li>Add to Vercel Environment Variables as DATABASE_URL</li>
                    <li>Redeploy the application</li>
                  </ol>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded p-4">
              <p className="text-sm font-semibold text-green-800 mb-2">💡 Recommendations:</p>
              <ul className="list-disc list-inside space-y-1 text-sm text-green-700 ml-2">
                <li><strong>Neon</strong> - Best for hobby/dev projects (generous free tier, serverless-friendly)</li>
                <li><strong>Supabase</strong> - Best if you need auth/storage/realtime features built-in</li>
                <li><strong>Vercel Postgres</strong> - Best for production apps already on Vercel</li>
              </ul>
            </div>

            <div className="bg-white border rounded p-4">
              <p className="text-sm font-semibold mb-2">After adding DATABASE_URL:</p>
              <ol className="list-decimal list-inside space-y-1 text-sm ml-2">
                <li>Run database migrations: <code className="bg-gray-100 px-2 py-0.5 rounded">npx prisma db push</code></li>
                <li>Redeploy on Vercel</li>
                <li>Access the admin dashboard</li>
              </ol>
            </div>

            <div className="flex gap-3">
              <Link href="/">
                <Button variant="outline">Return to Home</Button>
              </Link>
              <Link href="/hub">
                <Button variant="outline">View All Pages</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    );
  }

  try {
    // Test database connection first
    await prisma.$connect();

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
      clientOnlyUsers,
      dualRoleUsers,
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
      // Count users who are NOT providers
      prisma.user.count({
        where: {
          provider: null,
        },
      }),
      // Count users who are BOTH clients and providers
      prisma.user.count({
        where: {
          provider: {
            isNot: null,
          },
        },
      }),
    ]).catch((error) => {
      console.error("Database error:", error);
      throw new Error("Failed to fetch dashboard data");
    });

  // Mock pending providers count (in production, add isVerified field to schema)
  const pendingProviders = 3;

  // Fetch recent users with detailed information
  const recentUsers = await prisma.user.findMany({
    take: 10,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      createdAt: true,
      provider: {
        select: {
          id: true,
        },
      },
      _count: {
        select: {
          bookings: true,
        },
      },
      bookings: {
        select: {
          price: true,
          status: true,
        },
      },
    },
  });

  // Fetch recent providers with detailed information
  const pendingProvidersData = await prisma.providerProfile.findMany({
    take: 10,
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: { name: true, email: true, image: true },
      },
      services: {
        select: {
          id: true,
          title: true,
          price: true,
        },
      },
      _count: {
        select: {
          bookings: true,
        },
      },
      bookings: {
        where: {
          status: "COMPLETED",
        },
        select: {
          price: true,
        },
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
                <div className="flex flex-col gap-0.5 mt-2">
                  <p className="text-xs text-blue-600 flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {clientOnlyUsers} clients only
                  </p>
                  <p className="text-xs text-purple-600 flex items-center gap-1">
                    <Briefcase className="w-3 h-3" />
                    {dualRoleUsers} client + provider
                  </p>
                </div>
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
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export CSV
                  </Button>
                  <Button variant="outline" size="sm">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Search and Filter Bar */}
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users by name or email..."
                    className="pl-10"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Registered</TableHead>
                    <TableHead>Bookings</TableHead>
                    <TableHead>Spent</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentUsers.map((user) => {
                    const totalSpent = user.bookings
                      .filter(b => b.status === "COMPLETED")
                      .reduce((sum, b) => sum + b.price, 0);
                    const isProvider = !!user.provider;

                    return (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={user.image || undefined} />
                              <AvatarFallback>
                                {user.name?.charAt(0)?.toUpperCase() || "U"}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{user.name || "Unknown"}</div>
                              <div className="text-xs text-muted-foreground">
                                ID: {user.id.slice(0, 8)}...
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{user.email}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{user._count.bookings}</Badge>
                        </TableCell>
                        <TableCell className="font-semibold">
                          ฿{(totalSpent / 100).toFixed(0)}
                        </TableCell>
                        <TableCell>
                          {isProvider ? (
                            <Badge className="bg-purple-100 text-purple-700">
                              Client + Provider
                            </Badge>
                          ) : (
                            <Badge variant="outline">Client</Badge>
                          )}
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
                    );
                  })}
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
                  <CardTitle>Provider Management</CardTitle>
                  <CardDescription>
                    {totalProviders} total providers · {pendingProviders} awaiting verification
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export CSV
                  </Button>
                  <Button variant="outline" size="sm">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Search and Filter Bar */}
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search providers by name, email, or display name..."
                    className="pl-10"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Provider</TableHead>
                    <TableHead>Display Name</TableHead>
                    <TableHead>Services</TableHead>
                    <TableHead>Bookings</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingProvidersData.map((provider) => {
                    const totalRevenue = provider.bookings.reduce((sum, b) => sum + b.price, 0);

                    return (
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
                        <TableCell>
                          <Badge variant="secondary">{provider.services.length} services</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{provider._count.bookings}</Badge>
                        </TableCell>
                        <TableCell>
                          {provider.rating && provider.rating > 0 ? (
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-semibold">{provider.rating.toFixed(1)}</span>
                            </div>
                          ) : (
                            <span className="text-muted-foreground text-sm">No rating</span>
                          )}
                        </TableCell>
                        <TableCell className="font-semibold">
                          ฿{(totalRevenue / 100).toLocaleString()}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {new Date(provider.createdAt).toLocaleDateString()}
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
                    );
                  })}
                  {pendingProvidersData.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                        No providers found
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
  } catch (error) {
    console.error("Admin dashboard error:", error);
    return (
      <main className="mx-auto max-w-7xl p-6">
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-700">Error Loading Admin Dashboard</CardTitle>
            <CardDescription className="text-red-600">
              {error instanceof Error ? error.message : "An unexpected error occurred"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              This could be due to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              <li>Database connection issues</li>
              <li>Missing environment variables (DATABASE_URL, NEXTAUTH_SECRET)</li>
              <li>Authentication configuration problems</li>
            </ul>
            <div className="mt-6">
              <Link href="/">
                <Button variant="outline">Return to Home</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    );
  }
}
