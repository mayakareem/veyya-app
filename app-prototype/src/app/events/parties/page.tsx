"use client";

import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { PartyPopper, Calendar, Users, Sparkles, Gift, Clock, CheckCircle, ShoppingCart, Plus, Minus } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { ServiceDetail } from "@/lib/constants/categories";

const partyPackages = [
  {
    name: "Kids Party Package",
    price: 5000,
    duration: 180,
    description: "Fun and colorful beauty services for children's parties",
    services: [
      "Face Painting for 10 Kids",
      "Hair Braiding & Glitter",
      "Nail Art Station",
      "Party Favors & Stickers",
    ],
    popular: false,
  },
  {
    name: "Teen Party Glam",
    price: 8000,
    duration: 240,
    description: "Age-appropriate glam for teenage celebrations",
    services: [
      "Makeup for 8 Teens",
      "Trendy Hair Styling",
      "Manicure Party Session",
      "Photo Booth Ready Looks",
      "Take-Home Beauty Kits",
    ],
    popular: true,
  },
  {
    name: "Adult Celebration Package",
    price: 12000,
    duration: 300,
    description: "Sophisticated beauty services for milestone celebrations",
    services: [
      "Makeup for 6 Guests",
      "Professional Hair Styling",
      "Group Manicure & Pedicure",
      "Champagne & Treats",
      "Touch-up Services",
    ],
    popular: true,
  },
];

const individualServices = [
  { name: "Party Makeup", price: 1500, duration: 45 },
  { name: "Group Hair Styling (5 people)", price: 2500, duration: 120 },
  { name: "Nail Art Party (10 people)", price: 3000, duration: 150 },
  { name: "Face Painting Station (2 hours)", price: 2000, duration: 120 },
  { name: "Glitter & Glam Add-on", price: 800, duration: 30 },
  { name: "Birthday Girl/Boy Special Glam", price: 2200, duration: 90 },
  { name: "Temporary Tattoo Station", price: 1200, duration: 60 },
  { name: "Party Host Makeup & Hair", price: 3500, duration: 120 },
];

export default function PartiesPage() {
  const { addToCart, removeFromCart, getItemQuantity } = useCart();

  const createService = (name: string, price: number, duration: number): ServiceDetail => ({
    name,
    price,
    duration,
    description: `Professional ${name.toLowerCase()} service`,
  });

  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-50/50 to-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-100 via-yellow-100 to-pink-100 dark:from-orange-950/20 dark:via-yellow-950/20 dark:to-pink-950/20">
        <Container className="py-16">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-lg mb-6">
              <PartyPopper className="w-10 h-10 text-orange-600" />
            </div>
            <h1 className="text-5xl font-bold mb-4">Party Planning Services</h1>
            <p className="text-xl text-muted-foreground mb-6">
              Celebrate in style with our professional beauty and glam services for all types of parties
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Badge className="bg-orange-100 text-orange-800 border-orange-300">Kids & Teens</Badge>
              <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">Adult Celebrations</Badge>
              <Badge className="bg-pink-100 text-pink-800 border-pink-300">Group Packages</Badge>
            </div>
          </div>
        </Container>
      </section>

      {/* Party Packages */}
      <section>
        <Container className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Party Packages</h2>
            <p className="text-muted-foreground">
              Curated packages for birthdays, graduations, and celebrations
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {partyPackages.map((pkg) => {
              const service = createService(pkg.name, pkg.price, pkg.duration);
              const quantity = getItemQuantity(pkg.name);

              return (
                <Card key={pkg.name} className={`relative ${pkg.popular ? 'border-orange-500 border-2 shadow-lg' : ''}`}>
                  {pkg.popular && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-600 text-white">
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

                    <div className="text-3xl font-bold text-orange-600">
                      ฿{pkg.price.toLocaleString()}
                    </div>

                    {quantity > 0 ? (
                      <div className="flex items-center gap-3">
                        <Button variant="outline" size="icon" onClick={() => removeFromCart(pkg.name)}>
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="font-semibold min-w-[2rem] text-center">{quantity}</span>
                        <Button variant="outline" size="icon" onClick={() => addToCart(service)}>
                          <Plus className="h-4 w-4" />
                        </Button>
                        <Badge className="ml-auto bg-green-100 text-green-800">In Cart</Badge>
                      </div>
                    ) : (
                      <Button className="w-full gap-2" onClick={() => addToCart(service)}>
                        <ShoppingCart className="h-4 w-4" />
                        Add to Cart
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
              Build your own custom party beauty package
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
                    <div className="text-xl font-bold text-orange-600">
                      ฿{service.price.toLocaleString()}
                    </div>

                    {quantity > 0 ? (
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={() => removeFromCart(service.name)}>
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="font-semibold text-sm min-w-[1.5rem] text-center">{quantity}</span>
                        <Button variant="outline" size="sm" onClick={() => addToCart(serviceDetail)}>
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    ) : (
                      <Button size="sm" className="w-full" onClick={() => addToCart(serviceDetail)}>
                        <Plus className="h-3 w-3 mr-1" />
                        Add
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
              <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center mx-auto mb-4">
                <Gift className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-semibold mb-2">Age-Appropriate</h3>
              <p className="text-sm text-muted-foreground">
                Safe, fun services tailored to each age group
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-900/20 flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="font-semibold mb-2">Flexible Scheduling</h3>
              <p className="text-sm text-muted-foreground">
                Book any day, any time that works for your party
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-pink-100 dark:bg-pink-900/20 flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-pink-600" />
              </div>
              <h3 className="font-semibold mb-2">Group Discounts</h3>
              <p className="text-sm text-muted-foreground">
                Special rates for parties of 10+ guests
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">All Inclusive</h3>
              <p className="text-sm text-muted-foreground">
                We bring all supplies, products, and equipment
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-orange-600 via-yellow-600 to-pink-600 text-white">
        <Container className="py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Celebrate in Style?</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Add services to your cart or contact us for a personalized party package
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
    </main>
  );
}
