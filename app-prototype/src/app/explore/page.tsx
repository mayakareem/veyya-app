"use client";

import { useState } from "react";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SERVICE_CATEGORIES } from "@/lib/constants/categories";
import { Search, SlidersHorizontal } from "lucide-react";

export default function ExplorePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = selectedCategory
    ? SERVICE_CATEGORIES.filter((cat) => cat.name === selectedCategory)
    : SERVICE_CATEGORIES;

  const searchFilteredCategories = searchQuery
    ? filteredCategories.filter(
        (cat) =>
          cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          cat.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          cat.services.some((service) =>
            service.toLowerCase().includes(searchQuery.toLowerCase())
          )
      )
    : filteredCategories;

  return (
    <main className="min-h-screen bg-muted/30">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border-b">
        <Container className="py-12">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Explore Our Services
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Discover premium home services from trusted professionals. Beauty, wellness, pet care, and more—all at your doorstep.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search for services, treatments, or categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-white shadow-sm"
              />
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-12">
        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <SlidersHorizontal className="w-5 h-5 text-muted-foreground" />
            <h2 className="text-lg font-semibold">Filter by Category</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(null)}
            >
              All Services
            </Button>
            {SERVICE_CATEGORIES.map((category) => {
              const Icon = category.Icon;
              return (
                <Button
                  key={category.name}
                  variant={selectedCategory === category.name ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.name)}
                  className="gap-2"
                >
                  <Icon className="w-4 h-4" />
                  {category.name}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            {searchFilteredCategories.length === SERVICE_CATEGORIES.length
              ? `Showing all ${SERVICE_CATEGORIES.length} categories`
              : `Found ${searchFilteredCategories.length} ${searchFilteredCategories.length === 1 ? "category" : "categories"}`}
          </p>
        </div>

        {/* Category Grid */}
        {searchFilteredCategories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchFilteredCategories.map((category) => {
              const Icon = category.Icon;
              return (
                <Link
                  key={category.name}
                  href={`/category/${encodeURIComponent(category.name)}`}
                  className="group"
                >
                  <div className="bg-white rounded-xl p-6 border hover:border-primary hover:shadow-lg transition-all duration-300 h-full">
                    {/* Icon */}
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>

                    {/* Category Info */}
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {category.description}
                    </p>

                    {/* Services List */}
                    <div className="space-y-1.5 mb-4">
                      {category.services.slice(0, 4).map((service, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                          <span>{service}</span>
                        </div>
                      ))}
                      {category.services.length > 4 && (
                        <div className="text-sm text-primary font-medium pt-1">
                          +{category.services.length - 4} more services
                        </div>
                      )}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all">
                      <span>Explore {category.name}</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No results found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or filter to find what you're looking for.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory(null);
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Popular Services Section */}
        {!searchQuery && !selectedCategory && (
          <div className="mt-16 pt-16 border-t">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-3">Popular Right Now</h2>
              <p className="text-muted-foreground">
                Trending services booked by customers this week
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "Bridal Makeup", category: "Makeup", icon: "💄" },
                { name: "Thai Massage", category: "Wellness", icon: "💆‍♀️" },
                { name: "Gel Manicure", category: "Nails", icon: "💅" },
                { name: "Dog Grooming", category: "Pet Care", icon: "🐕" },
                { name: "Deep Cleaning", category: "Cleaning", icon: "✨" },
                { name: "Balayage", category: "Hair", icon: "💇‍♀️" },
                { name: "Personal Training", category: "Fitness", icon: "💪" },
                { name: "Anti-Aging Facial", category: "Beauty", icon: "🧖‍♀️" },
              ].map((service, idx) => (
                <Link
                  key={idx}
                  href={`/category/${encodeURIComponent(service.category)}`}
                  className="bg-white border rounded-lg p-4 hover:border-primary hover:shadow-md transition-all text-center group"
                >
                  <div className="text-3xl mb-2">{service.icon}</div>
                  <div className="font-medium text-sm mb-1 group-hover:text-primary transition-colors">
                    {service.name}
                  </div>
                  <div className="text-xs text-muted-foreground">{service.category}</div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA Section */}
        {!searchQuery && !selectedCategory && (
          <div className="mt-16 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 md:p-12 text-center border">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Use our advanced search to find exactly what you need, or contact our support team for personalized recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/search">
                <Button size="lg">Advanced Search</Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline">Contact Support</Button>
              </Link>
            </div>
          </div>
        )}
      </Container>
    </main>
  );
}
