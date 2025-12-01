import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BRAND_COLLABORATIONS } from "@/lib/constants/brands";
import { Award, Clock, DollarSign, CheckCircle, ArrowLeft, Sparkles } from "lucide-react";

interface BrandPageProps {
  params: {
    brand: string;
  };
}

export async function generateStaticParams() {
  return Object.keys(BRAND_COLLABORATIONS).map((brand) => ({
    brand,
  }));
}

export default function BrandPage({ params }: BrandPageProps) {
  const brand = BRAND_COLLABORATIONS[params.brand];

  if (!brand) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      {/* Back Button */}
      <Container className="py-4">
        <Link href="/#brand-collaborations">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </Link>
      </Container>

      {/* Brand Header */}
      <section className="bg-gradient-to-b from-primary/5 to-background">
        <Container className="py-12 md:py-16">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <div className="w-48 h-24 relative bg-white rounded-xl p-6 shadow-sm border">
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Brand Info */}
            <div className="space-y-3">
              <Badge variant="secondary" className="mb-2">
                {brand.category}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold">{brand.name}</h1>
              <p className="text-xl text-muted-foreground">{brand.tagline}</p>
            </div>

            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              {brand.description}
            </p>

            {/* Certifications */}
            {brand.certifications && brand.certifications.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 pt-4">
                {brand.certifications.map((cert, idx) => (
                  <Badge key={idx} variant="outline" className="gap-1">
                    <Award className="w-3 h-3" />
                    {cert}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* About Section */}
      <section className="bg-muted/30">
        <Container className="py-12">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">About {brand.name}</h2>
            <p className="text-muted-foreground leading-relaxed">{brand.about}</p>
          </div>
        </Container>
      </section>

      {/* Services Section */}
      <section>
        <Container className="py-12 md:py-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-semibold mb-3">Available Services</h2>
            <p className="text-muted-foreground">
              Professional treatments using authentic {brand.name} products
            </p>
          </div>

          <div className="space-y-8 max-w-6xl mx-auto">
            {brand.services.map((service, idx) => (
              <Card key={idx} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader className="bg-muted/50">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="space-y-2 flex-1">
                      <CardTitle className="text-2xl">{service.name}</CardTitle>
                      <CardDescription className="text-base">
                        {service.description}
                      </CardDescription>
                    </div>
                    <div className="flex flex-col items-start md:items-end gap-2">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm font-medium">{service.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-primary" />
                        <span className="text-lg font-bold text-primary">{service.price}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    Products Used in This Service
                  </h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    {service.products.map((product, pidx) => (
                      <div
                        key={pidx}
                        className="border rounded-lg p-5 bg-card hover:border-primary/50 transition-colors"
                      >
                        <h4 className="font-semibold mb-2">{product.name}</h4>
                        <p className="text-sm text-muted-foreground mb-4">
                          {product.description}
                        </p>

                        <div className="space-y-2">
                          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                            Key Features
                          </p>
                          <ul className="space-y-1.5">
                            {product.features.map((feature, fidx) => (
                              <li key={fidx} className="flex items-start gap-2 text-sm">
                                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-6" />

                  <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="text-sm text-muted-foreground">
                      All products are 100% authentic and professionally applied
                    </div>
                    <Link href="/search">
                      <Button size="lg" className="w-full sm:w-auto">
                        Book This Service
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-b from-primary/5 to-background">
        <Container className="py-16 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl font-semibold">
              Ready to Experience {brand.name}?
            </h2>
            <p className="text-muted-foreground text-lg">
              Book a certified professional and enjoy premium {brand.name} treatments in the comfort of your home
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/search">
                <Button size="lg" className="w-full sm:w-auto">
                  Find a Provider
                </Button>
              </Link>
              <Link href="/#brand-collaborations">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Explore Other Brands
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
