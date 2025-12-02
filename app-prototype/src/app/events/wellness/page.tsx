"use client";

import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Heart, Calendar, Users, Sparkles, Leaf, Clock, CheckCircle, ShoppingCart, Plus, Minus } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { ServiceDetail } from "@/lib/constants/categories";

const wellnessPackages = [
  {
    name: "Full Day Wellness Retreat",
    price: 18000,
    duration: 480,
    description: "Complete mind-body rejuvenation experience",
    services: [
      "90-Minute Thai Massage",
      "Aromatherapy Facial Treatment",
      "Hot Stone Therapy",
      "Healthy Lunch & Refreshments",
      "Guided Meditation Session",
      "Herbal Tea & Consultation",
    ],
    popular: true,
  },
  {
    name: "Weekend Detox Package",
    price: 35000,
    duration: 960,
    description: "Two-day intensive wellness and detox program",
    services: [
      "Detox Body Wrap (2 sessions)",
      "Deep Tissue Massage (2 sessions)",
      "Facial & Scalp Treatment",
      "Yoga & Meditation Classes",
      "Organic Meals Included",
      "Take-Home Wellness Kit",
    ],
    popular: true,
  },
  {
    name: "Mindfulness & Spa Day",
    price: 15000,
    duration: 360,
    description: "Balance mind and body with spa and mindfulness",
    services: [
      "60-Minute Swedish Massage",
      "Aromatherapy Session",
      "Yoga & Breathing Exercise",
      "Foot Reflexology",
      "Herbal Steam & Sauna",
    ],
    popular: false,
  },
];

const individualServices = [
  { name: "Hot Stone Massage", price: 2500, duration: 90 },
  { name: "Aromatherapy Session", price: 2000, duration: 75 },
  { name: "Yoga & Meditation", price: 1500, duration: 90 },
  { name: "Detox Body Wrap", price: 3000, duration: 120 },
  { name: "Thai Traditional Massage", price: 1800, duration: 90 },
  { name: "Foot Reflexology", price: 1200, duration: 60 },
  { name: "Herbal Steam & Sauna", price: 800, duration: 45 },
  { name: "Sound Healing Therapy", price: 2200, duration: 60 },
];

export default function WellnessPage() {
  const { addToCart, removeFromCart, getItemQuantity } = useCart();

  const createService = (name: string, price: number, duration: number): ServiceDetail => ({
    name,
    price,
    duration,
    description: `Professional ${name.toLowerCase()} service`,
  });

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50/50 to-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-100 via-blue-100 to-teal-100 dark:from-green-950/20 dark:via-blue-950/20 dark:to-teal-950/20">
        <Container className="py-16">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-lg mb-6">
              <Leaf className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-5xl font-bold mb-4">Wellness Retreats</h1>
            <p className="text-xl text-muted-foreground mb-6">
              Restore balance and rejuvenate with our holistic wellness programs, spa days, and mindfulness retreats
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Badge className="bg-green-100 text-green-800 border-green-300">Spa & Massage</Badge>
              <Badge className="bg-blue-100 text-blue-800 border-blue-300">Mindfulness</Badge>
              <Badge className="bg-teal-100 text-teal-800 border-teal-300">Detox Programs</Badge>
            </div>
          </div>
        </Container>
      </section>

      {/* Wellness Packages */}
      <section>
        <Container className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Wellness Packages</h2>
            <p className="text-muted-foreground">
              Curated packages for complete mind-body wellness
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {wellnessPackages.map((pkg) => {
              const service = createService(pkg.name, pkg.price, pkg.duration);
              const quantity = getItemQuantity(pkg.name);

              return (
                <Card key={pkg.name} className={`relative ${pkg.popular ? 'border-green-500 border-2 shadow-lg' : ''}`}>
                  {pkg.popular && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-600 text-white dark:bg-green-500">
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

                    <div className="text-3xl font-bold text-green-600">
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
              Build your own custom wellness package
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
                    <div className="text-xl font-bold text-green-600">
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
              <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Holistic Approach</h3>
              <p className="text-sm text-muted-foreground">
                Treatments that address mind, body, and spirit
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Certified Therapists</h3>
              <p className="text-sm text-muted-foreground">
                Trained in traditional and modern wellness practices
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-teal-100 dark:bg-teal-900/20 flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="font-semibold mb-2">Group Retreats</h3>
              <p className="text-sm text-muted-foreground">
                Special packages for couples and small groups
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="font-semibold mb-2">Organic Products</h3>
              <p className="text-sm text-muted-foreground">
                Natural, sustainably sourced oils and treatments
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-green-600 via-blue-600 to-teal-600 text-white dark:from-green-700 dark:via-blue-700 dark:to-teal-700">
        <Container className="py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Begin Your Wellness Journey?</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Add services to your cart or contact us for a personalized wellness retreat package
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
