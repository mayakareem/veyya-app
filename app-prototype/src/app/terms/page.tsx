import Container from "@/components/layout/Container";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-muted/30">
      <Container className="py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        
        <div className="bg-white rounded-xl p-8 border space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground">
              By accessing and using Veyya, you accept and agree to be bound by the terms and provision of this agreement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Use of Services</h2>
            <p className="text-muted-foreground">
              Veyya provides a platform connecting customers with service providers for beauty, wellness, pet care, cleaning, and fitness services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Booking and Payments</h2>
            <p className="text-muted-foreground">
              All bookings are subject to provider availability. Payment is required at the time of booking. Cancellation policies apply.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. User Responsibilities</h2>
            <p className="text-muted-foreground">
              Users must provide accurate information, maintain account security, and treat service providers with respect.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Provider Responsibilities</h2>
            <p className="text-muted-foreground">
              Service providers must deliver services as described, maintain professional standards, and comply with all applicable laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Limitation of Liability</h2>
            <p className="text-muted-foreground">
              Veyya acts as a platform connecting customers and providers. We are not responsible for the quality of services provided.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Contact</h2>
            <p className="text-muted-foreground">
              For questions about these terms, please contact us at support@veyya.com
            </p>
          </section>

          <p className="text-sm text-muted-foreground mt-8">
            Last updated: November 2025
          </p>
        </div>
      </Container>
    </main>
  );
}
