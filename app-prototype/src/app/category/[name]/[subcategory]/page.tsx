"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import Container from "@/components/layout/Container";
import { SERVICE_CATEGORIES } from "@/lib/constants/categories";
import { getCategoryById, getSubcategoryById } from "@/lib/constants/services";
import { Button } from "@/components/ui/button";
import { Plus, Minus, ShoppingCart, Clock } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

export default function SubcategoryPage({ params }: { params: Promise<{ name: string; subcategory: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const categoryName = decodeURIComponent(resolvedParams.name);
  const subcategoryId = decodeURIComponent(resolvedParams.subcategory);

  const { cart, addToCart, removeFromCart, getItemQuantity, getTotalItems, getTotalPrice } = useCart();
  const [showCart, setShowCart] = useState(false);

  // Get category data
  const mainCategory = SERVICE_CATEGORIES.find(c => c.name === categoryName);

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

  const categoryId = mainCategory ? categoryIdMap[mainCategory.name] : "";
  const detailedCategory = getCategoryById(categoryId);
  const subcategory = getSubcategoryById(categoryId, subcategoryId);

  if (!mainCategory || !detailedCategory || !subcategory) {
    return (
      <main className="min-h-screen bg-muted/30">
        <Container className="py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Services not found</h1>
            <Button onClick={() => router.push("/")}>Back to Home</Button>
          </div>
        </Container>
      </main>
    );
  }

  const Icon = mainCategory.Icon;
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  return (
    <main className="min-h-screen bg-muted/30">
      <Container className="py-6 sm:py-10">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push(`/category/${encodeURIComponent(categoryName)}`)}
            className="mb-4"
          >
            ← Back to {categoryName}
          </Button>

          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="p-2 sm:p-3 bg-primary/10 rounded-lg">
                <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">{categoryName}</p>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">{subcategory.name}</h1>
                {subcategory.description && (
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">{subcategory.description}</p>
                )}
              </div>
            </div>

            {/* Mobile Cart Button */}
            <Button
              variant="default"
              size="icon"
              className="lg:hidden relative"
              onClick={() => setShowCart(!showCart)}
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-white text-primary rounded-full text-xs flex items-center justify-center font-semibold">
                  {totalItems}
                </span>
              )}
            </Button>
          </div>

          <p className="text-xs sm:text-sm text-muted-foreground">
            {subcategory.services.length} services available
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Services List */}
          <div className="lg:col-span-2">
            <div className="space-y-3 sm:space-y-4">
              {subcategory.services.map((service) => {
                const cartItem = {
                  name: service.name,
                  price: parseInt(service.priceRange?.split("-")[0].replace(/[^0-9]/g, "") || "0"),
                  duration: parseInt(service.duration?.split(" ")[0] || "60"),
                  category: categoryName,
                  subcategory: subcategory.name,
                  description: `${subcategory.name} - ${service.name}`,
                };
                const quantity = getItemQuantity(service.id);

                return (
                  <div
                    key={service.id}
                    className="bg-white border rounded-xl p-4 sm:p-6 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-base sm:text-lg mb-2">{service.name}</h3>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm">
                          <div className="flex items-center gap-1.5 text-muted-foreground">
                            <Clock className="w-4 h-4 flex-shrink-0" />
                            <span>{service.duration}</span>
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
                            <span className="hidden sm:inline">Add</span>
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
                            <span className="w-8 text-center font-semibold text-sm">
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
          </div>

          {/* Cart Summary - Desktop Sticky */}
          <div className={`lg:col-span-1 ${showCart ? "block" : "hidden lg:block"}`}>
            <div className="bg-white border rounded-xl p-4 sm:p-6 sticky top-6">
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
