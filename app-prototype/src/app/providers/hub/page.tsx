"use client";

import { useState } from "react";
import Container from "@/components/layout/Container";
import ProviderHeader from "@/components/layout/ProviderHeader";
import NotificationCenter from "@/components/provider/NotificationCenter";
import CalendarAvailability from "@/components/provider/CalendarAvailability";
import SLAMetrics from "@/components/provider/SLAMetrics";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DollarSign,
  Star,
  CheckCircle2,
  TrendingUp,
  Calendar,
  BarChart3,
  Settings,
  ChevronRight,
  Clock,
  User,
  MapPin,
  Phone,
  MessageSquare,
  XCircle,
} from "lucide-react";

// Mock stats from dashboard
const mockStats = {
  totalEarnings: 45680,
  monthlyEarnings: 12340,
  averageRating: 4.8,
  totalReviews: 127,
  completedBookings: 156,
  responseRate: 98,
  declineRate: 12,
  cancellationRate: 2.5,
  ppsScore: 94,
  ppsTier: "Gold" as const,
};

const mockNewRequests = [
  {
    id: "BK001",
    clientName: "Sarah Johnson",
    service: "Haircut & Styling",
    date: "2025-12-03",
    time: "10:00 AM",
    duration: "1.5 hours",
    price: 850,
    location: "Sukhumvit, Bangkok",
    clientPhone: "+66 81 234 5678",
    requestedAt: "2 hours ago",
    expiresIn: "22 hours",
  },
  {
    id: "BK002",
    clientName: "Michael Chen",
    service: "Deep Tissue Massage",
    date: "2025-12-04",
    time: "2:00 PM",
    duration: "1 hour",
    price: 1200,
    location: "Thonglor, Bangkok",
    clientPhone: "+66 82 345 6789",
    requestedAt: "45 minutes ago",
    expiresIn: "29 hours",
  },
];

export default function ProviderHub() {
  const [activeTab, setActiveTab] = useState("overview");

  const handleAcceptBooking = (bookingId: string) => {
    console.log("Accepting booking:", bookingId);
    alert(`Booking ${bookingId} accepted! Client will be notified.`);
  };

  const handleDeclineBooking = (bookingId: string) => {
    console.log("Declining booking:", bookingId);
    alert(`Booking ${bookingId} declined.`);
  };

  return (
    <>
      <ProviderHeader />

      <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background">
        <Container className="py-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-3xl md:text-4xl font-bold">Provider Hub</h1>
                <div className="flex items-center gap-3">
                  <NotificationCenter />
                  <Button variant="outline" asChild>
                    <a href="/providers/dashboard">
                      <Settings className="h-4 w-4 mr-2" />
                      Full Dashboard
                    </a>
                  </Button>
                </div>
              </div>
              <p className="text-muted-foreground">
                Manage bookings, availability, and track your performance
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Monthly Earnings</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">฿{mockStats.monthlyEarnings.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                    ฿{mockStats.totalEarnings.toLocaleString()} total
                    <ChevronRight className="h-3 w-3" />
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Performance Score</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{mockStats.ppsScore}/100</div>
                  <Badge className="mt-1 bg-yellow-100 text-yellow-800 border border-yellow-300">
                    {mockStats.ppsTier} Tier
                  </Badge>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold flex items-center gap-1">
                    {mockStats.averageRating}
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {mockStats.totalReviews} reviews
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Completed</CardTitle>
                  <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockStats.completedBookings}</div>
                  <p className="text-xs text-muted-foreground mt-1">All time bookings</p>
                </CardContent>
              </Card>
            </div>

            {/* Main Content Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4 mb-6">
                <TabsTrigger value="overview" className="relative">
                  <Calendar className="h-4 w-4 mr-2" />
                  Bookings
                  {mockNewRequests.length > 0 && (
                    <Badge variant="destructive" className="ml-2 h-5 w-5 rounded-full p-0 text-xs">
                      {mockNewRequests.length}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="availability">
                  <Clock className="h-4 w-4 mr-2" />
                  Availability
                </TabsTrigger>
                <TabsTrigger value="performance">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Performance
                </TabsTrigger>
                <TabsTrigger value="settings">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </TabsTrigger>
              </TabsList>

              {/* Bookings Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>New Booking Requests</CardTitle>
                    <CardDescription>
                      Respond quickly to maintain your high ranking
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {mockNewRequests.length === 0 ? (
                      <div className="text-center py-12">
                        <CheckCircle2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">No pending requests</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {mockNewRequests.map((booking) => (
                          <div
                            key={booking.id}
                            className="p-4 border rounded-lg border-l-4 border-l-primary hover:shadow-md transition-shadow"
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h3 className="font-semibold text-lg">{booking.service}</h3>
                                <p className="text-sm text-muted-foreground flex items-center gap-2">
                                  <User className="h-4 w-4" />
                                  {booking.clientName}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-2xl font-bold text-primary">฿{booking.price}</p>
                                <Badge variant="outline">{booking.id}</Badge>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span>{booking.date} at {booking.time}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span>{booking.duration}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                <span>{booking.location}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-muted-foreground" />
                                <span>{booking.clientPhone}</span>
                              </div>
                            </div>

                            <div className="flex gap-2">
                              <Button
                                onClick={() => handleAcceptBooking(booking.id)}
                                className="flex-1 bg-green-600 hover:bg-green-700"
                              >
                                <CheckCircle2 className="h-4 w-4 mr-2" />
                                Accept
                              </Button>
                              <Button
                                onClick={() => handleDeclineBooking(booking.id)}
                                variant="outline"
                                className="flex-1"
                              >
                                <XCircle className="h-4 w-4 mr-2" />
                                Decline
                              </Button>
                              <Button variant="outline" size="icon">
                                <Phone className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="icon">
                                <MessageSquare className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                <div className="text-center">
                  <Button variant="outline" asChild>
                    <a href="/providers/dashboard">
                      View All Bookings & History
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </a>
                  </Button>
                </div>
              </TabsContent>

              {/* Availability Tab */}
              <TabsContent value="availability">
                <CalendarAvailability />
              </TabsContent>

              {/* Performance Tab */}
              <TabsContent value="performance">
                <SLAMetrics />
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings">
                <Card>
                  <CardHeader>
                    <CardTitle>Settings & Preferences</CardTitle>
                    <CardDescription>
                      Manage your account and service settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <a href="/providers/dashboard">
                        <User className="h-4 w-4 mr-2" />
                        Edit Profile & Services
                      </a>
                    </Button>
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <a href="/providers/certifications">
                        <Star className="h-4 w-4 mr-2" />
                        My Certifications
                      </a>
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <DollarSign className="h-4 w-4 mr-2" />
                      Payment Settings
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Settings className="h-4 w-4 mr-2" />
                      Notification Preferences
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </Container>
      </div>
    </>
  );
}
