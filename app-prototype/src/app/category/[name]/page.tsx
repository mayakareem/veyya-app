"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Container from "@/components/layout/Container";
import { SERVICE_CATEGORIES } from "@/lib/constants/categories";
import { getCategoryById } from "@/lib/constants/services";
import type { Service } from "@/lib/constants/services";
import { Button } from "@/components/ui/button";
import { Plus, Minus, ShoppingCart, Clock, LayoutGrid, List } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

export default function CategoryPage({ params }: { params: Promise<{ name: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const categoryName = decodeURIComponent(resolvedParams.name);

  const { cart, addToCart, removeFromCart, getItemQuantity, getTotalItems, getTotalPrice } = useCart();
  const [viewMode, setViewMode] = useState<"tile" | "list">("tile");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("all");

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

  // Filter services by selected subcategory
  const filteredServices = selectedSubcategory === "all"
    ? allServices
    : allServices.filter(s => s.subcategoryId === selectedSubcategory);

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  // Generate image URL for service
  const getServiceImage = (serviceName: string) => {
    const seed = encodeURIComponent(serviceName.toLowerCase().replace(/\s+/g, '-'));
    return `https://images.unsplash.com/photo-1${Math.abs(seed.split('').reduce((a, b) => ((a << 5) - a + b.charCodeAt(0)) | 0, 0)) % 1000000000}?w=400&h=300&fit=crop`;
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
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Services - List or Tile View */}
          <div className="lg:col-span-2">
            {viewMode === "list" ? (
              /* List View */
              <div className="space-y-3">
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

                  return (
                    <div
                      key={service.id}
                      className="bg-background border rounded-lg p-4 hover:shadow-md transition-all"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                              {service.subcategoryName}
                            </span>
                          </div>
                          <h3 className="font-semibold text-lg mb-1">{service.name}</h3>
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <Clock className="w-4 h-4" />
                              {service.duration}
                            </div>
                            <div className="font-semibold text-primary">
                              {service.priceRange}
                            </div>
                          </div>
                        </div>

                        {/* Add to Cart Controls */}
                        <div className="flex-shrink-0">
                          {quantity === 0 ? (
                            <Button
                              onClick={() => {
                                addToCart(cartItem);
                                toast.success(`${service.name} added to cart`);
                              }}
                              size="sm"
                              className="gap-2"
                            >
                              <Plus className="w-4 h-4" />
                              Add
                            </Button>
                          ) : (
                            <div className="flex items-center gap-2 bg-primary/10 rounded-lg p-1">
                              <Button
                                onClick={() => removeFromCart(service.id)}
                                size="sm"
                                variant="ghost"
                                className="h-8 w-8 p-0"
                              >
                                <Minus className="w-4 h-4" />
                              </Button>
                              <span className="w-8 text-center font-semibold">
                                {quantity}
                              </span>
                              <Button
                                onClick={() => {
                                  addToCart(cartItem);
                                  toast.success(`${service.name} added to cart`);
                                }}
                                size="sm"
                                variant="ghost"
                                className="h-8 w-8 p-0"
                              >
                                <Plus className="w-4 h-4" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Tile View */
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  const imageUrl = getServiceImage(service.name);

                  return (
                    <div
                      key={service.id}
                      className="bg-background border rounded-lg overflow-hidden hover:shadow-lg transition-all group"
                    >
                      {/* Service Image */}
                      <div className="relative h-40 sm:h-48 w-full overflow-hidden bg-muted">
                        <Image
                          src={imageUrl}
                          alt={service.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-3 right-3 font-semibold text-white bg-primary px-3 py-1.5 rounded-full shadow-lg text-sm">
                          {service.priceRange}
                        </div>
                        <div className="absolute top-3 left-3">
                          <span className="text-xs text-white bg-black/60 px-2 py-1 rounded-full">
                            {service.subcategoryName}
                          </span>
                        </div>
                      </div>

                      {/* Service Details */}
                      <div className="p-4">
                        <h3 className="font-semibold text-base sm:text-lg mb-2 line-clamp-2">{service.name}</h3>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            {service.duration}
                          </div>

                          {/* Add to Cart Controls */}
                          {quantity === 0 ? (
                            <Button
                              onClick={() => {
                                addToCart(cartItem);
                                toast.success(`${service.name} added to cart`);
                              }}
                              size="sm"
                              className="gap-2"
                            >
                              <Plus className="w-4 h-4" />
                              Add
                            </Button>
                          ) : (
                            <div className="flex items-center gap-2 bg-primary/10 rounded-lg p-1">
                              <Button
                                onClick={() => removeFromCart(service.id)}
                                size="sm"
                                variant="ghost"
                                className="h-7 w-7 p-0"
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="w-6 text-center font-semibold text-sm">
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
                  );
                })}
              </div>
            )}
          </div>

          {/* Cart Summary - Sticky */}
          <div className="lg:col-span-1">
            <div className="bg-background border rounded-lg sticky top-6 p-4 sm:p-6">
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
