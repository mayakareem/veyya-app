"use client";

import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Heart, Calendar, Users, Sparkles, Crown, Clock, CheckCircle, ShoppingCart, Plus, Minus } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { ServiceDetail } from "@/lib/constants/categories";
import DateTimeSelector from "@/components/booking/DateTimeSelector";
import { useState } from "react";

const weddingPackages = [
  {
    name: "Bride Essential Package",
    price: 8500,
    duration: 240,
    description: "Complete beauty transformation for the bride",
    services: [
      "Bridal Makeup (Airbrush)",
      "Hair Styling & Extensions",
      "Manicure & Pedicure",
      "Pre-Wedding Facial Treatment",
    ],
    popular: true,
  },
  {
    name: "Bridal Party Package",
    price: 15000,
    duration: 360,
    description: "Beauty services for bride + 4 bridesmaids",
    services: [
      "Bridal Makeup & Hair",
      "4 Bridesmaid Makeup & Hair",
      "Group Manicure Session",
      "Complimentary Touch-up Kit",
    ],
    popular: false,
  },
  {
    name: "Full Wedding Glam",
    price: 25000,
    duration: 480,
    description: "Ultimate wedding day beauty experience",
    services: [
      "Bride Makeup, Hair & Accessories",
      "6 Bridesmaid Services",
      "Mother of Bride/Groom Makeup",
      "Pre-Wedding Spa Day",
      "On-Location Touch-ups",
    ],
    popular: true,
  },
];

const individualServices = [
  { name: "Bridal Makeup (Traditional)", price: 3500, duration: 90 },
  { name: "Bridal Makeup (Airbrush)", price: 4500, duration: 120 },
  { name: "Bridal Hair Styling", price: 2500, duration: 90 },
  { name: "Hair & Makeup Combo", price: 5500, duration: 150 },
  { name: "Bridesmaid Makeup", price: 2000, duration: 60 },
  { name: "Pre-Wedding Facial & Glow Treatment", price: 2800, duration: 90 },
  { name: "Bridal Manicure & Pedicure", price: 1500, duration: 90 },
  { name: "Henna (Mehndi) Application", price: 3000, duration: 180 },
];

export default function WeddingsPage() {
  const { addToCart, removeFromCart, getItemQuantity } = useCart();
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);

  const createService = (name: string, price: number, duration: number): ServiceDetail => ({
    name,
    price,
    duration,
    description: `Professional ${name.toLowerCase()} service`,
  });

  const handleAddToCart = (service: ServiceDetail) => {
    setSelectedService(service);
    setShowDateTimePicker(true);
  };

  const handleConfirmBooking = (date: string, time: string) => {
    if (selectedService) {
      addToCart(selectedService, date, time);
      setShowDateTimePicker(false);
      setSelectedService(null);
    }
  };

  const handleCancelBooking = () => {
    setShowDateTimePicker(false);
    setSelectedService(null);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50/50 to-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-950/20 dark:to-purple-950/20">
        <Container className="py-16">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-lg mb-6">
              <Heart className="w-10 h-10 text-pink-600" />
            </div>
            <h1 className="text-5xl font-bold mb-4">Wedding Services</h1>
            <p className="text-xl text-muted-foreground mb-6">
              Make your special day unforgettable with our professional wedding beauty and wellness services
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Badge className="bg-pink-100 text-pink-800 border-pink-300">Certified Professionals</Badge>
              <Badge className="bg-purple-100 text-purple-800 border-purple-300">On-Location Services</Badge>
              <Badge className="bg-blue-100 text-blue-800 border-blue-300">Custom Packages</Badge>
            </div>
          </div>
        </Container>
      </section>

      {/* Wedding Packages */}
      <section>
        <Container className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Wedding Packages</h2>
            <p className="text-muted-foreground">
              Curated packages designed for your perfect wedding day
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {weddingPackages.map((pkg) => {
              const service = createService(pkg.name, pkg.price, pkg.duration);
              const quantity = getItemQuantity(pkg.name);

              return (
                <Card key={pkg.name} className={`relative ${pkg.popular ? 'border-pink-500 border-2 shadow-lg' : ''}`}>
                  {pkg.popular && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-pink-600 text-white dark:bg-pink-500">
                      Most Popular
                    </Badge>
                  )}
                  <CardHeader>
                    <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                    <CardDescription>{pkg.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      {pkg.services.map((service, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>{service}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground pt-4 border-t">
                      <Clock className="w-4 h-4" />
                      <span>{pkg.duration} minutes</span>
                    </div>

                    <div className="text-3xl font-bold text-pink-600">
                      ฿{pkg.price.toLocaleString()}
                    </div>

                    {quantity > 0 ? (
                      <div className="flex items-center gap-3">
                        <Button variant="outline" size="icon" onClick={() => removeFromCart(pkg.name)}>
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="font-semibold min-w-[2rem] text-center">{quantity}</span>
                        <Button variant="outline" size="icon" onClick={() => handleAddToCart(service)}>
                          <Plus className="h-4 w-4" />
                        </Button>
                        <Badge className="ml-auto bg-green-100 text-green-800">In Cart</Badge>
                      </div>
                    ) : (
                      <Button className="w-full gap-2" onClick={() => handleAddToCart(service)}>
                        <Calendar className="h-4 w-4" />
                        Select Date & Time
                      </Button>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Individual Services */}
      <section className="bg-muted/30">
        <Container className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">À La Carte Services</h2>
            <p className="text-muted-foreground">
              Build your own custom wedding beauty package
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
            {individualServices.map((service) => {
              const serviceDetail = createService(service.name, service.price, service.duration);
              const quantity = getItemQuantity(service.name);

              return (
                <Card key={service.name} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">{service.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{service.duration} min</span>
                    </div>
                    <div className="text-xl font-bold text-pink-600">
                      ฿{service.price.toLocaleString()}
                    </div>

                    {quantity > 0 ? (
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={() => removeFromCart(service.name)}>
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="font-semibold text-sm min-w-[1.5rem] text-center">{quantity}</span>
                        <Button variant="outline" size="sm" onClick={() => handleAddToCart(serviceDetail)}>
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    ) : (
                      <Button size="sm" className="w-full" onClick={() => handleAddToCart(serviceDetail)}>
                        <Calendar className="h-3 w-3 mr-1" />
                        Book
                      </Button>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Why Choose Us */}
      <section>
        <Container className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Why Book with Veyya?</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-pink-100 dark:bg-pink-900/20 flex items-center justify-center mx-auto mb-4">
                <Crown className="w-6 h-6 text-pink-600" />
              </div>
              <h3 className="font-semibold mb-2">Certified Experts</h3>
              <p className="text-sm text-muted-foreground">
                All professionals are verified and trained in bridal beauty
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Trial Sessions</h3>
              <p className="text-sm text-muted-foreground">
                Book a pre-wedding trial to perfect your look
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Group Bookings</h3>
              <p className="text-sm text-muted-foreground">
                Special rates for bridal parties of 5+ people
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">On-Location</h3>
              <p className="text-sm text-muted-foreground">
                We come to your venue with all equipment
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-pink-600 to-purple-600 text-white">
        <Container className="py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Plan Your Dream Wedding?</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Add services to your cart or contact us for a personalized wedding beauty package
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/cart">
              <Button size="lg" variant="secondary" className="gap-2">
                <ShoppingCart className="w-5 h-5" />
                View Cart & Checkout
              </Button>
            </Link>
            <Link href="/search">
              <Button size="lg" variant="outline" className="bg-transparent hover:bg-white/10 text-white border-white">
                Find Providers
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* Date/Time Selector Modal */}
      {showDateTimePicker && selectedService && (
        <DateTimeSelector
          service={selectedService}
          onConfirm={handleConfirmBooking}
          onCancel={handleCancelBooking}
        />
      )}
    </main>
  );
}
