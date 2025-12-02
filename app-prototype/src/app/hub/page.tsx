import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Briefcase, Shield, Home, Search, Calendar } from "lucide-react";

export default function NavigationHub() {
  const sections = [
    {
      title: "User Portals",
      description: "Customer-facing pages and features",
      links: [
        { href: "/", icon: Home, label: "Homepage", description: "Main landing page" },
        { href: "/search", icon: Search, label: "Search Services", description: "Find and book services" },
        { href: "/explore", icon: Search, label: "Explore", description: "Browse all categories" },
        { href: "/user", icon: User, label: "User Dashboard", description: "Customer dashboard with bookings, vouchers, bundles" },
        { href: "/user/bookings", icon: Calendar, label: "My Bookings", description: "View all bookings" },
        { href: "/cart", icon: Calendar, label: "Shopping Cart", description: "Cart and checkout" },
      ],
    },
    {
      title: "Provider Portals",
      description: "Service provider management pages",
      links: [
        { href: "/providers", icon: Briefcase, label: "Become a Provider", description: "Provider landing page" },
        { href: "/providers/onboarding", icon: Briefcase, label: "Provider Onboarding", description: "Registration flow" },
        { href: "/provider", icon: Briefcase, label: "Provider Dashboard", description: "Provider main dashboard" },
        { href: "/provider/bookings", icon: Calendar, label: "Provider Bookings", description: "Manage bookings" },
        { href: "/provider/calendar", icon: Calendar, label: "Calendar", description: "Availability management" },
        { href: "/provider/services", icon: Briefcase, label: "Services", description: "Manage service offerings" },
      ],
    },
    {
      title: "Admin Portals",
      description: "Administrative and management pages",
      links: [
        { href: "/admin", icon: Shield, label: "Admin Dashboard", description: "Main admin panel with user/provider stats" },
        { href: "/admin/providers", icon: Shield, label: "Provider Management", description: "Approve and manage providers" },
        { href: "/admin/bookings", icon: Shield, label: "Booking Management", description: "Monitor all bookings" },
        { href: "/admin-test", icon: Shield, label: "Admin Test Dashboard", description: "Alternative admin view" },
      ],
    },
    {
      title: "Public Pages",
      description: "Marketing and information pages",
      links: [
        { href: "/about", icon: Home, label: "About", description: "Company information" },
        { href: "/contact", icon: Home, label: "Contact", description: "Contact form" },
        { href: "/help", icon: Home, label: "Help Center", description: "FAQs and support" },
        { href: "/blog", icon: Home, label: "Blog", description: "Articles and guides" },
        { href: "/events/weddings", icon: Home, label: "Wedding Services", description: "Event-specific page" },
        { href: "/checkout", icon: Calendar, label: "Checkout", description: "Checkout page (legacy)" },
        { href: "/confirmation", icon: Calendar, label: "Confirmation", description: "Order confirmation page" },
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-muted/30">
      <div className="mx-auto max-w-7xl p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold">Veyya Navigation Hub</h1>
          <p className="text-muted-foreground text-lg">
            Quick access to all user, provider, and admin portals
          </p>
        </div>

        {/* Navigation Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {sections.map((section) => (
            <Card key={section.title}>
              <CardHeader>
                <CardTitle>{section.title}</CardTitle>
                <CardDescription>{section.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {section.links.map((link) => {
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="flex items-start gap-3 p-3 rounded-lg border hover:border-primary hover:bg-primary/5 transition-colors group"
                      >
                        <Icon className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium group-hover:text-primary transition-colors">
                            {link.label}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {link.description}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Platform Overview</CardTitle>
            <CardDescription>Current platform status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold">42</div>
                <div className="text-sm text-muted-foreground">Total Pages</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold">8</div>
                <div className="text-sm text-muted-foreground">Categories</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold">150+</div>
                <div className="text-sm text-muted-foreground">Services</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold">3</div>
                <div className="text-sm text-muted-foreground">User Types</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
