import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Heart, Users, Award, TrendingUp } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-muted/30">
      <Container className="py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">About Veyya</h1>

        <div className="bg-white rounded-xl p-8 border space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-muted-foreground mb-4">
              Veyya is on a mission to make premium home services accessible, transparent, and reliable. We connect you with verified professionals for beauty, wellness, pet care, cleaning, and fitness services—all from the comfort of your home.
            </p>
            <p className="text-muted-foreground">
              Founded in Bangkok in 2024, we're expanding across Thailand and Southeast Asia, bringing trusted service providers to your doorstep.
            </p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Customer First</h3>
                <p className="text-sm text-muted-foreground">
                  Your satisfaction is our priority. We rigorously vet every provider and ensure transparent pricing.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Vetted Professionals</h3>
                <p className="text-sm text-muted-foreground">
                  All providers undergo background checks, skills verification, and customer review monitoring.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Award className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Quality Guarantee</h3>
                <p className="text-sm text-muted-foreground">
                  Not satisfied? We'll make it right. Our quality guarantee ensures you get the service you expect.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Growing Network</h3>
                <p className="text-sm text-muted-foreground">
                  Join thousands of satisfied customers and hundreds of verified service providers.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Join Our Team</h2>
            <p className="text-muted-foreground mb-4">
              We're always looking for talented individuals who are passionate about transforming the home services industry.
            </p>
            <Link href="/careers">
              <Button>View Open Positions</Button>
            </Link>
          </section>
        </div>
      </Container>
    </main>
  );
}
