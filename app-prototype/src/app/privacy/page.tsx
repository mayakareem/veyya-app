import Container from "@/components/layout/Container";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-muted/30">
      <Container className="py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="bg-white rounded-xl p-8 border space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
            <p className="text-muted-foreground mb-2">
              We collect information you provide directly to us, including:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li>Name, email address, and phone number</li>
              <li>Location and address for service delivery</li>
              <li>Payment information</li>
              <li>Booking history and preferences</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
            <p className="text-muted-foreground">
              We use your information to provide services, process payments, communicate with you, and improve our platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Information Sharing</h2>
            <p className="text-muted-foreground">
              We share necessary information with service providers to fulfill bookings. We do not sell your personal information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
            <p className="text-muted-foreground">
              We implement appropriate security measures to protect your personal information from unauthorized access and disclosure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Your Rights</h2>
            <p className="text-muted-foreground">
              You have the right to access, correct, or delete your personal information. Contact us to exercise these rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Cookies</h2>
            <p className="text-muted-foreground">
              We use cookies to improve your experience and analyze site usage.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Contact Us</h2>
            <p className="text-muted-foreground">
              For privacy questions, email us at privacy@veyya.com
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
