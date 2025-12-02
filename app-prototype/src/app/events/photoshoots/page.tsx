"use client";

import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Camera, Calendar, Users, Sparkles, Palette, Clock, CheckCircle, ShoppingCart, Plus, Minus } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { ServiceDetail } from "@/lib/constants/categories";

const photoshootPackages = [
  {
    name: "Fashion Editorial Package",
    price: 10000,
    duration: 300,
    description: "High-fashion looks for editorial and portfolio shoots",
    services: [
      "Editorial Makeup with Contouring",
      "Avant-Garde Hair Styling",
      "Body Makeup & Shimmer",
      "Multiple Look Changes (3)",
      "Touch-up Services Throughout",
    ],
    popular: true,
  },
  {
    name: "Maternity Glow Package",
    price: 7500,
    duration: 240,
    description: "Natural, radiant looks for expecting mothers",
    services: [
      "Natural Glowing Makeup",
      "Soft Hair Styling",
      "Belly Painting (Optional)",
      "Pregnancy-Safe Products",
      "Comfort-First Approach",
    ],
    popular: false,
  },
  {
    name: "Family Photoshoot",
    price: 12000,
    duration: 360,
    description: "Coordinated looks for the whole family",
    services: [
      "Makeup for 2 Adults",
      "Hair Styling for 2 Adults",
      "Kids Hair & Light Touch-ups (3 kids)",
      "Wardrobe Coordination Advice",
      "All-Day Touch-up Service",
      "Travel to Location Included",
    ],
    popular: true,
  },
];

const individualServices = [
  { name: "Editorial Makeup", price: 3500, duration: 120 },
  { name: "Hair Styling for Shoots", price: 2500, duration: 90 },
  { name: "Body Contouring Makeup", price: 2000, duration: 60 },
  { name: "Creative Hair Design", price: 3000, duration: 120 },
  { name: "Airbrush Makeup for HD", price: 4000, duration: 90 },
  { name: "Natural Makeup Look", price: 2200, duration: 75 },
  { name: "Belly Painting (Maternity)", price: 2500, duration: 90 },
  { name: "Touch-up Services (per hour)", price: 1200, duration: 60 },
];

export default function PhotoshootsPage() {
  const { addToCart, removeFromCart, getItemQuantity } = useCart();

  const createService = (name: string, price: number, duration: number): ServiceDetail => ({
    name,
    price,
    duration,
    description: `Professional ${name.toLowerCase()} service`,
  });

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50/50 to-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-100 via-teal-100 to-pink-100 dark:from-purple-950/20 dark:via-teal-950/20 dark:to-pink-950/20">
        <Container className="py-16">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-lg mb-6">
              <Camera className="w-10 h-10 text-purple-600" />
            </div>
            <h1 className="text-5xl font-bold mb-4">Photoshoot Services</h1>
            <p className="text-xl text-muted-foreground mb-6">
              Camera-ready makeup and styling for fashion, maternity, family, and portfolio photoshoots
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Badge className="bg-purple-100 text-purple-800 border-purple-300">Fashion Editorial</Badge>
              <Badge className="bg-teal-100 text-teal-800 border-teal-300">Maternity Shoots</Badge>
              <Badge className="bg-pink-100 text-pink-800 border-pink-300">Family Photos</Badge>
            </div>
          </div>
        </Container>
      </section>

      {/* Photoshoot Packages */}
      <section>
        <Container className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Photoshoot Packages</h2>
            <p className="text-muted-foreground">
              Curated packages for every type of photoshoot
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {photoshootPackages.map((pkg) => {
              const service = createService(pkg.name, pkg.price, pkg.duration);
              const quantity = getItemQuantity(pkg.name);

              return (
                <Card key={pkg.name} className={`relative ${pkg.popular ? 'border-purple-500 border-2 shadow-lg' : ''}`}>
                  {pkg.popular && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-600 text-white dark:bg-purple-500">
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

                    <div className="text-3xl font-bold text-purple-600">
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
              Build your own custom photoshoot beauty package
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
                    <div className="text-xl font-bold text-purple-600">
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
              <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center mx-auto mb-4">
                <Palette className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Camera-Ready</h3>
              <p className="text-sm text-muted-foreground">
                Specialized techniques for HD and high-resolution photography
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-teal-100 dark:bg-teal-900/20 flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="font-semibold mb-2">Flexible Locations</h3>
              <p className="text-sm text-muted-foreground">
                On-location services at your studio or outdoor venue
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-pink-100 dark:bg-pink-900/20 flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-pink-600" />
              </div>
              <h3 className="font-semibold mb-2">Photographer Trusted</h3>
              <p className="text-sm text-muted-foreground">
                Recommended by top photographers in Bangkok
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/20 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="font-semibold mb-2">Multiple Looks</h3>
              <p className="text-sm text-muted-foreground">
                Quick transitions and touch-ups for wardrobe changes
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-purple-600 via-teal-600 to-pink-600 text-white">
        <Container className="py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Look Your Best on Camera?</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Add services to your cart or contact us for a personalized photoshoot package
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
