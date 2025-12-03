"use client";

import { useState } from "react";
import { servicesData } from "@/data/servicesData";
import { ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NewServicesSection() {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedSubcategory, setSelectedSubcategory] = useState(0);

  const currentCategory = servicesData[selectedCategory];
  const currentSubcategory = currentCategory?.subcategories[selectedSubcategory];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-primary/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            <span>New Services</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Browse Our Complete Service Catalog
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our full range of professional services with detailed options and variants
          </p>
        </div>

        {/* Service Browser */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border">
          <div className="grid lg:grid-cols-12 min-h-[600px]">
            {/* Main Categories */}
            <div className="lg:col-span-3 border-r bg-muted/20">
              <div className="p-4 border-b bg-white">
                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                  Categories
                </h3>
              </div>
              <div className="overflow-y-auto max-h-[550px]">
                {servicesData.map((category, index) => (
                  <button
                    key={category.name}
                    onClick={() => {
                      setSelectedCategory(index);
                      setSelectedSubcategory(0);
                    }}
                    className={`w-full text-left px-4 py-3 transition-colors border-l-4 ${
                      selectedCategory === index
                        ? "border-primary bg-primary/5 text-primary font-medium"
                        : "border-transparent hover:bg-muted/50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{category.name}</span>
                      <ChevronRight
                        className={`w-4 h-4 transition-transform ${
                          selectedCategory === index ? "text-primary" : "text-muted-foreground"
                        }`}
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Subcategories */}
            <div className="lg:col-span-3 border-r bg-muted/10">
              <div className="p-4 border-b bg-white">
                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                  Subcategories
                </h3>
              </div>
              <div className="overflow-y-auto max-h-[550px]">
                {currentCategory?.subcategories.map((subcategory, index) => (
                  <button
                    key={subcategory.name}
                    onClick={() => setSelectedSubcategory(index)}
                    className={`w-full text-left px-4 py-3 transition-colors border-l-4 ${
                      selectedSubcategory === index
                        ? "border-primary bg-white text-primary font-medium shadow-sm"
                        : "border-transparent hover:bg-white/50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{subcategory.name}</span>
                      <span className="text-xs bg-muted px-2 py-0.5 rounded-full">
                        {subcategory.services.length}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Services List */}
            <div className="lg:col-span-6">
              <div className="p-4 border-b bg-white">
                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                  Available Services
                </h3>
              </div>
              <div className="overflow-y-auto max-h-[550px] p-4 space-y-3">
                {currentSubcategory?.services.map((service, index) => (
                  <div
                    key={index}
                    className="bg-white border rounded-lg p-4 hover:shadow-md transition-all hover:border-primary/50"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-base">{service.name}</h4>
                      <Button size="sm" variant="ghost" className="h-8">
                        Book
                      </Button>
                    </div>

                    {service.variants && service.variants.length > 0 && (
                      <div className="mb-2">
                        <p className="text-xs text-muted-foreground mb-2">Options:</p>
                        <div className="flex flex-wrap gap-2">
                          {service.variants.map((variant, vIndex) => (
                            <span
                              key={vIndex}
                              className="inline-flex items-center text-xs bg-muted px-2.5 py-1 rounded-full"
                            >
                              {variant.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {service.notes && (
                      <p className="text-xs text-muted-foreground mt-2 italic">
                        {service.notes}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground mb-4">
            Can't find what you're looking for?
          </p>
          <Button size="lg" variant="outline">
            Request a Custom Service
          </Button>
        </div>
      </div>
    </section>
  );
}
