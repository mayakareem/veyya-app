"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { getServiceImage } from "@/lib/utils/serviceImages";
import { Plus, Minus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";

export default function CartPage() {
  const router = useRouter();
  const { cart, addToCart, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();

  const totalPrice = getTotalPrice();
  const serviceFee = Math.round(totalPrice * 0.05); // 5% service fee
  const grandTotal = totalPrice + serviceFee;

  if (cart.length === 0) {
    return (
      <Container className="py-12">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <ShoppingBag className="w-20 h-20 mx-auto text-muted-foreground" />
          <div>
            <h1 className="text-2xl font-semibold mb-2">Your cart is empty</h1>
            <p className="text-muted-foreground">Add some services to get started</p>
          </div>
          <Button onClick={() => router.push("/")} size="lg">
            Browse Services
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-semibold">Your Cart</h1>
            <p className="text-sm text-muted-foreground">
              {cart.length} {cart.length === 1 ? "service" : "services"} in your cart
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => {
              const imageUrl = getServiceImage(item.name, "");
              const itemTotal = item.price * item.quantity;

              return (
                <div
                  key={item.name}
                  className="flex gap-4 p-4 border rounded-lg bg-card hover:shadow-md transition-shadow"
                >
                  {/* Image */}
                  <div className="relative w-24 h-24 flex-shrink-0 rounded-md overflow-hidden">
                    <Image
                      src={imageUrl}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold mb-1">{item.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {item.duration} min • ฿{item.price}
                    </p>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => updateQuantity(item.name, 0)}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => removeFromCart(item.name)}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="w-8 text-center font-medium">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => addToCart(item)}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>

                    <div className="text-right">
                      <p className="font-semibold">฿{itemTotal.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              );
            })}

            <Button
              variant="ghost"
              onClick={clearCart}
              className="w-full text-muted-foreground hover:text-destructive"
            >
              Clear Cart
            </Button>
          </div>

          {/* Order Summary - Sticky */}
          <div className="lg:col-span-1">
            <div className="border rounded-lg p-6 bg-card sticky top-4 space-y-4">
              <h2 className="text-lg font-semibold">Order Summary</h2>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">฿{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service Fee (5%)</span>
                  <span className="font-medium">฿{serviceFee.toLocaleString()}</span>
                </div>
                <div className="border-t pt-2 flex justify-between text-base">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold">฿{grandTotal.toLocaleString()}</span>
                </div>
              </div>

              <Button
                size="lg"
                className="w-full"
                onClick={() => router.push("/checkout")}
              >
                Proceed to Checkout
              </Button>

              <Link
                href="/"
                className="block text-center text-sm text-primary hover:underline"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
