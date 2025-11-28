import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function WellnessRetreatsPage() {
  return (
    <main className="min-h-screen bg-muted/30">
      <Container className="py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Sparkles className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Wellness Retreats</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Relaxation and rejuvenation with our comprehensive wellness services
          </p>
        </div>
        <div className="bg-white rounded-xl p-8 text-center border">
          <p className="text-muted-foreground mb-6">
            Massage therapy, yoga, fitness, and holistic wellness programs
          </p>
          <Link href="/category/Wellness">
            <Button size="lg">Explore Wellness Services</Button>
          </Link>
        </div>
      </Container>
    </main>
  );
}
