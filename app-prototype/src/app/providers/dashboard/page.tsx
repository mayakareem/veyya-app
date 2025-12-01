"use client";

import { useState, useEffect } from "react";
import Container from "@/components/layout/Container";
import ProviderHeader from "@/components/layout/ProviderHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Clock,
  CheckCircle2,
  XCircle,
  Calendar,
  DollarSign,
  Star,
  TrendingUp,
  MapPin,
  User,
  Phone,
  MessageSquare,
  AlertCircle,
  Award,
  Briefcase,
  Edit,
  ChevronRight,
  X,
  Navigation,
  Timer
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Mock data - replace with actual API calls
const mockStats = {
  totalEarnings: 45680,
  monthlyEarnings: 12340,
  averageRating: 4.8,
  totalReviews: 127,
  completedBookings: 156,
  responseRate: 98,
};

const mockCertifications = [
  {
    id: "cert-001",
    name: "Advanced Hair Styling",
    category: "Beauty Services",
    level: "Expert",
    completedDate: "2024-08-15",
    expiryDate: "2026-08-15",
    certificateNumber: "VEY-HS-2024-1523",
  },
  {
    id: "cert-002",
    name: "Swedish Massage Therapy",
    category: "Wellness & Massage",
    level: "Professional",
    completedDate: "2024-06-20",
    expiryDate: "2026-06-20",
    certificateNumber: "VEY-SM-2024-0892",
  },
  {
    id: "cert-003",
    name: "Nail Art & Design",
    category: "Beauty Services",
    level: "Intermediate",
    completedDate: "2024-09-10",
    expiryDate: "2026-09-10",
    certificateNumber: "VEY-NA-2024-2156",
  },
  {
    id: "cert-004",
    name: "Deep Tissue Massage",
    category: "Wellness & Massage",
    level: "Expert",
    completedDate: "2024-07-05",
    expiryDate: "2026-07-05",
    certificateNumber: "VEY-DT-2024-1047",
  },
  {
    id: "cert-005",
    name: "Bridal Makeup Specialist",
    category: "Beauty Services",
    level: "Professional",
    completedDate: "2024-10-12",
    expiryDate: "2026-10-12",
    certificateNumber: "VEY-BM-2024-2789",
  },
];

const mockServices = [
  {
    id: "svc-001",
    name: "Haircut & Styling",
    category: "Hair Services",
    price: 850,
    duration: "1.5 hours",
    active: true,
  },
  {
    id: "svc-002",
    name: "Hair Coloring",
    category: "Hair Services",
    price: 3200,
    duration: "3 hours",
    active: true,
  },
  {
    id: "svc-003",
    name: "Swedish Massage",
    category: "Massage Therapy",
    price: 1000,
    duration: "1 hour",
    active: true,
  },
  {
    id: "svc-004",
    name: "Deep Tissue Massage",
    category: "Massage Therapy",
    price: 1200,
    duration: "1 hour",
    active: true,
  },
  {
    id: "svc-005",
    name: "Aromatherapy Massage",
    category: "Massage Therapy",
    price: 1500,
    duration: "1.5 hours",
    active: true,
  },
  {
    id: "svc-006",
    name: "Classic Manicure",
    category: "Nail Services",
    price: 450,
    duration: "45 minutes",
    active: true,
  },
  {
    id: "svc-007",
    name: "Gel Nails",
    category: "Nail Services",
    price: 800,
    duration: "1 hour",
    active: true,
  },
  {
    id: "svc-008",
    name: "Nail Art & Design",
    category: "Nail Services",
    price: 650,
    duration: "1 hour",
    active: true,
  },
  {
    id: "svc-009",
    name: "Bridal Makeup",
    category: "Makeup Services",
    price: 2500,
    duration: "2 hours",
    active: true,
  },
  {
    id: "svc-010",
    name: "Special Event Makeup",
    category: "Makeup Services",
    price: 1800,
    duration: "1.5 hours",
    active: false,
  },
];

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
  {
    id: "BK003",
    clientName: "Emily Rodriguez",
    service: "Nail Art & Manicure",
    date: "2025-12-02",
    time: "4:00 PM",
    duration: "1 hour",
    price: 650,
    location: "Silom, Bangkok",
    clientPhone: "+66 83 456 7890",
    requestedAt: "15 minutes ago",
    expiresIn: "29 hours 45 minutes",
  },
];

const mockScheduledBookings = [
  {
    id: "BK004",
    clientName: "Lisa Anderson",
    service: "Bridal Makeup",
    date: "2025-12-02",
    time: "9:00 AM",
    duration: "2 hours",
    price: 2500,
    location: "Asoke, Bangkok",
    clientPhone: "+66 84 567 8901",
    status: "confirmed",
    prepNotes: "Client requested natural look, bringing own foundation",
  },
  {
    id: "BK005",
    clientName: "David Kim",
    service: "Swedish Massage",
    date: "2025-12-03",
    time: "3:00 PM",
    duration: "1 hour",
    price: 1000,
    location: "Phrom Phong, Bangkok",
    clientPhone: "+66 85 678 9012",
    status: "confirmed",
  },
  {
    id: "BK006",
    clientName: "Rachel Green",
    service: "Hair Coloring",
    date: "2025-12-05",
    time: "11:00 AM",
    duration: "3 hours",
    price: 3200,
    location: "Ekkamai, Bangkok",
    clientPhone: "+66 86 789 0123",
    status: "confirmed",
    prepNotes: "Client wants ash blonde, please bring color swatches",
  },
];

const mockPastBookings = [
  {
    id: "BK007",
    clientName: "Tom Wilson",
    service: "Classic Manicure",
    date: "2025-11-28",
    time: "2:00 PM",
    duration: "45 minutes",
    price: 450,
    location: "Sathorn, Bangkok",
    status: "completed",
    rating: 5,
    review: "Amazing service! Very professional and skilled.",
    earnings: 315, // After 30% commission
  },
  {
    id: "BK008",
    clientName: "Anna Martinez",
    service: "Aromatherapy Massage",
    date: "2025-11-27",
    time: "10:00 AM",
    duration: "1.5 hours",
    price: 1500,
    location: "Ari, Bangkok",
    status: "completed",
    rating: 4,
    review: "Good massage, would book again.",
    earnings: 1050,
  },
  {
    id: "BK009",
    clientName: "James Brown",
    service: "Beard Trim",
    date: "2025-11-26",
    time: "5:00 PM",
    duration: "30 minutes",
    price: 350,
    location: "Ratchada, Bangkok",
    status: "completed",
    rating: 5,
    earnings: 245,
  },
  {
    id: "BK010",
    clientName: "Sophie Taylor",
    service: "Gel Nails",
    date: "2025-11-25",
    time: "1:00 PM",
    duration: "1 hour",
    price: 800,
    location: "Siam, Bangkok",
    status: "cancelled",
    reason: "Client cancelled 2 hours before",
    cancellationFee: 400, // 50% fee
  },
];

// Helper function to get badge color based on certification level
const getCertificationLevelBadge = (level: string) => {
  switch (level) {
    case "Expert":
      return "bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-900 dark:text-purple-100";
    case "Professional":
      return "bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900 dark:text-blue-100";
    case "Intermediate":
      return "bg-green-100 text-green-800 border-green-300 dark:bg-green-900 dark:text-green-100";
    default:
      return "bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-900 dark:text-gray-100";
  }
};

// Helper function to calculate time until booking
const getTimeUntilBooking = (dateStr: string, timeStr: string) => {
  const bookingDateTime = new Date(`${dateStr} ${timeStr}`);
  const now = new Date();
  const diff = bookingDateTime.getTime() - now.getTime();

  if (diff < 0) return "Booking time passed";

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (days > 0) return `${days}d ${hours}h ${minutes}m`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
};

export default function ProviderDashboard() {
  const [activeTab, setActiveTab] = useState("new");
  const [showEarningsModal, setShowEarningsModal] = useState(false);
  const [showReviewsModal, setShowReviewsModal] = useState(false);
  const [showBookingsModal, setShowBookingsModal] = useState(false);
  const [showResponseRateModal, setShowResponseRateModal] = useState(false);
  const [selectedBookingForMap, setSelectedBookingForMap] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update timer every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute
    return () => clearInterval(timer);
  }, []);

  const handleAcceptBooking = (bookingId: string) => {
    console.log("Accepting booking:", bookingId);
    // TODO: API call to accept booking
    alert(`Booking ${bookingId} accepted! Client will be notified.`);
  };

  const handleDeclineBooking = (bookingId: string) => {
    console.log("Declining booking:", bookingId);
    // TODO: API call to decline booking
    alert(`Booking ${bookingId} declined.`);
  };

  const handleContactClient = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const handleMessageClient = (bookingId: string) => {
    console.log("Opening chat for booking:", bookingId);
    // TODO: Open messaging interface
    alert("Messaging feature coming soon!");
  };

  return (
    <>
      <ProviderHeader />
      <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background">
        <Container className="py-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Provider Dashboard
              </h1>
              <p className="text-muted-foreground">
                Manage your bookings and track your earnings
              </p>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Card
                className="cursor-pointer hover:shadow-lg hover:border-primary transition-all"
                onClick={() => setShowEarningsModal(true)}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Monthly Earnings
                  </CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold">
                        ฿{mockStats.monthlyEarnings.toLocaleString()}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        ฿{mockStats.totalEarnings.toLocaleString()} total
                      </p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>

              <Card
                className="cursor-pointer hover:shadow-lg hover:border-primary transition-all"
                onClick={() => setShowReviewsModal(true)}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Average Rating
                  </CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold flex items-center gap-1">
                        {mockStats.averageRating}
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {mockStats.totalReviews} reviews
                      </p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>

              <Card
                className="cursor-pointer hover:shadow-lg hover:border-primary transition-all"
                onClick={() => setShowBookingsModal(true)}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Completed Bookings
                  </CardTitle>
                  <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold">
                        {mockStats.completedBookings}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        All time
                      </p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>

              <Card
                className="cursor-pointer hover:border-primary transition-colors"
                onClick={() => setShowResponseRateModal(true)}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Response Rate
                  </CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {mockStats.responseRate}%
                  </div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    Last 30 days
                    <ChevronRight className="h-3 w-3" />
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Bookings Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="new" className="relative">
                  New Requests
                  {mockNewRequests.length > 0 && (
                    <Badge variant="destructive" className="ml-2 h-5 w-5 rounded-full p-0 text-xs">
                      {mockNewRequests.length}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="scheduled">
                  Scheduled ({mockScheduledBookings.length})
                </TabsTrigger>
                <TabsTrigger value="past">
                  Past Bookings
                </TabsTrigger>
              </TabsList>

              {/* New Requests Tab */}
              <TabsContent value="new" className="space-y-4">
                {mockNewRequests.length === 0 ? (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <Clock className="h-12 w-12 text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">No new booking requests</p>
                    </CardContent>
                  </Card>
                ) : (
                  mockNewRequests.map((booking) => (
                    <Card key={booking.id} className="border-l-4 border-l-primary">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-xl mb-1">
                              {booking.service}
                            </CardTitle>
                            <CardDescription className="flex items-center gap-2">
                              <User className="h-4 w-4" />
                              {booking.clientName}
                            </CardDescription>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-primary">
                              ฿{booking.price}
                            </div>
                            <Badge variant="outline" className="mt-1">
                              {booking.id}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {/* Booking Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">{booking.date}</span>
                            <span className="text-muted-foreground">at {booking.time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{booking.duration}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>{booking.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span>{booking.clientPhone}</span>
                          </div>
                        </div>

                        {/* Request Info */}
                        <div className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                          <div className="flex items-center gap-2 text-sm">
                            <AlertCircle className="h-4 w-4 text-orange-600" />
                            <span className="text-orange-900 dark:text-orange-300">
                              Requested {booking.requestedAt} • Expires in {booking.expiresIn}
                            </span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-wrap gap-3">
                          <Button
                            onClick={() => handleAcceptBooking(booking.id)}
                            className="flex-1 bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle2 className="h-4 w-4 mr-2" />
                            Accept Booking
                          </Button>
                          <Button
                            onClick={() => handleDeclineBooking(booking.id)}
                            variant="outline"
                            className="flex-1"
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            Decline
                          </Button>
                          <Button
                            onClick={() => handleContactClient(booking.clientPhone)}
                            variant="outline"
                            size="icon"
                          >
                            <Phone className="h-4 w-4" />
                          </Button>
                          <Button
                            onClick={() => handleMessageClient(booking.id)}
                            variant="outline"
                            size="icon"
                          >
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>

              {/* Scheduled Tab */}
              <TabsContent value="scheduled" className="space-y-4">
                {mockScheduledBookings.length === 0 ? (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">No scheduled bookings</p>
                    </CardContent>
                  </Card>
                ) : (
                  mockScheduledBookings.map((booking) => (
                    <Card key={booking.id} className="border-l-4 border-l-green-500">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-xl mb-1">
                              {booking.service}
                            </CardTitle>
                            <CardDescription className="flex items-center gap-2">
                              <User className="h-4 w-4" />
                              {booking.clientName}
                            </CardDescription>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-green-600">
                              ฿{booking.price}
                            </div>
                            <Badge className="mt-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                              Confirmed
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {/* Booking Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">{booking.date}</span>
                            <span className="text-muted-foreground">at {booking.time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{booking.duration}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>{booking.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span>{booking.clientPhone}</span>
                          </div>
                        </div>

                        {/* Countdown Timer & Navigation */}
                        <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-lg border border-green-200 dark:border-green-800">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <Timer className="h-5 w-5 text-green-600" />
                              <div>
                                <p className="text-sm font-medium text-green-900 dark:text-green-300">
                                  Time until booking
                                </p>
                                <p className="text-2xl font-bold text-green-600">
                                  {getTimeUntilBooking(booking.date, booking.time)}
                                </p>
                              </div>
                            </div>
                            <Button
                              onClick={() => setSelectedBookingForMap(booking.id)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <Navigation className="h-4 w-4 mr-2" />
                              Navigate
                            </Button>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-green-800 dark:text-green-200">
                            <MapPin className="h-4 w-4" />
                            <span>Estimated travel time: 15-20 min</span>
                          </div>
                        </div>

                        {/* Prep Notes */}
                        {booking.prepNotes && (
                          <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                            <p className="text-sm font-medium text-blue-900 dark:text-blue-300 mb-1">
                              Preparation Notes:
                            </p>
                            <p className="text-sm text-blue-800 dark:text-blue-200">
                              {booking.prepNotes}
                            </p>
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex flex-wrap gap-3">
                          <Button
                            onClick={() => handleContactClient(booking.clientPhone)}
                            variant="outline"
                            className="flex-1"
                          >
                            <Phone className="h-4 w-4 mr-2" />
                            Call Client
                          </Button>
                          <Button
                            onClick={() => handleMessageClient(booking.id)}
                            variant="outline"
                            className="flex-1"
                          >
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Message
                          </Button>
                          <Button variant="outline">
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>

              {/* Past Bookings Tab */}
              <TabsContent value="past" className="space-y-4">
                {mockPastBookings.length === 0 ? (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <CheckCircle2 className="h-12 w-12 text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">No past bookings</p>
                    </CardContent>
                  </Card>
                ) : (
                  mockPastBookings.map((booking) => (
                    <Card key={booking.id} className={`border-l-4 ${
                      booking.status === "completed"
                        ? "border-l-gray-400"
                        : "border-l-red-400"
                    }`}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-xl mb-1">
                              {booking.service}
                            </CardTitle>
                            <CardDescription className="flex items-center gap-2">
                              <User className="h-4 w-4" />
                              {booking.clientName}
                            </CardDescription>
                          </div>
                          <div className="text-right">
                            {booking.status === "completed" ? (
                              <>
                                <div className="text-xl font-bold text-green-600">
                                  +฿{booking.earnings}
                                </div>
                                <p className="text-xs text-muted-foreground">
                                  (฿{booking.price} total)
                                </p>
                                {booking.rating && (
                                  <div className="flex items-center gap-1 mt-1 justify-end">
                                    {[...Array(5)].map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`h-3 w-3 ${
                                          i < booking.rating
                                            ? "fill-yellow-400 text-yellow-400"
                                            : "text-gray-300"
                                        }`}
                                      />
                                    ))}
                                  </div>
                                )}
                              </>
                            ) : (
                              <>
                                <div className="text-xl font-bold text-orange-600">
                                  +฿{booking.cancellationFee}
                                </div>
                                <Badge variant="outline" className="mt-1 border-red-400 text-red-600">
                                  Cancelled
                                </Badge>
                              </>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {/* Booking Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">{booking.date}</span>
                            <span className="text-muted-foreground">at {booking.time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{booking.duration}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>{booking.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Badge variant="outline">
                              {booking.id}
                            </Badge>
                          </div>
                        </div>

                        {/* Review */}
                        {booking.review && (
                          <div className="p-3 bg-gray-50 dark:bg-gray-900/20 rounded-lg">
                            <p className="text-sm font-medium mb-1">Client Review:</p>
                            <p className="text-sm text-muted-foreground italic">
                              "{booking.review}"
                            </p>
                          </div>
                        )}

                        {/* Cancellation Reason */}
                        {booking.reason && (
                          <div className="p-3 bg-red-50 dark:bg-red-950/20 rounded-lg">
                            <p className="text-sm font-medium text-red-900 dark:text-red-300 mb-1">
                              Cancellation Reason:
                            </p>
                            <p className="text-sm text-red-800 dark:text-red-200">
                              {booking.reason}
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>
            </Tabs>

            {/* Certifications Section */}
            <Card className="mb-8 mt-8">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-primary" />
                      My Certifications
                    </CardTitle>
                    <CardDescription>
                      Veyya verified certifications - {mockCertifications.length} earned
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <a href="/providers/certifications">
                      View All
                    </a>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockCertifications.map((cert) => (
                    <div
                      key={cert.id}
                      className="p-4 border rounded-lg hover:border-primary transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <Award className="h-8 w-8 text-primary" />
                        <Badge className={`${getCertificationLevelBadge(cert.level)} border`}>
                          {cert.level}
                        </Badge>
                      </div>
                      <h3 className="font-semibold mb-1">{cert.name}</h3>
                      <p className="text-xs text-muted-foreground mb-2">{cert.category}</p>
                      <div className="text-xs space-y-1">
                        <p className="text-muted-foreground">
                          Completed: {new Date(cert.completedDate).toLocaleDateString()}
                        </p>
                        <p className="text-muted-foreground">
                          Valid until: {new Date(cert.expiryDate).toLocaleDateString()}
                        </p>
                        <p className="text-xs font-mono text-muted-foreground">
                          {cert.certificateNumber}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Services & Pricing Section */}
            <Card className="mb-8">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="h-5 w-5 text-primary" />
                      My Services & Pricing
                    </CardTitle>
                    <CardDescription>
                      Services you offer - {mockServices.filter(s => s.active).length} active
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Services
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Group services by category */}
                  {Array.from(new Set(mockServices.map(s => s.category))).map((category) => (
                    <div key={category}>
                      <h3 className="text-sm font-semibold text-muted-foreground mb-2 uppercase">
                        {category}
                      </h3>
                      <div className="space-y-2 mb-4">
                        {mockServices
                          .filter(s => s.category === category)
                          .map((service) => (
                            <div
                              key={service.id}
                              className={`flex items-center justify-between p-3 border rounded-lg ${
                                service.active
                                  ? "bg-background hover:border-primary transition-colors"
                                  : "bg-muted opacity-60"
                              }`}
                            >
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <h4 className="font-medium">{service.name}</h4>
                                  {!service.active && (
                                    <Badge variant="outline" className="text-xs">
                                      Inactive
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  {service.duration}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-lg font-bold text-primary">
                                  ฿{service.price.toLocaleString()}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  You earn: ฿{Math.round(service.price * 0.7).toLocaleString()}
                                </p>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </div>

      {/* Earnings Modal */}
      <Dialog open={showEarningsModal} onOpenChange={setShowEarningsModal}>
        <DialogContent className="max-w-2xl bg-white dark:bg-gray-900">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              Earnings Details
            </DialogTitle>
            <DialogDescription>
              View your earnings breakdown and payment history
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-primary/5 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">This Month</p>
                <p className="text-2xl font-bold">฿{mockStats.monthlyEarnings.toLocaleString()}</p>
              </div>
              <div className="p-4 bg-primary/5 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Total Earnings</p>
                <p className="text-2xl font-bold">฿{mockStats.totalEarnings.toLocaleString()}</p>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Payment Information</h3>
              <p className="text-sm text-muted-foreground">
                Your earnings are processed weekly. The next payout is scheduled for December 6, 2025.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Earnings Breakdown</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Completed Services</span>
                  <span className="font-medium">฿{mockStats.totalEarnings.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Platform Fee (30%)</span>
                  <span className="font-medium text-red-600">-฿{Math.round(mockStats.totalEarnings * 0.3).toLocaleString()}</span>
                </div>
                <div className="border-t pt-2 flex justify-between">
                  <span className="font-semibold">Net Earnings</span>
                  <span className="font-bold text-primary">฿{Math.round(mockStats.totalEarnings * 0.7).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Reviews Modal */}
      <Dialog open={showReviewsModal} onOpenChange={setShowReviewsModal}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-white dark:bg-gray-900">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
              Reviews & Ratings
            </DialogTitle>
            <DialogDescription>
              Your client reviews and rating history
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="p-4 bg-primary/5 rounded-lg text-center">
              <div className="text-4xl font-bold flex items-center justify-center gap-2 mb-2">
                {mockStats.averageRating}
                <Star className="h-8 w-8 fill-yellow-400 text-yellow-400" />
              </div>
              <p className="text-muted-foreground">Based on {mockStats.totalReviews} reviews</p>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold">Recent Reviews</h3>
              {mockPastBookings.filter(b => b.review).map((booking) => (
                <div key={booking.id} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium">{booking.clientName}</p>
                      <p className="text-sm text-muted-foreground">{booking.service}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < (booking.rating || 0)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm italic text-muted-foreground">"{booking.review}"</p>
                  <p className="text-xs text-muted-foreground mt-2">{booking.date}</p>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Bookings Modal */}
      <Dialog open={showBookingsModal} onOpenChange={setShowBookingsModal}>
        <DialogContent className="max-w-2xl bg-white dark:bg-gray-900">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              Completed Bookings
            </DialogTitle>
            <DialogDescription>
              Your booking history and statistics
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg text-center">
                <p className="text-2xl font-bold text-green-600">{mockStats.completedBookings}</p>
                <p className="text-sm text-muted-foreground">Total Completed</p>
              </div>
              <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg text-center">
                <p className="text-2xl font-bold text-blue-600">{mockScheduledBookings.length}</p>
                <p className="text-sm text-muted-foreground">Scheduled</p>
              </div>
              <div className="p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg text-center">
                <p className="text-2xl font-bold text-orange-600">{mockNewRequests.length}</p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Performance Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Average Rating</span>
                  <span className="font-medium flex items-center gap-1">
                    {mockStats.averageRating}
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Response Rate</span>
                  <span className="font-medium">{mockStats.responseRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Reviews</span>
                  <span className="font-medium">{mockStats.totalReviews}</span>
                </div>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Recent Completions</h3>
              <div className="space-y-2">
                {mockPastBookings.filter(b => b.status === "completed").slice(0, 3).map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between text-sm">
                    <div>
                      <p className="font-medium">{booking.service}</p>
                      <p className="text-xs text-muted-foreground">{booking.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-green-600">+฿{booking.earnings}</p>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < (booking.rating || 0)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Response Rate Modal */}
      <Dialog open={showResponseRateModal} onOpenChange={setShowResponseRateModal}>
        <DialogContent className="max-w-2xl bg-white dark:bg-gray-900">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Response Rate Performance
            </DialogTitle>
            <DialogDescription>
              Track how quickly you respond to booking requests
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 mt-4">
            <div className="text-center p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg">
              <p className="text-5xl font-bold text-primary mb-2">{mockStats.responseRate}%</p>
              <p className="text-muted-foreground">Average response rate</p>
              <Badge className="mt-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                Excellent Performance
              </Badge>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold">Last 30 Days Breakdown</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span className="text-sm">Responded within 5 minutes</span>
                  <span className="font-bold text-green-600">85%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span className="text-sm">Responded within 15 minutes</span>
                  <span className="font-bold text-blue-600">12%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span className="text-sm">Responded within 30 minutes</span>
                  <span className="font-bold text-orange-600">3%</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
              <p className="text-sm text-blue-900 dark:text-blue-300">
                <strong>Tip:</strong> Faster response rates (within 5 minutes) increase your booking acceptance by up to 40%!
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Map Navigation Modal */}
      <Dialog open={selectedBookingForMap !== null} onOpenChange={() => setSelectedBookingForMap(null)}>
        <DialogContent className="max-w-4xl bg-white dark:bg-gray-900">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Navigation className="h-5 w-5 text-primary" />
              Navigate to Booking Location
            </DialogTitle>
            <DialogDescription>
              Route and estimated travel time
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            {/* Mock Map Placeholder */}
            <div className="w-full h-96 bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900/20 dark:to-green-900/20 rounded-lg flex items-center justify-center border-2 border-dashed border-primary/30">
              <div className="text-center">
                <MapPin className="h-16 w-16 mx-auto text-primary mb-4" />
                <p className="font-semibold text-lg mb-2">Interactive Map</p>
                <p className="text-sm text-muted-foreground max-w-md">
                  Google Maps integration will show your current location, route to destination, and real-time traffic updates
                </p>
              </div>
            </div>

            {/* Travel Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg text-center">
                <Clock className="h-6 w-6 mx-auto text-blue-600 mb-2" />
                <p className="text-2xl font-bold text-blue-600">15-20 min</p>
                <p className="text-xs text-muted-foreground">Estimated travel time</p>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg text-center">
                <Navigation className="h-6 w-6 mx-auto text-green-600 mb-2" />
                <p className="text-2xl font-bold text-green-600">4.2 km</p>
                <p className="text-xs text-muted-foreground">Distance</p>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg text-center">
                <TrendingUp className="h-6 w-6 mx-auto text-purple-600 mb-2" />
                <p className="text-2xl font-bold text-purple-600">Light</p>
                <p className="text-xs text-muted-foreground">Traffic conditions</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button className="flex-1 bg-primary" asChild>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=Sukhumvit,Bangkok`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Navigation className="h-4 w-4 mr-2" />
                  Open in Google Maps
                </a>
              </Button>
              <Button variant="outline" onClick={() => setSelectedBookingForMap(null)}>
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
