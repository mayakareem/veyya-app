import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Heart, Calendar, Users, Sparkles } from "lucide-react";

export default function WeddingsPage() {
  return (
    <main className="min-h-screen bg-muted/30">
      <Container className="py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Heart className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Wedding Services</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Make your special day perfect with our comprehensive wedding beauty and wellness services
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 border">
            <Sparkles className="w-8 h-8 text-primary mb-4" />
            <h3 className="font-semibold text-lg mb-2">Bridal Beauty</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Bridal makeup, hair styling, facials, manicures, and full beauty packages
            </p>
            <Link href="/category/Beauty">
              <Button variant="outline" className="w-full">Browse Services</Button>
            </Link>
          </div>

          <div className="bg-white rounded-xl p-6 border">
            <Users className="w-8 h-8 text-primary mb-4" />
            <h3 className="font-semibold text-lg mb-2">Bridal Party</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Beauty services for bridesmaids, flower girls, and wedding party members
            </p>
            <Link href="/category/Makeup">
              <Button variant="outline" className="w-full">View Options</Button>
            </Link>
          </div>

          <div className="bg-white rounded-xl p-6 border">
            <Calendar className="w-8 h-8 text-primary mb-4" />
            <h3 className="font-semibold text-lg mb-2">Pre-Wedding</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Spa treatments, wellness services, and beauty prep for the big day
            </p>
            <Link href="/category/Wellness">
              <Button variant="outline" className="w-full">Explore Services</Button>
            </Link>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-primary text-primary-foreground rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Need a Custom Wedding Package?</h2>
          <p className="mb-6 opacity-90">
            Contact us to create a personalized beauty and wellness plan for your wedding day
          </p>
          <Link href="/search">
            <Button size="lg" variant="secondary">
              Explore All Services
            </Button>
          </Link>
        </div>
      </Container>
    </main>
  );
}
