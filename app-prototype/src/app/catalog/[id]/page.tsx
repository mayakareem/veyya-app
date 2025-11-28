"use client";

import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Container from "@/components/layout/Container";
import { getCategoryById, getServiceById } from "@/lib/constants/services";
import { getServiceImage } from "@/lib/utils/serviceImages";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Star, Calendar as CalendarIcon, Plus, Minus, ChevronLeft, Shield, Award, ThumbsUp, ChevronRight, Tag, X } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { getBundleRecommendations, calculateBundleDiscount, type BundleOption } from "@/lib/utils/serviceBundles";

export default function ServiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const serviceId = decodeURIComponent(resolvedParams.id);

  const { addToCart, removeFromCart, getItemQuantity } = useCart();
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<Date | null>(null);
  const [showBundleRecommendations, setShowBundleRecommendations] = useState<boolean>(false);
  const [selectedBundleServices, setSelectedBundleServices] = useState<BundleOption[]>([]);

  // Find service across all categories
  const findService = () => {
    const categories = ["beauty", "nails", "hair", "pet-care", "cleaning", "wellness", "fitness"];

    for (const catId of categories) {
      const category = getCategoryById(catId);
      if (!category) continue;

      for (const subcategory of category.subcategories) {
        const service = subcategory.services.find(s => s.id === serviceId);
        if (service) {
          return {
            service,
            subcategory,
            category,
          };
        }
      }
    }
    return null;
  };

  const serviceData = findService();

  if (!serviceData) {
    return (
      <main className="min-h-screen bg-muted/30">
        <Container className="py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Service not found</h1>
            <Button onClick={() => router.push("/")}>Back to Home</Button>
          </div>
        </Container>
      </main>
    );
  }

  const { service, subcategory, category } = serviceData;
  const quantity = getItemQuantity(serviceId);
  const imageUrl = getServiceImage(service.name, category.name);

  const cartItem = {
    name: service.name,
    price: parseInt(service.priceRange?.split("-")[0].replace(/[^0-9]/g, "") || "0"),
    duration: parseInt(service.duration?.split(" ")[0] || "60"),
    category: category.name,
    subcategory: subcategory.name,
    description: `${subcategory.name} - ${service.name}`,
  };

  // Get bundle recommendations
  const bundleRecommendations = getBundleRecommendations(serviceId);
  const hasBundles = bundleRecommendations.length > 0;

  // Calculate bundle discount
  const bundleDiscount = selectedBundleServices.length > 0
    ? calculateBundleDiscount(cartItem, selectedBundleServices)
    : null;

  // Toggle bundle service selection
  const toggleBundleService = (bundleService: BundleOption) => {
    setSelectedBundleServices(prev => {
      const exists = prev.find(s => s.serviceId === bundleService.serviceId);
      if (exists) {
        return prev.filter(s => s.serviceId !== bundleService.serviceId);
      } else {
        return [...prev, bundleService];
      }
    });
  };

  // Add service with bundles to cart
  const handleAddWithBundles = () => {
    // Add main service
    addToCart(cartItem);

    // Add all selected bundle services
    selectedBundleServices.forEach(bundleService => {
      const bundleCartItem = {
        name: bundleService.serviceName,
        price: bundleService.price,
        duration: parseInt(bundleService.duration.split(" ")[0] || "60"),
        category: bundleService.category,
        subcategory: bundleService.subcategory,
        description: `${bundleService.subcategory} - ${bundleService.serviceName}`,
      };
      addToCart(bundleCartItem);
    });

    // Show success message with savings
    if (bundleDiscount) {
      toast.success(`Bundle added! You saved ฿${bundleDiscount.savings} (${bundleDiscount.discount}% off)`);
    } else {
      toast.success(`${service.name} added to cart`);
    }

    setShowBundleRecommendations(false);
    setSelectedBundleServices([]);
  };

  // Get today's date
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];

  // Mock available time slots for today
  const getTodayTimeSlots = () => {
    return ["9:00 AM", "10:30 AM", "12:00 PM", "2:00 PM", "4:30 PM", "6:00 PM", "8:00 PM"];
  };

  // Get time slots for a specific date
  const getTimeSlotsForDate = (date: Date) => {
    return ["9:00 AM", "10:30 AM", "12:00 PM", "2:00 PM", "4:30 PM", "6:00 PM", "8:00 PM"];
  };

  // Generate calendar days for current month
  const getCalendarDays = () => {
    const year = today.getFullYear();
    const month = today.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty slots for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      // Only show today and future dates
      if (date >= new Date(today.getFullYear(), today.getMonth(), today.getDate())) {
        days.push(date);
      } else {
        days.push(null);
      }
    }

    return days;
  };

  const calendarDays = getCalendarDays();
  const displayDate = selectedCalendarDate || today;
  const timeSlots = selectedCalendarDate ? getTimeSlotsForDate(selectedCalendarDate) : getTodayTimeSlots();

  // Mock reviews
  const reviews = [
    {
      id: 1,
      name: "Sarah M.",
      rating: 5,
      date: "2 weeks ago",
      comment: "Excellent service! Very professional and the results exceeded my expectations. Highly recommend!",
      verified: true,
    },
    {
      id: 2,
      name: "Emma L.",
      rating: 5,
      date: "1 month ago",
      comment: "Amazing experience from start to finish. The provider was skilled and friendly. Will definitely book again!",
      verified: true,
    },
    {
      id: 3,
      name: "Lisa K.",
      rating: 4,
      date: "1 month ago",
      comment: "Great service overall. Very satisfied with the quality and professionalism.",
      verified: true,
    },
  ];

  const avgRating = 4.8;
  const totalReviews = 127;

  return (
    <main className="min-h-screen bg-muted/30">
      <Container className="py-6 sm:py-10">
        {/* Back Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
          className="mb-4 sm:mb-6"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back
        </Button>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Service Image & Header */}
            <div className="bg-white border rounded-xl overflow-hidden">
              <div className="relative h-64 sm:h-80 w-full bg-muted">
                <Image
                  src={imageUrl}
                  alt={service.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-4 sm:p-6">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-1">
                      {category.name} • {subcategory.name}
                    </p>
                    <h1 className="text-2xl sm:text-3xl font-bold mb-2">{service.name}</h1>

                    {/* Rating */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{avgRating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        ({totalReviews} reviews)
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-muted-foreground mb-1">Starting from</p>
                    <p className="text-2xl sm:text-3xl font-bold text-primary">
                      {service.priceRange?.split("-")[0]}
                    </p>
                  </div>
                </div>

                {/* Quick Info */}
                <div className="flex flex-wrap gap-3 sm:gap-4 pt-3 border-t">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>{service.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>At your location</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="w-4 h-4 text-muted-foreground" />
                    <span>Verified providers</span>
                  </div>
                </div>
              </div>
            </div>

            {/* About This Service */}
            <div className="bg-white border rounded-xl p-4 sm:p-6">
              <h2 className="text-xl font-bold mb-3">About This Service</h2>
              <div className="space-y-3 text-sm sm:text-base text-muted-foreground">
                <p>
                  Professional {service.name.toLowerCase()} service delivered by experienced and verified providers.
                  All our service providers are carefully vetted and maintain high standards of quality and professionalism.
                </p>
                <p>
                  This service includes a comprehensive {subcategory.name.toLowerCase()} treatment that takes approximately {service.duration}.
                  Our providers bring all necessary equipment and products to ensure the best results.
                </p>
              </div>
            </div>

            {/* What's Included */}
            <div className="bg-white border rounded-xl p-4 sm:p-6">
              <h2 className="text-xl font-bold mb-3">What's Included</h2>
              <ul className="space-y-2 text-sm sm:text-base">
                <li className="flex items-start gap-2">
                  <ThumbsUp className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                  <span>Professional {subcategory.name.toLowerCase()} service</span>
                </li>
                <li className="flex items-start gap-2">
                  <ThumbsUp className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                  <span>All necessary equipment and products included</span>
                </li>
                <li className="flex items-start gap-2">
                  <ThumbsUp className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                  <span>Verified and background-checked provider</span>
                </li>
                <li className="flex items-start gap-2">
                  <ThumbsUp className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                  <span>Flexible cancellation policy</span>
                </li>
                <li className="flex items-start gap-2">
                  <ThumbsUp className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                  <span>100% satisfaction guarantee</span>
                </li>
              </ul>
            </div>

            {/* Customer Reviews */}
            <div className="bg-white border rounded-xl p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Customer Reviews</h2>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold text-lg">{avgRating}</span>
                  <span className="text-sm text-muted-foreground">({totalReviews})</span>
                </div>
              </div>

              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="pb-4 border-b last:border-0">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold text-sm">{review.name}</p>
                          {review.verified && (
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                              Verified
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < review.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">{review.date}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{review.comment}</p>
                  </div>
                ))}
              </div>

              <Button variant="outline" className="w-full mt-4">
                View All Reviews
              </Button>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white border rounded-xl p-4 sm:p-6 sticky top-6">
              <h3 className="font-bold text-lg mb-4">Book This Service</h3>

              {/* Price Summary */}
              <div className="mb-4 pb-4 border-b">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Service Price</span>
                  <span className="font-semibold">{service.priceRange}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Duration</span>
                  <span>{service.duration}</span>
                </div>
              </div>

              {/* Date & Time Selection */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium">Select Date & Time</label>
                  {!showCalendar && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowCalendar(true)}
                      className="text-xs gap-1"
                    >
                      <CalendarIcon className="w-3 h-3" />
                      Other Dates
                    </Button>
                  )}
                </div>

                {/* Calendar View */}
                {showCalendar ? (
                  <div className="border rounded-lg p-3 mb-3">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-semibold">
                        {displayDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                      </h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setShowCalendar(false);
                          setSelectedCalendarDate(null);
                        }}
                        className="text-xs"
                      >
                        Today
                      </Button>
                    </div>

                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                        <div key={day} className="text-center text-xs font-medium text-muted-foreground p-1">
                          {day}
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                      {calendarDays.map((day, index) => {
                        if (!day) {
                          return <div key={`empty-${index}`} className="aspect-square" />;
                        }
                        const isToday = day.toDateString() === today.toDateString();
                        const isSelected = selectedCalendarDate?.toDateString() === day.toDateString();
                        return (
                          <Button
                            key={day.toISOString()}
                            variant={isSelected ? "default" : "outline"}
                            size="sm"
                            className={`aspect-square p-0 text-xs ${isToday ? 'border-primary' : ''}`}
                            onClick={() => setSelectedCalendarDate(day)}
                          >
                            {day.getDate()}
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="mb-3">
                    <p className="text-xs font-medium text-muted-foreground mb-2">
                      Today - {today.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                )}

                {/* Time Slots */}
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-2">
                    {selectedCalendarDate
                      ? `Available times for ${selectedCalendarDate.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}`
                      : 'Available times today'}
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((time) => {
                      const dateTimeKey = selectedCalendarDate
                        ? `${selectedCalendarDate.toISOString().split('T')[0]}-${time}`
                        : `${todayStr}-${time}`;
                      return (
                        <Button
                          key={time}
                          variant="outline"
                          size="sm"
                          className={`text-xs h-9 ${
                            selectedDate === dateTimeKey ? "bg-primary text-primary-foreground" : ""
                          }`}
                          onClick={() => setSelectedDate(dateTimeKey)}
                        >
                          {time}
                        </Button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-4 pb-4 border-b">
                <label className="text-sm font-medium mb-2 block">Quantity</label>
                {quantity === 0 ? (
                  <Button
                    onClick={() => {
                      if (hasBundles) {
                        setShowBundleRecommendations(true);
                      } else {
                        addToCart(cartItem);
                        toast.success(`${service.name} added to cart`);
                      }
                    }}
                    className="w-full gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add to Cart
                  </Button>
                ) : (
                  <div className="flex items-center justify-center gap-3 bg-muted rounded-lg p-2">
                    <Button
                      onClick={() => removeFromCart(serviceId)}
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="font-semibold text-lg w-8 text-center">
                      {quantity}
                    </span>
                    <Button
                      onClick={() => {
                        addToCart(cartItem);
                        toast.success(`${service.name} added to cart`);
                      }}
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>

              {/* Book Now Button */}
              <Button
                className="w-full mb-3"
                size="lg"
                disabled={!selectedDate}
                onClick={() => {
                  if (quantity === 0) {
                    addToCart(cartItem);
                  }
                  router.push("/cart");
                }}
              >
                {selectedDate ? "Book Now" : "Select Date & Time"}
              </Button>

              {/* Trust Badges */}
              <div className="space-y-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span>100% verified providers</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-blue-600" />
                  <span>Top-rated professionals</span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-purple-600" />
                  <span>Flexible rescheduling</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Bundle Recommendations Modal */}
      {showBundleRecommendations && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setShowBundleRecommendations(false)}
        >
          <div className="bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full sm:max-w-2xl sm:mx-4 max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Tag className="w-5 h-5 text-primary" />
                  Frequently Bundled Together
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Save up to 20% when you bundle services
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowBundleRecommendations(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              {/* Selected Service */}
              <div className="bg-muted/50 rounded-lg p-4 border-2 border-primary">
                <div className="flex items-center gap-2 text-sm text-primary font-semibold mb-2">
                  <div className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-xs">
                    ✓
                  </div>
                  Selected Service
                </div>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold">{service.name}</h3>
                    <p className="text-sm text-muted-foreground">{service.duration}</p>
                  </div>
                  <p className="font-bold text-primary">฿{cartItem.price}</p>
                </div>
              </div>

              {/* Bundle Options */}
              <div>
                <h3 className="font-semibold mb-3">Add These Services</h3>
                <div className="space-y-2">
                  {bundleRecommendations.map((bundleService) => {
                    const isSelected = selectedBundleServices.some(s => s.serviceId === bundleService.serviceId);
                    return (
                      <div
                        key={bundleService.serviceId}
                        className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                          isSelected ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                        }`}
                        onClick={() => toggleBundleService(bundleService)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3 flex-1">
                            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                              isSelected ? 'bg-primary border-primary' : 'border-muted-foreground'
                            }`}>
                              {isSelected && (
                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold">{bundleService.serviceName}</h4>
                              <p className="text-xs text-muted-foreground">
                                {bundleService.subcategory} • {bundleService.duration}
                              </p>
                            </div>
                          </div>
                          <p className="font-bold">฿{bundleService.price}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Price Summary */}
              <div className="border-t pt-4">
                {bundleDiscount ? (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Original Total</span>
                      <span className="line-through">฿{bundleDiscount.originalTotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold">Bundle Discount ({bundleDiscount.discount}%)</p>
                        <p className="text-xs text-green-600">
                          You save ฿{bundleDiscount.savings}!
                        </p>
                      </div>
                      <p className="text-2xl font-bold text-primary">
                        ฿{bundleDiscount.discountedTotal.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-sm text-muted-foreground py-2">
                    Select services to see your savings
                  </div>
                )}
              </div>
            </div>

            {/* Footer Actions */}
            <div className="sticky bottom-0 bg-white border-t px-6 py-4 flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  addToCart(cartItem);
                  toast.success(`${service.name} added to cart`);
                  setShowBundleRecommendations(false);
                  setSelectedBundleServices([]);
                }}
              >
                Skip Bundle
              </Button>
              <Button
                className="flex-1"
                disabled={selectedBundleServices.length === 0}
                onClick={handleAddWithBundles}
              >
                {selectedBundleServices.length > 0
                  ? `Add Bundle (Save ฿${bundleDiscount?.savings})`
                  : 'Select Services'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
