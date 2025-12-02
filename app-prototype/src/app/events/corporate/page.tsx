"use client";

import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Briefcase, Calendar, Users, Sparkles, Award, Clock, CheckCircle, ShoppingCart, Plus, Minus } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { ServiceDetail } from "@/lib/constants/categories";

const corporatePackages = [
  {
    name: "Corporate Wellness Day",
    price: 20000,
    duration: 480,
    description: "Complete wellness experience for your team",
    services: [
      "Chair Massage for 20 Employees",
      "Express Manicures (10 people)",
      "Stress Relief Treatments",
      "Healthy Refreshments",
      "Wellness Consultation",
    ],
    popular: true,
  },
  {
    name: "Team Spa Package",
    price: 15000,
    duration: 360,
    description: "Relaxation and bonding for team building",
    services: [
      "Group Spa Treatments (12 people)",
      "Aromatherapy Sessions",
      "Foot Massage Station",
      "Team Photos & Touch-ups",
    ],
    popular: false,
  },
  {
    name: "Executive Grooming",
    price: 25000,
    duration: 420,
    description: "Premium grooming for leadership events",
    services: [
      "Executive Haircuts & Styling (15 people)",
      "Professional Makeup Services",
      "Beard Grooming & Shaping",
      "Manicure & Shoe Shine",
      "Wardrobe Consultation",
      "On-Site Barber & Stylist",
    ],
    popular: true,
  },
];

const individualServices = [
  { name: "Professional Headshot Makeup", price: 2000, duration: 60 },
  { name: "Express Massage (15 min per person)", price: 1200, duration: 15 },
  { name: "Group Manicure (10 people)", price: 8000, duration: 180 },
  { name: "Executive Haircut & Style", price: 1800, duration: 45 },
  { name: "Stress Relief Shoulder Massage", price: 900, duration: 30 },
  { name: "Corporate Event Makeup", price: 2500, duration: 75 },
  { name: "Team Building Beauty Workshop", price: 12000, duration: 240 },
  { name: "On-Site Barber Services (per person)", price: 1500, duration: 40 },
];

export default function CorporatePage() {
  const { addToCart, removeFromCart, getItemQuantity } = useCart();

  const createService = (name: string, price: number, duration: number): ServiceDetail => ({
    name,
    price,
    duration,
    description: `Professional ${name.toLowerCase()} service`,
  });

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50/50 to-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-100 via-gray-100 to-green-100 dark:from-blue-950/20 dark:via-gray-950/20 dark:to-green-950/20">
        <Container className="py-16">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-lg mb-6">
              <Briefcase className="w-10 h-10 text-blue-600" />
            </div>
            <h1 className="text-5xl font-bold mb-4">Corporate Event Services</h1>
            <p className="text-xl text-muted-foreground mb-6">
              Professional wellness and grooming services for team building, product launches, and company events
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Badge className="bg-blue-100 text-blue-800 border-blue-300">Team Building</Badge>
              <Badge className="bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700">Executive Grooming</Badge>
              <Badge className="bg-green-100 text-green-800 border-green-300">Wellness Programs</Badge>
            </div>
          </div>
        </Container>
      </section>

      {/* Corporate Packages */}
      <section>
        <Container className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Corporate Packages</h2>
            <p className="text-muted-foreground">
              Curated packages designed for professional events and team experiences
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {corporatePackages.map((pkg) => {
              const service = createService(pkg.name, pkg.price, pkg.duration);
              const quantity = getItemQuantity(pkg.name);

              return (
                <Card key={pkg.name} className={`relative ${pkg.popular ? 'border-blue-500 border-2 shadow-lg' : ''}`}>
                  {pkg.popular && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white dark:bg-blue-500">
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

                    <div className="text-3xl font-bold text-blue-600">
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
              Build your own custom corporate event package
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
                    <div className="text-xl font-bold text-blue-600">
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
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center mx-auto mb-4">
                <Award className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Certified Professionals</h3>
              <p className="text-sm text-muted-foreground">
                Experienced in corporate and executive services
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-900/20 flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              </div>
              <h3 className="font-semibold mb-2">Flexible Timing</h3>
              <p className="text-sm text-muted-foreground">
                Schedule during or after work hours
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Volume Discounts</h3>
              <p className="text-sm text-muted-foreground">
                Special pricing for large teams and recurring bookings
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">On-Site Service</h3>
              <p className="text-sm text-muted-foreground">
                We come to your office or event venue
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-blue-600 via-gray-700 to-green-600 text-white dark:from-blue-700 dark:via-gray-800 dark:to-green-700">
        <Container className="py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Elevate Your Corporate Event?</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Add services to your cart or contact us for a customized corporate package with volume pricing
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
