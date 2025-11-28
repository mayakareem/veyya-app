import Container from "@/components/layout/Container";
import Link from "next/link";
import { SERVICE_CATEGORIES } from "@/lib/constants/categories";
import { FileText } from "lucide-react";

export default function SitemapPage() {
  return (
    <main className="min-h-screen bg-muted/30">
      <Container className="py-12 max-w-5xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <FileText className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Sitemap</h1>
          <p className="text-muted-foreground">Complete list of all pages on Veyya</p>
        </div>

        <div className="bg-white rounded-xl p-8 border">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Main Pages */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Main</h2>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/search" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Search Services
                  </Link>
                </li>
                <li>
                  <Link href="/providers" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Become a Provider
                  </Link>
                </li>
              </ul>
            </div>

            {/* Service Categories */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Service Categories</h2>
              <ul className="space-y-2">
                {SERVICE_CATEGORIES.map((category) => (
                  <li key={category.name}>
                    <Link
                      href={`/category/${encodeURIComponent(category.name)}`}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Events */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Events</h2>
              <ul className="space-y-2">
                <li>
                  <Link href="/events/weddings" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Wedding Services
                  </Link>
                </li>
                <li>
                  <Link href="/events/parties" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Party Services
                  </Link>
                </li>
                <li>
                  <Link href="/events/corporate" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Corporate Events
                  </Link>
                </li>
                <li>
                  <Link href="/events/photoshoots" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Photoshoot Services
                  </Link>
                </li>
                <li>
                  <Link href="/events/wellness" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Wellness Retreats
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Company</h2>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/press" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Press & Media
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Support</h2>
              <ul className="space-y-2">
                <li>
                  <Link href="/help" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/safety" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Safety
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Legal</h2>
              <ul className="space-y-2">
                <li>
                  <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
