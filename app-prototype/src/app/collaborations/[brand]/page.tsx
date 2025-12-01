"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { use } from "react";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BRAND_COLLABORATIONS } from "@/lib/constants/brands";
import { Award, Clock, DollarSign, CheckCircle, ArrowLeft, Sparkles, Ticket, Package, Gift, Calendar as CalendarIcon, Plus, Minus, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { ServiceDetail } from "@/lib/constants/categories";

interface BrandPageProps {
  params: Promise<{
    brand: string;
  }>;
}

export default function BrandPage({ params }: BrandPageProps) {
  const { brand: brandId } = use(params);
  const brand = BRAND_COLLABORATIONS[brandId];
  const { addToCart, removeFromCart, getItemQuantity } = useCart();

  if (!brand) {
    notFound();
  }

  // Convert brand service to ServiceDetail format for cart
  const createServiceDetail = (serviceName: string, price: string, duration: string): ServiceDetail => {
    const numericPrice = parseInt(price.replace(/[^0-9]/g, ''));
    const numericDuration = parseInt(duration.replace(/[^0-9]/g, ''));
    return {
      name: serviceName,
      price: numericPrice,
      duration: numericDuration,
      description: `${serviceName} from ${brand.name}`,
    };
  };

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
                    {(() => {
                      const serviceDetail = createServiceDetail(service.name, service.price, service.duration);
                      const quantity = getItemQuantity(service.name);

                      return quantity > 0 ? (
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => removeFromCart(service.name)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="font-semibold min-w-[2rem] text-center">
                            {quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => addToCart(serviceDetail)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                          <Badge className="ml-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                            In Cart
                          </Badge>
                        </div>
                      ) : (
                        <Button
                          size="lg"
                          className="w-full sm:w-auto gap-2"
                          onClick={() => addToCart(serviceDetail)}
                        >
                          <ShoppingCart className="h-4 w-4" />
                          Add to Cart
                        </Button>
                      );
                    })()}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Vouchers Section */}
      <section className="bg-muted/30">
        <Container className="py-12 md:py-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-semibold mb-3 flex items-center justify-center gap-2">
              <Ticket className="w-8 h-8 text-primary" />
              Exclusive Vouchers
            </h2>
            <p className="text-muted-foreground">
              Save more on your {brand.name} treatments
            </p>
          </div>

          <div className="overflow-x-auto pb-4">
            <div className="flex gap-6 min-w-max mx-auto justify-center">
              {brand.vouchers.map((voucher, idx) => (
                <Card
                  key={idx}
                  className="w-80 border-2 border-dashed border-primary/50 bg-gradient-to-br from-primary/5 to-background hover:shadow-lg transition-all"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <Gift className="w-6 h-6 text-primary" />
                        <CardTitle className="font-mono text-xl">{voucher.code}</CardTitle>
                      </div>
                      <Badge className="bg-green-100 text-green-700 border-green-300">
                        {voucher.type === "percentage"
                          ? `${voucher.discount}% OFF`
                          : `฿${voucher.discount} OFF`}
                      </Badge>
                    </div>
                    <CardDescription className="mt-2">
                      {voucher.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Minimum Spend:</span>
                        <span className="font-semibold">฿{voucher.minSpend.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground flex items-center gap-1">
                          <CalendarIcon className="w-4 h-4" />
                          Valid Until:
                        </span>
                        <span className="font-semibold">
                          {new Date(voucher.expiresAt).toLocaleDateString()}
                        </span>
                      </div>
                      <Separator />
                      <Button className="w-full" variant="outline">
                        <Ticket className="w-4 h-4 mr-2" />
                        Copy Code
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Bundled Services Section */}
      <section>
        <Container className="py-12 md:py-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-semibold mb-3 flex items-center justify-center gap-2">
              <Package className="w-8 h-8 text-primary" />
              Service Bundles
            </h2>
            <p className="text-muted-foreground">
              Save even more when you book these popular combinations
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {brand.bundles.map((bundle, idx) => (
              <Card
                key={idx}
                className="overflow-hidden hover:shadow-xl transition-all border-2"
              >
                <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{bundle.name}</CardTitle>
                      <CardDescription>{bundle.description}</CardDescription>
                    </div>
                    <Badge className="bg-green-100 text-green-700 border-green-300 text-lg px-3 py-1">
                      Save ฿{bundle.savings}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Services Included */}
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">
                        Services Included:
                      </p>
                      <ul className="space-y-1.5">
                        {bundle.services.map((service, sidx) => (
                          <li key={sidx} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                            <span>{service}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Separator />

                    {/* Pricing */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Regular Price:</span>
                        <span className="line-through text-muted-foreground">
                          ฿{bundle.originalPrice.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-lg">Bundle Price:</span>
                        <span className="text-2xl font-bold text-primary">
                          ฿{bundle.bundlePrice.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Voucher Code */}
                    {bundle.voucherCode && (
                      <div className="bg-muted/50 rounded-lg p-3 border border-dashed">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Use Code:</p>
                            <p className="font-mono font-bold text-primary">
                              {bundle.voucherCode}
                            </p>
                          </div>
                          <Button size="sm" variant="ghost">
                            Copy
                          </Button>
                        </div>
                      </div>
                    )}

                    <Separator />

                    {/* Valid Until */}
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Valid until:</span>
                      <span className="font-medium">
                        {new Date(bundle.validUntil).toLocaleDateString()}
                      </span>
                    </div>

                    {/* Add to Cart Button */}
                    {(() => {
                      const bundleService = createServiceDetail(
                        bundle.name,
                        `฿${bundle.bundlePrice}`,
                        "Varies"
                      );
                      const quantity = getItemQuantity(bundle.name);

                      return quantity > 0 ? (
                        <div className="flex items-center gap-3 w-full">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => removeFromCart(bundle.name)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="font-semibold min-w-[2rem] text-center">
                            {quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => addToCart(bundleService)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                          <Badge className="ml-auto bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                            In Cart
                          </Badge>
                        </div>
                      ) : (
                        <Button
                          className="w-full gap-2"
                          size="lg"
                          onClick={() => addToCart(bundleService)}
                        >
                          <ShoppingCart className="h-4 w-4" />
                          Add Bundle to Cart
                        </Button>
                      );
                    })()}
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
