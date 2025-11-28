import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PartyPopper } from "lucide-react";

export default function PartiesPage() {
  return (
    <main className="min-h-screen bg-muted/30">
      <Container className="py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <PartyPopper className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Party Planning Services</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get party-ready with our professional beauty and styling services
          </p>
        </div>

        <div className="bg-white rounded-xl p-8 text-center mb-8 border">
          <p className="text-muted-foreground mb-6">
            From birthday celebrations to special occasions, we offer makeup, hair, nails, and more
          </p>
          <Link href="/search">
            <Button size="lg">Explore All Services</Button>
          </Link>
        </div>
      </Container>
    </main>
  );
}
