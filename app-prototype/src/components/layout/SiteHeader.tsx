// src/components/layout/SiteHeader.tsx
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ShoppingCart, MapPin, Gift, ChevronDown, Calendar, User, Menu, X, MessageCircle, Phone } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const BANGKOK_AREAS = [
  "Sukhumvit",
  "Silom",
  "Sathorn",
  "Thonglor",
  "Ekkamai",
  "Ari",
  "Phrom Phong",
  "Asoke",
  "Rama 9",
  "Ratchada",
];

export default function SiteHeader() {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();
  const [selectedLocation, setSelectedLocation] = useState<string>("Sukhumvit");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Auto-detect location on mount (simplified for demo)
  useEffect(() => {
    // In production, use geolocation API or IP-based detection
    const defaultLocation = BANGKOK_AREAS[0];
    setSelectedLocation(defaultLocation);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden h-10 w-10"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>

          {/* Logo - Larger & Clickable */}
          <Link href="/" className="text-2xl font-bold tracking-tight text-primary hover:text-primary/80 transition-colors">
            Veyya
          </Link>

          {/* Center Navigation - Text Only - Desktop Only */}
          <nav className="absolute left-1/2 -translate-x-1/2 hidden lg:flex items-center gap-8">
            {/* Location Dropdown - No Icon */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1 font-normal">
                  <span className="text-sm">{selectedLocation}</span>
                  <ChevronDown className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-48 bg-white">
                {BANGKOK_AREAS.map((area) => (
                  <DropdownMenuItem
                    key={area}
                    onClick={() => setSelectedLocation(area)}
                    className={selectedLocation === area ? "bg-muted" : ""}
                  >
                    {area}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Events Dropdown - No Icon */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1 font-normal">
                  <span className="text-sm">Events</span>
                  <ChevronDown className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-56 bg-white">
                <DropdownMenuItem asChild>
                  <Link href="/events/weddings" className="w-full">
                    Wedding Services
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/events/parties" className="w-full">
                    Party Planning
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/events/corporate" className="w-full">
                    Corporate Events
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/events/photoshoots" className="w-full">
                    Photoshoots
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/events/wellness" className="w-full">
                    Wellness Retreats
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/explore" className="text-sm hover:text-primary transition-colors font-normal">
              Explore
            </Link>
          </nav>

          {/* Right Actions - Responsive Icons with Popovers */}
          <div className="flex items-center gap-0.5">
            {/* Referrals Popover */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="h-12 w-12">
                  <Gift className="w-6 h-6" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64 bg-white" align="end">
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm">Refer & Earn</h3>
                  <p className="text-xs text-muted-foreground">
                    Share Veyya with friends and earn rewards!
                  </p>
                  <Link href="/referrals">
                    <Button size="sm" className="w-full">
                      View Referral Program
                    </Button>
                  </Link>
                </div>
              </PopoverContent>
            </Popover>

            {/* Cart Popover */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="h-12 w-12 relative">
                  <ShoppingCart className="w-6 h-6" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground rounded-full text-xs flex items-center justify-center font-semibold">
                      {totalItems}
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64 bg-white" align="end">
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm">Shopping Cart</h3>
                  {totalItems > 0 ? (
                    <>
                      <p className="text-xs text-muted-foreground">
                        {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
                      </p>
                      <Link href="/cart">
                        <Button size="sm" className="w-full">
                          View Cart
                        </Button>
                      </Link>
                    </>
                  ) : (
                    <p className="text-xs text-muted-foreground">Your cart is empty</p>
                  )}
                </div>
              </PopoverContent>
            </Popover>

            {/* Auth Popover */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="h-12 w-12">
                  <User className="w-6 h-6" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64 bg-white" align="end">
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm">Account</h3>
                  <p className="text-xs text-muted-foreground">
                    Sign in to manage your bookings
                  </p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={() => setShowAuthModal(true)}
                    >
                      Log In
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1"
                      onClick={() => setShowAuthModal(true)}
                    >
                      Sign Up
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            {/* WhatsApp Contact */}
            <Button
              variant="ghost"
              size="icon"
              className="h-12 w-12"
              onClick={() => {
                alert("WhatsApp support is currently in beta and under development. We'll be launching soon!");
              }}
              title="Contact us on WhatsApp (Beta)"
            >
              <MessageCircle className="w-6 h-6 text-green-600" />
            </Button>

            {/* LINE Contact */}
            <Button
              variant="ghost"
              size="icon"
              className="h-12 w-12"
              onClick={() => {
                alert("LINE support is currently in beta and under development. We'll be launching soon!");
              }}
              title="Contact us on LINE (Beta)"
            >
              <svg className="w-6 h-6 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
              </svg>
            </Button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t bg-background">
            <div className="mx-auto max-w-7xl px-4 py-4 space-y-4">
              {/* Location Dropdown */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase">Location</p>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                      <span>{selectedLocation}</span>
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[calc(100vw-2rem)] bg-white">
                    {BANGKOK_AREAS.map((area) => (
                      <DropdownMenuItem
                        key={area}
                        onClick={() => {
                          setSelectedLocation(area);
                          setMobileMenuOpen(false);
                        }}
                        className={selectedLocation === area ? "bg-muted" : ""}
                      >
                        {area}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Events Links */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase">Events</p>
                <div className="space-y-1">
                  <Link
                    href="/events/weddings"
                    className="block px-4 py-2 rounded-lg hover:bg-muted transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Wedding Services
                  </Link>
                  <Link
                    href="/events/parties"
                    className="block px-4 py-2 rounded-lg hover:bg-muted transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Party Planning
                  </Link>
                  <Link
                    href="/events/corporate"
                    className="block px-4 py-2 rounded-lg hover:bg-muted transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Corporate Events
                  </Link>
                  <Link
                    href="/events/photoshoots"
                    className="block px-4 py-2 rounded-lg hover:bg-muted transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Photoshoots
                  </Link>
                  <Link
                    href="/events/wellness"
                    className="block px-4 py-2 rounded-lg hover:bg-muted transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Wellness Retreats
                  </Link>
                </div>
              </div>

              {/* Explore */}
              <Link
                href="/explore"
                className="block px-4 py-3 bg-primary text-primary-foreground rounded-lg text-center font-semibold hover:bg-primary/90 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Explore Services
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setShowAuthModal(false)}>
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 p-8 space-y-6" onClick={(e) => e.stopPropagation()}>
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Welcome to Veyya</h2>
              <p className="text-sm text-muted-foreground">Sign in or create an account</p>
            </div>

            {/* SSO Buttons */}
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center gap-3 border rounded-lg px-4 py-3 hover:bg-muted transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="font-medium">Continue with Google</span>
              </button>

              <button className="w-full flex items-center justify-center gap-3 border rounded-lg px-4 py-3 hover:bg-muted transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span className="font-medium">Continue with Facebook</span>
              </button>

              <button className="w-full flex items-center justify-center gap-3 border rounded-lg px-4 py-3 hover:bg-muted transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10zm1-16h-2v6H7v2h4v6h2v-6h4v-2h-4V6z"/>
                </svg>
                <span className="font-medium">Continue with Apple</span>
              </button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or</span>
                </div>
              </div>

              <button className="w-full flex items-center justify-center gap-3 border rounded-lg px-4 py-3 hover:bg-muted transition-colors">
                <span className="font-medium">Continue with Email</span>
              </button>
            </div>

            <div className="text-center">
              <button
                onClick={() => setShowAuthModal(false)}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Close
              </button>
            </div>

            <p className="text-xs text-center text-muted-foreground">
              By continuing, you agree to Veyya's{" "}
              <Link href="/terms" className="underline">Terms of Service</Link> and{" "}
              <Link href="/privacy" className="underline">Privacy Policy</Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
