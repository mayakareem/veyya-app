"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/layout/Container";
import { SERVICE_CATEGORIES } from "@/lib/constants/categories";
import { getCategoryById } from "@/lib/constants/services";
import { getServiceImage } from "@/lib/utils/serviceImages";
import { Button } from "@/components/ui/button";
import { Plus, Minus, ShoppingCart, Clock, LayoutGrid, List, ChevronDown, ChevronUp, Calendar, Info } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

export default function CategoryPage({ params }: { params: Promise<{ name: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const categoryName = decodeURIComponent(resolvedParams.name);

  const { cart, addToCart, removeFromCart, getItemQuantity, getTotalItems, getTotalPrice } = useCart();
  const [viewMode, setViewMode] = useState<"tile" | "list">("tile");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("all");
  const [petTypeFilter, setPetTypeFilter] = useState<"all" | "dog" | "cat">("all");
  const [expandedService, setExpandedService] = useState<string | null>(null);

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
    "Healthcare": "healthcare",
    "Pet Care": "pet-care",
    "Cleaning": "cleaning",
    "Wellness": "wellness",
    "Fitness": "fitness",
  };

  const categoryId = categoryIdMap[mainCategory.name];
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

  // Flatten all services from all subcategories
  const allServices = detailedCategory.subcategories.flatMap((subcategory) =>
    subcategory.services.map((service) => ({
      ...service,
      subcategoryId: subcategory.id,
      subcategoryName: subcategory.name,
      category: categoryName,
    }))
  );

  // Filter services by selected subcategory and pet type
  let filteredServices = selectedSubcategory === "all"
    ? allServices
    : allServices.filter(s => s.subcategoryId === selectedSubcategory);

  // Apply pet type filter for Pet Care category
  if (categoryName === "Pet Care" && petTypeFilter !== "all") {
    filteredServices = filteredServices.filter(service => {
      const lowerName = service.name.toLowerCase();
      const subcategoryId = service.subcategoryId;

      if (petTypeFilter === "dog") {
        // Show for dogs: grooming with "dog", walking (all), training (all), sitting & home visits (all)
        if (subcategoryId === "grooming") {
          return lowerName.includes("dog");
        }
        if (subcategoryId === "walking" || subcategoryId === "training" || subcategoryId === "sitting-visits") {
          return true;
        }
        return false;
      }

      if (petTypeFilter === "cat") {
        // Show for cats: grooming with "cat", sitting & home visits (all)
        if (subcategoryId === "grooming") {
          return lowerName.includes("cat");
        }
        if (subcategoryId === "sitting-visits") {
          return true;
        }
        return false;
      }

      return true;
    });
  }

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  // Generate next available slot (mock data - in production this would come from API)
  const getNextAvailableSlot = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const times = ["9:00 AM", "10:30 AM", "2:00 PM", "4:30 PM"];
    const randomTime = times[Math.floor(Math.random() * times.length)];

    return `Tomorrow, ${randomTime}`;
  };

  const toggleExpand = (serviceId: string) => {
    setExpandedService(expandedService === serviceId ? null : serviceId);
  };

  return (
    <main className="min-h-screen bg-muted/30">
      <Container className="py-6 sm:py-10 md:py-12">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/")}
            className="mb-4 sm:mb-6"
          >
            ← Back to Home
          </Button>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="p-3 sm:p-4 bg-primary/10 rounded-xl">
                <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">{mainCategory.name}</h1>
                <p className="text-sm sm:text-base text-muted-foreground mt-1">{detailedCategory.description}</p>
              </div>
            </div>

            {/* View Toggle */}
            <div className="hidden sm:flex items-center gap-2 bg-muted rounded-lg p-1">
              <Button
                variant={viewMode === "tile" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("tile")}
                className="gap-2"
              >
                <LayoutGrid className="w-4 h-4" />
                <span className="hidden md:inline">Tile</span>
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="gap-2"
              >
                <List className="w-4 h-4" />
                <span className="hidden md:inline">List</span>
              </Button>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-muted-foreground mb-4">
            {filteredServices.length} services available
          </p>

          {/* Patrangsit Hospital Partner Banner - Only for Healthcare */}
          {mainCategory.name === "Healthcare" && (
            <div className="mb-6 bg-gradient-to-r from-blue-50 to-green-50 border-2 border-blue-200 rounded-xl p-4 sm:p-6">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 bg-white p-3 rounded-lg shadow-sm">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 relative">
                    {/* Hospital Logo Placeholder */}
                    <div className="w-full h-full bg-blue-600 rounded-lg flex items-center justify-center">
                      <svg className="w-10 h-10 sm:w-12 sm:h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg sm:text-xl font-bold text-blue-900">Patrangsit Hospital</h3>
                    <div className="flex items-center gap-1 bg-green-100 px-2 py-0.5 rounded-full">
                      <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-xs font-semibold text-green-700">Verified Partner</span>
                    </div>
                  </div>
                  <p className="text-sm text-blue-800 mb-2">
                    All healthcare services are provided by certified medical professionals from Patrangsit Hospital
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">JCI Accredited</span>
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">Licensed Practitioners</span>
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">Insured Services</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Subcategory Filter Bar */}
          <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="flex gap-2 min-w-max sm:min-w-0">
              <Button
                variant={selectedSubcategory === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedSubcategory("all")}
                className="flex-shrink-0"
              >
                All Services ({allServices.length})
              </Button>
              {detailedCategory.subcategories.map((subcategory) => (
                <Button
                  key={subcategory.id}
                  variant={selectedSubcategory === subcategory.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedSubcategory(subcategory.id)}
                  className="flex-shrink-0"
                >
                  {subcategory.name} ({subcategory.services.length})
                </Button>
              ))}
            </div>
          </div>

          {/* Pet Type Filter - Only for Pet Care */}
          {categoryName === "Pet Care" && (
            <div className="mt-4 overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
              <div className="flex gap-2 min-w-max sm:min-w-0">
                <Button
                  variant={petTypeFilter === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setPetTypeFilter("all")}
                  className="flex-shrink-0"
                >
                  All Pets
                </Button>
                <Button
                  variant={petTypeFilter === "dog" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setPetTypeFilter("dog")}
                  className="flex-shrink-0"
                >
                  Dogs
                </Button>
                <Button
                  variant={petTypeFilter === "cat" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setPetTypeFilter("cat")}
                  className="flex-shrink-0"
                >
                  Cats
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Services - List or Tile View */}
          <div className="lg:col-span-2">
            {viewMode === "list" ? (
              /* List View */
              <div className="space-y-2">
                {filteredServices.map((service) => {
                  const cartItem = {
                    name: service.name,
                    price: parseInt(service.priceRange?.split("-")[0].replace(/[^0-9]/g, "") || "0"),
                    duration: parseInt(service.duration?.split(" ")[0] || "60"),
                    category: categoryName,
                    subcategory: service.subcategoryName,
                    description: `${service.subcategoryName} - ${service.name}`,
                  };
                  const quantity = getItemQuantity(service.id);
                  const isExpanded = expandedService === service.id;

                  return (
                    <div
                      key={service.id}
                      className="bg-white border rounded-lg overflow-hidden hover:shadow-md transition-all"
                    >
                      {/* Main Service Row */}
                      <div className="p-3 sm:p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full flex-shrink-0">
                                {service.subcategoryName}
                              </span>
                            </div>
                            <h3 className="font-semibold text-sm sm:text-base mb-1 truncate">{service.name}</h3>
                            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                              <div className="flex items-center gap-1 text-muted-foreground">
                                <Clock className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                                <span>{service.duration}</span>
                              </div>
                              <div className="font-semibold text-primary">
                                {service.priceRange}
                              </div>
                              <div className="flex items-center gap-1 text-muted-foreground">
                                <Calendar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                                <span className="text-xs">{getNextAvailableSlot()}</span>
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleExpand(service.id)}
                              className="h-8 w-8 p-0"
                            >
                              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </Button>

                            {quantity === 0 ? (
                              <Button
                                onClick={() => {
                                  addToCart(cartItem);
                                  toast.success(`${service.name} added to cart`);
                                }}
                                size="sm"
                                className="gap-1 h-8"
                              >
                                <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                                <span className="hidden sm:inline text-xs">Add</span>
                              </Button>
                            ) : (
                              <div className="flex items-center gap-1 bg-primary/10 rounded-lg p-0.5">
                                <Button
                                  onClick={() => removeFromCart(service.id)}
                                  size="sm"
                                  variant="ghost"
                                  className="h-7 w-7 p-0"
                                >
                                  <Minus className="w-3 h-3" />
                                </Button>
                                <span className="w-6 text-center font-semibold text-xs">
                                  {quantity}
                                </span>
                                <Button
                                  onClick={() => {
                                    addToCart(cartItem);
                                    toast.success(`${service.name} added to cart`);
                                  }}
                                  size="sm"
                                  variant="ghost"
                                  className="h-7 w-7 p-0"
                                >
                                  <Plus className="w-3 h-3" />
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Expanded Details */}
                      {isExpanded && (
                        <div className="border-t bg-muted/30 p-3 sm:p-4">
                          <div className="space-y-3">
                            <div>
                              <h4 className="font-semibold text-sm mb-2">Service Details</h4>
                              <p className="text-xs sm:text-sm text-muted-foreground">
                                Professional {service.subcategoryName.toLowerCase()} service. Duration: {service.duration}.
                                All our providers are verified and highly rated.
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <Link
                                href={`/catalog/${encodeURIComponent(service.id)}`}
                                className="flex-1"
                              >
                                <Button variant="outline" size="sm" className="w-full gap-1 text-xs">
                                  <Info className="w-3 h-3" />
                                  More Details
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Tile View - Smaller, Compact Cards */
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {filteredServices.map((service) => {
                  const cartItem = {
                    name: service.name,
                    price: parseInt(service.priceRange?.split("-")[0].replace(/[^0-9]/g, "") || "0"),
                    duration: parseInt(service.duration?.split(" ")[0] || "60"),
                    category: categoryName,
                    subcategory: service.subcategoryName,
                    description: `${service.subcategoryName} - ${service.name}`,
                  };
                  const quantity = getItemQuantity(service.id);
                  const imageUrl = getServiceImage(service.name, categoryName);

                  return (
                    <div
                      key={service.id}
                      className="bg-white border rounded-lg overflow-hidden hover:shadow-lg transition-all group"
                    >
                      {/* Service Image - Clickable to Detail Page */}
                      <Link href={`/catalog/${encodeURIComponent(service.id)}`}>
                        <div className="relative h-32 sm:h-36 w-full overflow-hidden bg-muted cursor-pointer">
                          <Image
                            src={imageUrl}
                            alt={service.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-2 left-2">
                            <span className="text-[10px] text-white bg-black/60 px-1.5 py-0.5 rounded-full">
                              {service.subcategoryName}
                            </span>
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <div className="text-white text-xs font-medium">
                              View Details
                            </div>
                          </div>
                        </div>
                      </Link>

                      {/* Service Details - Compact */}
                      <div className="p-2 sm:p-3">
                        <Link href={`/catalog/${encodeURIComponent(service.id)}`}>
                          <h3 className="font-semibold text-xs sm:text-sm mb-1 line-clamp-2 min-h-[2.5rem] hover:text-primary cursor-pointer transition-colors">{service.name}</h3>
                        </Link>

                        <div className="space-y-1 mb-2">
                          <div className="flex items-center justify-between text-[10px] sm:text-xs">
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <Clock className="w-3 h-3 flex-shrink-0" />
                              <span>{service.duration}</span>
                            </div>
                            <div className="font-bold text-primary text-xs">
                              {service.priceRange?.split("-")[0]}
                            </div>
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground text-[10px]">
                            <Calendar className="w-3 h-3 flex-shrink-0" />
                            <span className="truncate">{getNextAvailableSlot()}</span>
                          </div>
                        </div>

                        {/* Add to Cart */}
                        {quantity === 0 ? (
                          <Button
                            onClick={() => {
                              addToCart(cartItem);
                              toast.success(`Added to cart`);
                            }}
                            size="sm"
                            className="w-full gap-1 h-7 text-xs"
                          >
                            <Plus className="w-3 h-3" />
                            Add
                          </Button>
                        ) : (
                          <div className="flex items-center gap-1 bg-primary/10 rounded-lg p-0.5 justify-center">
                            <Button
                              onClick={() => removeFromCart(service.id)}
                              size="sm"
                              variant="ghost"
                              className="h-6 w-6 p-0"
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="w-6 text-center font-semibold text-xs">
                              {quantity}
                            </span>
                            <Button
                              onClick={() => {
                                addToCart(cartItem);
                                toast.success(`Added to cart`);
                              }}
                              size="sm"
                              variant="ghost"
                              className="h-6 w-6 p-0"
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Cart Summary - Sticky */}
          <div className="lg:col-span-1">
            <div className="bg-white border rounded-lg sticky top-6 p-4 sm:p-6">
              <div className="flex items-center gap-2 mb-4">
                <ShoppingCart className="w-5 h-5" />
                <h2 className="text-lg sm:text-xl font-bold">Your Cart</h2>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-sm text-muted-foreground">
                    No services added yet
                  </p>
                </div>
              ) : (
                <>
                  <div className="space-y-3 mb-4 max-h-96 overflow-y-auto">
                    {cart.map((item) => (
                      <div
                        key={item.name}
                        className="flex items-start justify-between gap-2 pb-3 border-b last:border-0"
                      >
                        <div className="flex-1">
                          <p className="font-medium text-sm">{item.name}</p>
                          <p className="text-xs text-muted-foreground">
                            ฿{item.price} × {item.quantity}
                          </p>
                        </div>
                        <p className="font-semibold text-sm">
                          ฿{item.price * item.quantity}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 space-y-2 mb-4">
                    <div className="flex justify-between text-base font-bold">
                      <span>Total:</span>
                      <span className="text-primary">฿{totalPrice.toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Service fee will be calculated at checkout
                    </p>
                  </div>

                  <Button
                    className="w-full"
                    size="lg"
                    onClick={() => router.push("/cart")}
                  >
                    Continue to Checkout
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
