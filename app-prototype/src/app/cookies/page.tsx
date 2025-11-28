import Container from "@/components/layout/Container";
import { Cookie } from "lucide-react";

export default function CookiesPage() {
  return (
    <main className="min-h-screen bg-muted/30">
      <Container className="py-12 max-w-4xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Cookie className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Cookie Policy</h1>
        </div>

        <div className="bg-white rounded-xl p-8 border space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">What Are Cookies?</h2>
            <p className="text-muted-foreground">
              Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">How We Use Cookies</h2>
            <p className="text-muted-foreground mb-4">
              We use cookies for the following purposes:
            </p>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Essential Cookies</h3>
                <p className="text-muted-foreground">
                  Required for the website to function properly. These cookies enable core functionality such as security, authentication, and accessibility.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Performance Cookies</h3>
                <p className="text-muted-foreground">
                  Help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our platform.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Functional Cookies</h3>
                <p className="text-muted-foreground">
                  Remember your preferences and choices (such as language, region, or login credentials) to provide enhanced, personalized features.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Marketing Cookies</h3>
                <p className="text-muted-foreground">
                  Track your browsing activity to deliver relevant advertisements. We may share this information with third-party advertisers.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Third-Party Cookies</h2>
            <p className="text-muted-foreground">
              We use third-party services such as Google Analytics, Facebook Pixel, and payment processors that may set their own cookies. These cookies are governed by the respective third party's privacy policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Managing Cookies</h2>
            <p className="text-muted-foreground mb-3">
              You can control and manage cookies in various ways:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Browser settings: Most browsers allow you to refuse or accept cookies</li>
              <li>Cookie preference center: Adjust your preferences through our cookie banner</li>
              <li>Opt-out tools: Use third-party opt-out tools for advertising cookies</li>
            </ul>
            <p className="text-muted-foreground mt-3 text-sm">
              Please note that blocking certain cookies may impact your experience on our platform and limit functionality.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Cookie Retention</h2>
            <p className="text-muted-foreground">
              Cookies are stored for different periods depending on their purpose:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1 mt-2">
              <li>Session cookies: Deleted when you close your browser</li>
              <li>Persistent cookies: Remain for a set period (typically 1-24 months)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Updates to This Policy</h2>
            <p className="text-muted-foreground">
              We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated revision date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="text-muted-foreground">
              If you have questions about our use of cookies, please contact us at{" "}
              <a href="mailto:privacy@veyya.com" className="text-primary hover:underline">
                privacy@veyya.com
              </a>
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
