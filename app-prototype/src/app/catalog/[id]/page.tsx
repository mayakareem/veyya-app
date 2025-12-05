"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { MultiStepBooking, type BookingData } from "@/components/booking/MultiStepBooking";
import { getServiceById } from "@/lib/constants/services";
import { getHealthcareServiceDetail } from "@/lib/constants/healthcareDetails";
import { getPetCareServiceDetail } from "@/lib/constants/petCareDetails";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Clock,
  Calendar,
  CheckCircle,
  FileText,
  Heart,
  Activity,
  Shield,
  ClipboardList
} from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

export default function ServiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const serviceId = decodeURIComponent(resolvedParams.id);
  const [showBooking, setShowBooking] = useState(false);
  const [dogSize, setDogSize] = useState<"small" | "medium" | "large">("small");
  const [catHairType, setCatHairType] = useState<"short" | "long">("short");

  // Get service details
  const serviceData = getServiceById(serviceId);
  const healthcareDetail = getHealthcareServiceDetail(serviceId);
  const petCareDetail = getPetCareServiceDetail(serviceId);

  // Check if this is a grooming service that needs size/hair selection
  const isDogGrooming = serviceId.includes("grooming-dog") || serviceId.includes("bath-blow-dry-dog");
  const isCatGrooming = serviceId.includes("grooming-cat") || serviceId.includes("bath-blow-dry-cat");
  const needsSizeSelection = isDogGrooming && (
    serviceId === "basic-grooming-dog" ||
    serviceId === "full-grooming-dog" ||
    serviceId === "bath-blow-dry-dog"
  );
  const needsHairSelection = isCatGrooming && (
    serviceId === "basic-grooming-cat" ||
    serviceId === "full-grooming-cat" ||
    serviceId === "bath-blow-dry-cat"
  );

  // Calculate dynamic price based on size/hair type
  const getAdjustedPrice = () => {
    if (!petCareDetail) return 0;
    const basePrice = petCareDetail.price;

    if (needsSizeSelection) {
      // Dog size multipliers
      const sizeMultipliers = { small: 1, medium: 1.5, large: 2 };
      return Math.round(basePrice * sizeMultipliers[dogSize]);
    }

    if (needsHairSelection) {
      // Cat hair type multipliers
      const hairMultipliers = { short: 1, long: 1.6 };
      return Math.round(basePrice * hairMultipliers[catHairType]);
    }

    return basePrice;
  };

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
  const isHealthcare = category.id === "healthcare";
  const isPetCare = category.id === "pet-care";

  // Parse price (take first value from range)
  const priceMatch = service.priceRange?.match(/฿([\d,]+)/);
  const basePrice = priceMatch ? parseInt(priceMatch[1].replace(/,/g, "")) * 100 : 0;

  // Parse duration
  const durationMatch = service.duration?.match(/(\d+)/);
  const baseDuration = durationMatch ? parseInt(durationMatch[1]) : 60;

  const handleBookingComplete = (bookingData: BookingData) => {
    // In production, this would make an API call to create the booking
    console.log("Booking data:", bookingData);

    // Show success message
    toast.success("Booking confirmed!", {
      description: `Your ${service.name} is scheduled for ${bookingData.date.toLocaleDateString()} at ${bookingData.time}`,
    });

    // Redirect to confirmation page
    setTimeout(() => {
      router.push("/confirmation");
    }, 2000);
  };

  // If booking mode is active, show booking flow
  if (showBooking) {
    return (
      <main className="min-h-screen bg-muted/30 py-6">
        <Container>
          <Button
            variant="ghost"
            onClick={() => setShowBooking(false)}
            className="mb-4 gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Details
          </Button>

          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold mb-2">{service.name}</h1>
            <p className="text-muted-foreground">
              {category.name} • {subcategory.name}
            </p>
          </div>

          <MultiStepBooking
            serviceName={service.name}
            basePrice={basePrice}
            baseDuration={baseDuration}
            onComplete={handleBookingComplete}
          />
        </Container>
      </main>
    );
  }

  // Default view: Show detailed information (especially for healthcare)
  return (
    <main className="min-h-screen bg-muted/30 py-6">
      <Container>
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-4 gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>

        {/* Service Header with Image (Healthcare) */}
        {isHealthcare && healthcareDetail ? (
          <>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Service Image */}
              <div className="relative h-64 md:h-96 rounded-xl overflow-hidden bg-gradient-to-br from-blue-100 to-green-100">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Activity className="w-32 h-32 text-blue-600 opacity-20" />
                </div>
                {healthcareDetail.image && (
                  <Image
                    src={healthcareDetail.image}
                    alt={healthcareDetail.name}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      // Hide image on error, show gradient instead
                      e.currentTarget.style.display = "none";
                    }}
                  />
                )}
              </div>

              {/* Service Summary */}
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <span>{category.name}</span>
                    <span>•</span>
                    <span>{subcategory.name}</span>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-3">{healthcareDetail.name}</h1>
                  <p className="text-lg text-muted-foreground">{healthcareDetail.shortDescription}</p>
                </div>

                <div className="flex flex-wrap gap-4 py-4 border-y">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    <div>
                      <div className="text-sm text-muted-foreground">Duration</div>
                      <div className="font-semibold">{healthcareDetail.duration} min</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    <div>
                      <div className="text-sm text-muted-foreground">Price</div>
                      <div className="font-semibold text-lg">฿{(healthcareDetail.price / 100).toFixed(2)}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    <div>
                      <div className="text-sm text-muted-foreground">Results</div>
                      <div className="font-semibold text-sm">{healthcareDetail.resultsTime.split(' ').slice(0, 3).join(' ')}</div>
                    </div>
                  </div>
                </div>

                {/* Partner Badge */}
                <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <Shield className="w-6 h-6 text-blue-600" />
                  <div>
                    <div className="font-semibold text-blue-900">Patrangsit Hospital</div>
                    <div className="text-sm text-blue-700">Certified Medical Partner</div>
                  </div>
                </div>

                {/* Book Now Button */}
                <Button
                  size="lg"
                  className="w-full"
                  onClick={() => setShowBooking(true)}
                >
                  Book Appointment Now
                </Button>
              </div>
            </div>

            {/* Detailed Information Tabs */}
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 lg:grid-cols-7">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="procedure">Procedure</TabsTrigger>
                <TabsTrigger value="benefits">Benefits</TabsTrigger>
                <TabsTrigger value="preparation">Preparation</TabsTrigger>
                <TabsTrigger value="frequency">Frequency</TabsTrigger>
                {healthcareDetail.parametersTested && (
                  <TabsTrigger value="parameters">Parameters</TabsTrigger>
                )}
                <TabsTrigger value="results">Results</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-primary" />
                      About This Service
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      {healthcareDetail.fullDescription}
                    </p>

                    <div>
                      <h4 className="font-semibold mb-3">What is Done:</h4>
                      <ul className="space-y-2">
                        {healthcareDetail.whatIsDone.map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-muted-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Procedure Tab */}
              <TabsContent value="procedure" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ClipboardList className="w-5 h-5 text-primary" />
                      How It Works
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-0">
                      {healthcareDetail.procedure.map((step, index) => (
                        <div key={index} className="flex gap-4">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
                            {index + 1}
                          </div>
                          <div className="flex-1 pt-1">
                            <p className="text-muted-foreground">{step}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Benefits Tab */}
              <TabsContent value="benefits" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Heart className="w-5 h-5 text-primary" />
                      Health Benefits
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {healthcareDetail.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Preparation Tab */}
              <TabsContent value="preparation" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ClipboardList className="w-5 h-5 text-primary" />
                      How to Prepare
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {healthcareDetail.preparation.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Frequency Tab */}
              <TabsContent value="frequency" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-primary" />
                      Recommended Frequency
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{healthcareDetail.frequency}</p>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Parameters Tab (for lab tests) */}
              {healthcareDetail.parametersTested && (
                <TabsContent value="parameters" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Activity className="w-5 h-5 text-primary" />
                        Parameters Tested
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {healthcareDetail.parametersTested.map((parameter, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg"
                          >
                            <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                            <span className="text-sm">{parameter}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              )}

              {/* Results Tab */}
              <TabsContent value="results" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-primary" />
                      Results Timeline
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{healthcareDetail.resultsTime}</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Bottom CTA */}
            <Card className="mt-8 bg-gradient-to-r from-primary/10 to-blue-50 border-primary/20">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-2">Ready to Book?</h3>
                <p className="text-muted-foreground mb-4">
                  Professional healthcare service at your doorstep by Patrangsit Hospital
                </p>
                <Button size="lg" onClick={() => setShowBooking(true)}>
                  Book Appointment Now
                </Button>
              </CardContent>
            </Card>
          </>
        ) : isPetCare && petCareDetail ? (
          // Pet Care services: show detailed information
          <>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Service Image */}
              <div className="relative h-64 md:h-96 rounded-xl overflow-hidden bg-gradient-to-br from-orange-100 to-purple-100">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Heart className="w-32 h-32 text-orange-600 opacity-20" />
                </div>
                {petCareDetail.image && (
                  <Image
                    src={petCareDetail.image}
                    alt={petCareDetail.name}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                )}
              </div>

              {/* Service Summary */}
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <span>{category.name}</span>
                    <span>•</span>
                    <span>{subcategory.name}</span>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-3">{petCareDetail.name}</h1>
                  <p className="text-lg text-muted-foreground">{petCareDetail.shortDescription}</p>
                </div>

                {/* Size/Hair Selection for Grooming Services */}
                {needsSizeSelection && (
                  <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                    <h3 className="font-semibold text-sm">Select Dog Size</h3>
                    <div className="grid grid-cols-3 gap-2">
                      <Button
                        variant={dogSize === "small" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setDogSize("small")}
                        className="w-full"
                      >
                        Small
                      </Button>
                      <Button
                        variant={dogSize === "medium" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setDogSize("medium")}
                        className="w-full"
                      >
                        Medium
                      </Button>
                      <Button
                        variant={dogSize === "large" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setDogSize("large")}
                        className="w-full"
                      >
                        Large
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Small: &lt;10kg • Medium: 10-25kg • Large: &gt;25kg
                    </p>
                  </div>
                )}

                {needsHairSelection && (
                  <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                    <h3 className="font-semibold text-sm">Select Hair Type</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant={catHairType === "short" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCatHairType("short")}
                        className="w-full"
                      >
                        Short Hair
                      </Button>
                      <Button
                        variant={catHairType === "long" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCatHairType("long")}
                        className="w-full"
                      >
                        Long Hair
                      </Button>
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-4 py-4 border-y">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    <div>
                      <div className="text-sm text-muted-foreground">Duration</div>
                      <div className="font-semibold">{petCareDetail.duration} min</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    <div>
                      <div className="text-sm text-muted-foreground">Price</div>
                      <div className="font-semibold text-lg">฿{(getAdjustedPrice() / 100).toFixed(2)}</div>
                    </div>
                  </div>
                </div>

                <Button
                  size="lg"
                  className="w-full"
                  onClick={() => setShowBooking(true)}
                >
                  Book Service Now
                </Button>
              </div>
            </div>

            {/* Detailed Information Tabs */}
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="steps">Steps</TabsTrigger>
                <TabsTrigger value="products">Products</TabsTrigger>
                <TabsTrigger value="benefits">Benefits</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-primary" />
                      About This Service
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      {petCareDetail.fullDescription}
                    </p>

                    <div>
                      <h4 className="font-semibold mb-3">What's Included:</h4>
                      <ul className="space-y-2">
                        {petCareDetail.whatIsIncluded.map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-muted-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-900 mb-2">Suitable For:</h4>
                      <ul className="space-y-1">
                        {petCareDetail.suitableFor.map((item, index) => (
                          <li key={index} className="text-sm text-blue-700">• {item}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-semibold text-green-900 mb-2">Recommended Frequency:</h4>
                      <p className="text-sm text-green-700">{petCareDetail.frequency}</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Steps Tab */}
              <TabsContent value="steps" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ClipboardList className="w-5 h-5 text-primary" />
                      Service Steps
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-0">
                      {petCareDetail.steps.map((step, index) => (
                        <div key={index} className="flex gap-4">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
                            {index + 1}
                          </div>
                          <div className="flex-1 pt-1">
                            <p className="text-muted-foreground">{step}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Products Tab */}
              <TabsContent value="products" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="w-5 h-5 text-primary" />
                      Products Used
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {petCareDetail.productsUsed.map((product, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{product}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Benefits Tab */}
              <TabsContent value="benefits" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Heart className="w-5 h-5 text-primary" />
                      Benefits
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {petCareDetail.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Bottom CTA */}
            <Card className="mt-8 bg-gradient-to-r from-primary/10 to-purple-50 border-primary/20">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-2">Ready to Book?</h3>
                <p className="text-muted-foreground mb-4">
                  Professional pet care service at your doorstep
                </p>
                <Button size="lg" onClick={() => setShowBooking(true)}>
                  Book Service Now
                </Button>
              </CardContent>
            </Card>
          </>
        ) : (
          // Other services: show simple layout
          <>
            <div className="mb-6 text-center">
              <h1 className="text-3xl font-bold mb-2">{service.name}</h1>
              <p className="text-muted-foreground">
                {category.name} • {subcategory.name}
              </p>
            </div>

            <MultiStepBooking
              serviceName={service.name}
              basePrice={basePrice}
              baseDuration={baseDuration}
              onComplete={handleBookingComplete}
            />
          </>
        )}
      </Container>
    </main>
  );
}
