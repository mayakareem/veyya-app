// src/components/layout/ProviderHeader.tsx
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
import { Gift, ChevronDown, User, Menu, X, GraduationCap, Bell } from "lucide-react";

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

export default function ProviderHeader() {
  const [selectedLocation, setSelectedLocation] = useState<string>("Sukhumvit");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [newBookingsCount, setNewBookingsCount] = useState(0);

  // Auto-detect location on mount (simplified for demo)
  useEffect(() => {
    // In production, use geolocation API or IP-based detection
    const defaultLocation = BANGKOK_AREAS[0];
    setSelectedLocation(defaultLocation);
  }, []);

  // Fetch new bookings count
  useEffect(() => {
    const fetchNewBookings = async () => {
      try {
        // TODO: Replace with actual API endpoint
        // const response = await fetch('/api/provider/bookings/new-count');
        // const data = await response.json();
        // setNewBookingsCount(data.count);

        // Simulate new bookings for demo
        setNewBookingsCount(3);
      } catch (error) {
        console.error('Failed to fetch new bookings:', error);
      }
    };

    fetchNewBookings();

    // Poll for new bookings every 30 seconds
    const interval = setInterval(fetchNewBookings, 30000);

    return () => clearInterval(interval);
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
            {/* Dashboard Link */}
            <Link href="/providers/dashboard">
              <Button variant="ghost" size="sm" className="font-normal">
                <span className="text-sm">Dashboard</span>
              </Button>
            </Link>

            {/* Location Dropdown - Shows provider's service area */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1 font-normal">
                  <span className="text-sm">{selectedLocation}</span>
                  <ChevronDown className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-48 bg-white">
                <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                  Your Service Area
                </div>
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

            {/* Certifications Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1 font-normal">
                  <span className="text-sm">Certifications</span>
                  <ChevronDown className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-64 bg-white">
                <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                  Online Certification Modules
                </div>
                <DropdownMenuItem asChild>
                  <Link href="/providers/certifications" className="w-full">
                    View All Certifications
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/providers/certifications/beauty" className="w-full">
                    Beauty Services
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/providers/certifications/wellness" className="w-full">
                    Wellness & Massage
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/providers/certifications/fitness" className="w-full">
                    Fitness Training
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/providers/certifications/pet-care" className="w-full">
                    Pet Care
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Events Dropdown - Provider specific */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1 font-normal">
                  <span className="text-sm">Events</span>
                  <ChevronDown className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-56 bg-white">
                <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                  Provider Events & Opportunities
                </div>
                <DropdownMenuItem asChild>
                  <Link href="/providers/events" className="w-full">
                    All Provider Events
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/providers/events/training" className="w-full">
                    Training Workshops
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/providers/events/networking" className="w-full">
                    Networking Events
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/providers/events/competitions" className="w-full">
                    Skill Competitions
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/providers/events/expo" className="w-full">
                    Industry Expos
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Right Actions - Responsive Icons with Popovers */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Notification Bell */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10 sm:h-12 sm:w-12 relative">
                  <Bell className="w-5 h-5 sm:w-7 sm:h-7" />
                  {newBookingsCount > 0 && (
                    <span className="absolute top-1 right-1 sm:top-2 sm:right-2 flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-red-500 text-[10px] sm:text-xs font-bold text-white">
                      {newBookingsCount > 9 ? '9+' : newBookingsCount}
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 bg-white" align="end">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">New Bookings</h3>
                    {newBookingsCount > 0 && (
                      <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">
                        {newBookingsCount} new
                      </span>
                    )}
                  </div>

                  {newBookingsCount > 0 ? (
                    <>
                      <div className="space-y-2 max-h-96 overflow-y-auto">
                        {/* Sample booking notifications - replace with actual data */}
                        {Array.from({ length: newBookingsCount }).map((_, i) => (
                          <div
                            key={i}
                            className="p-3 rounded-lg border bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
                          >
                            <div className="flex items-start gap-3">
                              <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                <User className="w-5 h-5 text-primary" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium">New booking request</p>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                  Hair styling • Tomorrow at 2:00 PM
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  ฿1,500 • Sukhumvit area
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <Link href="/provider/bookings" className="block">
                        <Button size="sm" className="w-full">
                          View All Bookings
                        </Button>
                      </Link>
                    </>
                  ) : (
                    <div className="py-8 text-center text-muted-foreground">
                      <Bell className="w-12 h-12 mx-auto mb-2 opacity-20" />
                      <p className="text-sm">No new bookings</p>
                      <p className="text-xs mt-1">Check back later for updates</p>
                    </div>
                  )}
                </div>
              </PopoverContent>
            </Popover>

            {/* Provider Referrals Popover */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10 sm:h-12 sm:w-12">
                  <Gift className="w-5 h-5 sm:w-7 sm:h-7" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-72 bg-white" align="end">
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm">Refer Other Providers</h3>
                  <p className="text-xs text-muted-foreground">
                    Invite other service providers to join Veyya and earn rewards!
                  </p>
                  <div className="space-y-2 pt-2">
                    <p className="text-xs font-medium">Earn for each referral:</p>
                    <ul className="text-xs text-muted-foreground space-y-1 pl-4">
                      <li>• ฿500 when they complete onboarding</li>
                      <li>• ฿1,000 after their first booking</li>
                      <li>• Bonus rewards for top referrers</li>
                    </ul>
                  </div>
                  <Link href="/providers/referrals">
                    <Button size="sm" className="w-full mt-2">
                      View Referral Program
                    </Button>
                  </Link>
                </div>
              </PopoverContent>
            </Popover>

            {/* Auth Popover */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10 sm:h-12 sm:w-12">
                  <User className="w-5 h-5 sm:w-7 sm:h-7" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64 bg-white" align="end">
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm">Provider Account</h3>
                  <p className="text-xs text-muted-foreground">
                    Sign in to access your provider dashboard
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
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t bg-background">
            <div className="mx-auto max-w-7xl px-4 py-4 space-y-4">
              {/* Dashboard Link */}
              <Link
                href="/providers/dashboard"
                className="block px-4 py-3 bg-primary text-primary-foreground rounded-lg text-center font-semibold hover:bg-primary/90 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Go to Dashboard
              </Link>

              {/* Location Dropdown */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase">Your Service Area</p>
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

              {/* Certifications Links */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase flex items-center gap-1">
                  <GraduationCap className="w-4 h-4" />
                  Certifications
                </p>
                <div className="space-y-1">
                  <Link
                    href="/providers/certifications"
                    className="block px-4 py-2 rounded-lg hover:bg-muted transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    View All Certifications
                  </Link>
                  <Link
                    href="/providers/certifications/beauty"
                    className="block px-4 py-2 rounded-lg hover:bg-muted transition-colors text-sm"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Beauty Services
                  </Link>
                  <Link
                    href="/providers/certifications/wellness"
                    className="block px-4 py-2 rounded-lg hover:bg-muted transition-colors text-sm"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Wellness & Massage
                  </Link>
                  <Link
                    href="/providers/certifications/fitness"
                    className="block px-4 py-2 rounded-lg hover:bg-muted transition-colors text-sm"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Fitness Training
                  </Link>
                </div>
              </div>

              {/* Events Links */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase">Provider Events</p>
                <div className="space-y-1">
                  <Link
                    href="/providers/events"
                    className="block px-4 py-2 rounded-lg hover:bg-muted transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    All Provider Events
                  </Link>
                  <Link
                    href="/providers/events/training"
                    className="block px-4 py-2 rounded-lg hover:bg-muted transition-colors text-sm"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Training Workshops
                  </Link>
                  <Link
                    href="/providers/events/networking"
                    className="block px-4 py-2 rounded-lg hover:bg-muted transition-colors text-sm"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Networking Events
                  </Link>
                </div>
              </div>

              {/* Referrals CTA */}
              <Link
                href="/providers/referrals"
                className="block px-4 py-3 bg-primary text-primary-foreground rounded-lg text-center font-semibold hover:bg-primary/90 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Refer Providers & Earn
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
              <h2 className="text-2xl font-bold mb-2">Provider Portal</h2>
              <p className="text-sm text-muted-foreground">Sign in to manage your services</p>
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
