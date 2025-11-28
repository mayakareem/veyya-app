"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Container from "@/components/layout/Container";
import { getCategoryById, getServiceById } from "@/lib/constants/services";
import { getServiceImage } from "@/lib/utils/serviceImages";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Star, Calendar, Plus, Minus, ChevronLeft, Shield, Award, ThumbsUp } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

export default function ServiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const serviceId = decodeURIComponent(resolvedParams.id);

  const { addToCart, removeFromCart, getItemQuantity } = useCart();
  const [selectedDate, setSelectedDate] = useState<string>("");

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

  // Mock available time slots
  const getAvailableSlots = () => {
    const slots = [];
    const today = new Date();

    for (let i = 1; i <= 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      slots.push({
        date: date.toISOString().split('T')[0],
        displayDate: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
        times: ["9:00 AM", "10:30 AM", "12:00 PM", "2:00 PM", "4:30 PM", "6:00 PM"],
      });
    }

    return slots;
  };

  const availableSlots = getAvailableSlots();

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

              {/* Date Selection */}
              <div className="mb-4">
                <label className="text-sm font-medium mb-2 block">Select Date & Time</label>
                <div className="space-y-2">
                  {availableSlots.slice(0, 3).map((slot) => (
                    <div key={slot.date}>
                      <p className="text-xs font-medium text-muted-foreground mb-1">
                        {slot.displayDate}
                      </p>
                      <div className="grid grid-cols-3 gap-1">
                        {slot.times.map((time) => (
                          <Button
                            key={time}
                            variant="outline"
                            size="sm"
                            className={`text-xs h-8 ${
                              selectedDate === `${slot.date}-${time}` ? "bg-primary text-primary-foreground" : ""
                            }`}
                            onClick={() => setSelectedDate(`${slot.date}-${time}`)}
                          >
                            {time}
                          </Button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="link" className="text-xs mt-2 p-0 h-auto">
                  View more dates
                </Button>
              </div>

              {/* Quantity */}
              <div className="mb-4 pb-4 border-b">
                <label className="text-sm font-medium mb-2 block">Quantity</label>
                {quantity === 0 ? (
                  <Button
                    onClick={() => {
                      addToCart(cartItem);
                      toast.success(`${service.name} added to cart`);
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
                  <Calendar className="w-4 h-4 text-purple-600" />
                  <span>Flexible rescheduling</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
