"use client";

import { useState } from "react";
import { servicesData } from "@/data/servicesData";
import { Search, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ServiceDetailModal from "@/components/services/ServiceDetailModal";
import type { Service, MainCategory, Subcategory } from "@/data/servicesData";

export default function ServicesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedService, setSelectedService] = useState<{
    service: Service;
    category: string;
    subcategory: string;
  } | null>(null);

  // Flatten services for search and display
  const getAllServices = () => {
    const allServices: Array<{
      service: Service;
      category: string;
      subcategory: string;
    }> = [];

    servicesData.forEach((category) => {
      category.subcategories.forEach((subcategory) => {
        subcategory.services.forEach((service) => {
          allServices.push({
            service,
            category: category.name,
            subcategory: subcategory.name,
          });
        });
      });
    });

    return allServices;
  };

  const allServices = getAllServices();

  // Filter services based on search and category
  const filteredServices = allServices.filter((item) => {
    const matchesSearch =
      searchQuery === "" ||
      item.service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subcategory.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-primary/5">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-12">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              <span>Complete Service Catalog</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Browse All Services
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our complete range of professional services - from beauty to home care, wellness to pet grooming
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="Search services, categories, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-base"
              />
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 justify-center">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("all")}
              className="rounded-full"
            >
              All Services
            </Button>
            {servicesData.map((category) => (
              <Button
                key={category.name}
                variant={
                  selectedCategory === category.name ? "default" : "outline"
                }
                size="sm"
                onClick={() => setSelectedCategory(category.name)}
                className="rounded-full"
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-12">
        {filteredServices.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground mb-4">
              No services found matching your search
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <>
            <p className="text-sm text-muted-foreground mb-6">
              Showing {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {filteredServices.map((item, index) => (
                <div
                  key={index}
                  className="bg-white border rounded-xl p-5 hover:shadow-lg transition-all hover:border-primary/50 cursor-pointer group"
                  onClick={() => setSelectedService(item)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <Badge
                        variant="secondary"
                        className="mb-2 text-xs font-normal"
                      >
                        {item.subcategory}
                      </Badge>
                      <h3 className="font-semibold text-base group-hover:text-primary transition-colors">
                        {item.service.name}
                      </h3>
                    </div>
                  </div>

                  {item.service.variants && item.service.variants.length > 0 && (
                    <div className="mb-3">
                      <p className="text-xs text-muted-foreground mb-2">
                        {item.service.variants.length} option{item.service.variants.length !== 1 ? 's' : ''} available
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {item.service.variants.slice(0, 3).map((variant, vIndex) => (
                          <span
                            key={vIndex}
                            className="inline-flex items-center text-xs bg-muted px-2 py-1 rounded-md"
                          >
                            {variant.name}
                          </span>
                        ))}
                        {item.service.variants.length > 3 && (
                          <span className="inline-flex items-center text-xs text-muted-foreground px-2 py-1">
                            +{item.service.variants.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {item.service.notes && (
                    <p className="text-xs text-muted-foreground italic mb-3 line-clamp-2">
                      {item.service.notes}
                    </p>
                  )}

                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  >
                    View Details
                  </Button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <ServiceDetailModal
          service={selectedService.service}
          category={selectedService.category}
          subcategory={selectedService.subcategory}
          onClose={() => setSelectedService(null)}
        />
      )}
    </div>
  );
}
