// src/components/layout/SiteHeader.tsx
"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

export default function SiteHeader() {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight">Veyya</Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/search" className="hover:underline">Explore</Link>
          <Link href="/providers" className="hover:underline">For Providers</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/cart">
            <Button size="sm" variant="ghost" className="relative gap-2">
              <ShoppingCart className="w-4 h-4" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground rounded-full text-xs flex items-center justify-center font-semibold">
                  {totalItems}
                </span>
              )}
              <span className="hidden sm:inline">Cart</span>
            </Button>
          </Link>
          <Link href="/providers"><Button size="sm" variant="outline">Become a provider</Button></Link>
          <Link href="/provider/dashboard"><Button size="sm">Provider dashboard</Button></Link>
        </div>
      </div>
    </header>
  );
}
