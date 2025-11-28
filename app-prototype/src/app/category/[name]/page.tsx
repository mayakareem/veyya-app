"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Container from "@/components/layout/Container";
import { SERVICE_CATEGORIES } from "@/lib/constants/categories";
import { getCategoryById } from "@/lib/constants/services";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronRight } from "lucide-react";

export default function CategoryPage({ params }: { params: Promise<{ name: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const categoryName = decodeURIComponent(resolvedParams.name);

  // Get category from main categories
  const mainCategory = SERVICE_CATEGORIES.find(c => c.name === categoryName);

  if (!mainCategory) {
    return (
      <main className="min-h-screen bg-muted/30">
        <Container className="py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Category not found</h1>
            <Button onClick={() => router.push("/")}>Back to Home</Button>
          </div>
        </Container>
      </main>
    );
  }

  // Map category name to ID
  const categoryIdMap: Record<string, string> = {
    "Beauty": "beauty",
    "Nails": "nails",
    "Hair": "hair",
    "Pet Care": "pet-care",
    "Cleaning": "cleaning",
    "Wellness": "wellness",
    "Fitness": "fitness",
  };

  const categoryId = categoryIdMap[mainCategory.name];

  // Get detailed category with subcategories
  const detailedCategory = getCategoryById(categoryId);

  if (!detailedCategory || !detailedCategory.subcategories) {
    return (
      <main className="min-h-screen bg-muted/30">
        <Container className="py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Services coming soon</h1>
            <Button onClick={() => router.push("/")}>Back to Home</Button>
          </div>
        </Container>
      </main>
    );
  }

  const Icon = mainCategory.Icon;

  return (
    <main className="min-h-screen bg-muted/30">
      <Container className="py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/")}
            className="mb-4 sm:mb-6"
          >
            ← Back to Home
          </Button>

          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 sm:p-4 bg-primary/10 rounded-xl">
              <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">{mainCategory.name}</h1>
              <p className="text-sm sm:text-base text-muted-foreground mt-1">{detailedCategory.description}</p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-muted-foreground">
            {detailedCategory.subcategories.length} categories • Choose a service type to browse
          </p>
        </div>

        {/* Subcategories Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {detailedCategory.subcategories.map((subcategory) => (
            <Link
              key={subcategory.id}
              href={`/category/${encodeURIComponent(categoryName)}/${subcategory.id}`}
              className="group bg-white border rounded-xl p-6 hover:shadow-lg hover:border-primary/50 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {subcategory.name}
                  </h3>
                  {subcategory.description && (
                    <p className="text-xs sm:text-sm text-muted-foreground mb-3">
                      {subcategory.description}
                    </p>
                  )}
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
              </div>

              <div className="space-y-1">
                <p className="text-xs sm:text-sm font-medium text-primary">
                  {subcategory.services.length} services available
                </p>
                <div className="flex flex-wrap gap-1">
                  {subcategory.services.slice(0, 3).map((service, idx) => (
                    <span key={idx} className="text-[10px] sm:text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                      {service.name}
                    </span>
                  ))}
                  {subcategory.services.length > 3 && (
                    <span className="text-[10px] sm:text-xs text-muted-foreground">
                      +{subcategory.services.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-muted-foreground">From</span>
                  <span className="font-semibold text-primary">
                    {subcategory.services[0]?.priceRange || "Pricing varies"}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Popular Services CTA */}
        <div className="mt-12 text-center bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-xl p-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-3">Not sure what you need?</h2>
          <p className="text-sm sm:text-base text-muted-foreground mb-6 max-w-2xl mx-auto">
            Browse all services or use our AI-powered search to find exactly what you're looking for
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" onClick={() => router.push("/search")}>
              Browse All Services
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => router.push("/")}>
              Use AI Search
            </Button>
          </div>
        </div>
      </Container>
    </main>
  );
}
