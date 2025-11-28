import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Camera } from "lucide-react";

export default function PhotoshootsPage() {
  return (
    <main className="min-h-screen bg-muted/30">
      <Container className="py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Camera className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Photoshoot Services</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Look camera-ready with professional makeup and hair for your photoshoot
          </p>
        </div>
        <div className="bg-white rounded-xl p-8 text-center border">
          <p className="text-muted-foreground mb-6">
            Editorial makeup, HD makeup, airbrush, and professional styling services
          </p>
          <Link href="/category/Makeup">
            <Button size="lg">View Makeup Services</Button>
          </Link>
        </div>
      </Container>
    </main>
  );
}
